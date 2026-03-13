import { useState, useEffect } from 'react'
import { create, getAll } from '../services/post'
import { PlusCircle, X } from 'lucide-react'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)
  const [search, setSearch] = useState('')

  const loadPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAll()
      if (Array.isArray(data)) {
        setPosts(data)
      } else if (data.success === false) {
        setError(data.message || 'Failed to load posts.')
      } else {
        setPosts(data.data || [])
      }
    } catch {
      setError('Failed to load posts.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadPosts() }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleCreate = async () => {
    if (!newName.trim()) return
    setSubmitting(true)
    try {
      const result = await create(newName.trim())
      if (result.success) {
        showToast('Post created successfully!')
        setNewName('')
        setShowModal(false)
        loadPosts()
      } else {
        showToast(result.message || 'Something went wrong.', 'error')
      }
    } catch {
      showToast('Failed to create post.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const filtered = posts.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0f172a] p-8">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg text-white text-sm font-semibold shadow-2xl transition-all
          ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Posts</h1>
          <p className="text-slate-400 text-sm mt-1">Manage employee roles and positions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-sky-400 hover:bg-sky-300 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-sky-400/20"
        >
          <PlusCircle className="w-5 h-5" /> New Post
        </button>
      </div>

      {/* Stat Card */}
      <div className="flex gap-4 mb-6">
        <div className="bg-[#1e293b] border border-slate-700 rounded-xl px-6 py-4 flex flex-col gap-1">
          <span className="text-3xl font-bold text-sky-400">{posts.length}</span>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">Total Posts</span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          className="bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 outline-none focus:border-sky-400 transition-colors w-full max-w-xs"
          placeholder="🔍  Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-9 h-9 border-[3px] border-slate-600 border-t-sky-400 rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-red-400 text-sm">{error}</p>
            <button
              onClick={loadPosts}
              className="bg-sky-400 text-slate-900 font-bold text-sm px-4 py-2 rounded-lg hover:bg-sky-300 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <PlusCircle className="text-4xl text-sky-400 mb-2" />
            <p className="text-slate-400 text-sm">
              {search ? 'No posts match your search.' : 'No posts yet. Create one!'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#0f172a] border-b border-slate-700">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">#</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">Post / Role Name</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">ID</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr
                  key={post.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors duration-100"
                >
                  <td className="px-6 py-4">
                    <span className="bg-[#0f172a] text-slate-400 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                      <span className="text-slate-100 text-sm font-medium">{post.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#0f172a] text-slate-400 text-xs font-mono px-2.5 py-1 rounded-md">
                      #{post.id}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#1e293b] border border-slate-700 rounded-2xl p-7 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-slate-100">New Post</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-200 text-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-6">Enter a name for the new post / role.</p>

            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Post Name
            </label>
            <input
              className="w-full bg-[#0f172a] border border-slate-700 focus:border-sky-400 rounded-lg px-4 py-2.5 text-slate-100 text-sm placeholder-slate-600 outline-none transition-colors mb-6"
              placeholder="e.g. Software Engineer"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowModal(false); setNewName('') }}
                className="border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500 text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={submitting || !newName.trim()}
                className="bg-sky-400 hover:bg-sky-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-sky-400/20"
              >
                {submitting ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}