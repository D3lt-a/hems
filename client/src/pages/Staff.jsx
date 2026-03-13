import { useState, useEffect } from 'react'
import { getAll, create, update, remove } from '../services/staff'
import { getAll as getDeps } from '../services/deps'
import { getAll as getPosts } from '../services/post'
import { Plus, Search, Pencil, Trash2, X, Loader2, ChevronDown } from 'lucide-react'

const EMPTY = {
  fname: '', lname: '', gender: '', dob: '',
  email: '', phone: '', address: '', depID: '', postID: ''
}

export default function Staff() {
  const [staff, setStaff]           = useState([])
  const [deps, setDeps]             = useState([])
  const [posts, setPosts]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [showModal, setShowModal]   = useState(false)
  const [editing, setEditing]       = useState(null)
  const [form, setForm]             = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast]           = useState(null)
  const [deleteId, setDeleteId]     = useState(null)
  const [search, setSearch]         = useState('')
  const [filterDep, setFilterDep]   = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo]     = useState('')

  const load = async () => {
    setLoading(true)
    const [s, d, p] = await Promise.all([getAll(), getDeps(), getPosts()])
    setStaff(Array.isArray(s) ? s : [])
    setDeps(Array.isArray(d) ? d : d?.deps || [])
    setPosts(Array.isArray(p) ? p : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const openAdd = () => { setEditing(null); setForm(EMPTY); setShowModal(true) }
  const openEdit = (m) => {
    setEditing(m)
    setForm({
      fname: m.fname || '', lname: m.lname || '',
      gender: m.gender || '', dob: m.dob?.split('T')[0] || '',
      email: m.email || '', phone: m.phone || '',
      address: m.address || '', depID: m.depID || '', postID: m.postID || ''
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (!form.fname || !form.lname || !form.gender || !form.dob || !form.email || !form.phone || !form.address || !form.depID || !form.postID) {
      showToast('Please fill in all required fields.', 'error'); return
    }
    setSubmitting(true)
    try {
      const result = editing ? await update(editing.id, form) : await create(form)
      if (result.success) {
        showToast(editing ? 'Staff member updated!' : 'Staff member added!')
        setShowModal(false); load()
      } else {
        showToast(result.message || 'Something went wrong.', 'error')
      }
    } catch { showToast('Request failed.', 'error') }
    finally { setSubmitting(false) }
  }

  const handleDelete = async (id) => {
    const result = await remove(id)
    if (result.success) { showToast('Staff member deleted.'); load() }
    else showToast('Failed to delete.', 'error')
    setDeleteId(null)
  }

  const filtered = staff.filter(s => {
    const name = `${s.fname} ${s.lname}`.toLowerCase()
    const matchSearch = !search || name.includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase())
    const matchDep    = !filterDep || String(s.depID) === String(filterDep)
    return matchSearch && matchDep
  })

  const inputCls  = "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:border-sky-400 outline-none"
  const selectCls = `${inputCls} appearance-none`

  const Field = ({ label, required, children }) => (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )

  return (
    <div className="space-y-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg text-white text-sm font-medium shadow-lg
          ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Staff</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage hospital employees</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total Staff',  value: staff.length,    color: 'text-sky-400'    },
          { label: 'Departments',  value: deps.length,     color: 'text-violet-400' },
          { label: 'Filtered',     value: filtered.length, color: 'text-emerald-400'},
        ].map(c => (
          <div key={c.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className={`text-2xl font-semibold ${c.color}`}>{c.value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-3">Filters</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:border-sky-400 outline-none" />
          </div>

          <div className="relative">
            <select value={filterDep} onChange={e => setFilterDep(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 focus:border-sky-400 outline-none appearance-none">
              <option value="">All Departments</option>
              {deps.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div>
            <input type="date" value={filterFrom} onChange={e => setFilterFrom(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 focus:border-sky-400 outline-none"
              placeholder="Hired from" />
          </div>

          <div>
            <input type="date" value={filterTo} onChange={e => setFilterTo(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 focus:border-sky-400 outline-none"
              placeholder="Hired to" />
          </div>

        </div>
        {(search || filterDep || filterFrom || filterTo) && (
          <button onClick={() => { setSearch(''); setFilterDep(''); setFilterFrom(''); setFilterTo('') }}
            className="mt-3 text-xs text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1">
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">
            {staff.length === 0 ? 'No staff yet. Add one!' : 'No staff match your filters.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-800 bg-slate-950">
                <tr>
                  {['#', 'Name', 'Gender', 'DOB', 'Email', 'Phone', 'Address', 'Department', 'Post', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs text-slate-400 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <tr key={m.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-slate-400 text-sm">{i + 1}</td>
                    <td className="px-4 py-3 text-slate-100 text-sm font-medium whitespace-nowrap">{m.fname} {m.lname}</td>
                    <td className="px-4 py-3 text-slate-300 text-sm capitalize">{m.gender}</td>
                    <td className="px-4 py-3 text-slate-300 text-sm whitespace-nowrap">
                      {m.dob ? new Date(m.dob).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{m.email}</td>
                    <td className="px-4 py-3 text-slate-300 text-sm whitespace-nowrap">{m.phone}</td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{m.address}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded text-xs font-medium">
                        {m.department || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-xs font-medium">
                        {m.post || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(m)}
                          className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-sky-400/10 rounded transition">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteId(m.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-100">
                {editing ? 'Edit Staff Member' : 'Add Staff Member'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" required>
                <input value={form.fname} onChange={e => setForm({...form, fname: e.target.value})}
                  placeholder="John" className={inputCls} />
              </Field>
              <Field label="Last Name" required>
                <input value={form.lname} onChange={e => setForm({...form, lname: e.target.value})}
                  placeholder="Doe" className={inputCls} />
              </Field>
              <Field label="Gender" required>
                <div className="relative">
                  <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className={selectCls}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </Field>
              <Field label="Date of Birth" required>
                <input type="date" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} className={inputCls} />
              </Field>
              <Field label="Email" required>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="john@hospital.com" className={inputCls} />
              </Field>
              <Field label="Phone" required>
                <input type="number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="0780000000" className={inputCls} />
              </Field>
              <Field label="Address" required>
                <input value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  placeholder="Kigali, Rwanda" className={inputCls} />
              </Field>
              <Field label="Department" required>
                <div className="relative">
                  <select value={form.depID} onChange={e => setForm({...form, depID: e.target.value})} className={selectCls}>
                    <option value="">Select department</option>
                    {deps.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </Field>
              <Field label="Post" required>
                <div className="relative">
                  <select value={form.postID} onChange={e => setForm({...form, postID: e.target.value})} className={selectCls}>
                    <option value="">Select post</option>
                    {posts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </Field>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-sm px-4 py-2">Cancel</button>
              <button onClick={handleSubmit} disabled={submitting}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? 'Update' : 'Add Staff'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setDeleteId(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm"
            onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-slate-100 mb-2">Delete Staff Member?</h2>
            <p className="text-slate-400 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="text-slate-400 hover:text-white text-sm px-4 py-2">Cancel</button>
              <button onClick={() => handleDelete(deleteId)}
                className="bg-red-500 hover:bg-red-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
