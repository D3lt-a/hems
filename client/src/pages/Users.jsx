import { useState, useEffect } from 'react'
import { getAll } from '../services/users'
import { Loader2, User, IdCard } from 'lucide-react'

export default function Users() {
  const [users, setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getAll()
      setUsers(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = users.filter(u =>
    u.uname?.toLowerCase().includes(search.toLowerCase()) ||
    String(u.empID).includes(search)
  )

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Users</h1>
          <p className="text-slate-400 text-sm mt-0.5">View registered system users</p>
        </div>
      </div>

      {/* Stat */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 w-fit">
        <p className="text-2xl font-semibold text-sky-400">{users.length}</p>
        <p className="text-slate-400 text-xs mt-0.5">Total Users</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or ID..."
          className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:border-sky-400 outline-none" />
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">No users found.</div>
        ) : (
          <table className="w-full">
            <thead className="border-b border-slate-800 bg-slate-950">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">#</th>
                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">User ID</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-400 text-sm">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-sky-400" />
                      </div>
                      <span className="text-slate-100 text-sm font-medium">{u.uname}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <IdCard className="w-4 h-4 text-slate-500" />
                      {u.empID}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 text-slate-400 text-xs font-mono px-2 py-0.5 rounded">
                      #{u.id}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  )
}
