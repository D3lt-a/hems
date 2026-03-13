import { useState, useEffect } from 'react'
import { getAll, create, remove } from '../services/recruitment'
import { getAll as getStaff } from '../services/staff'
import { Plus, Trash2, X, Loader2, ChevronDown } from 'lucide-react'

const EMPTY = { empID: '', hiredate: '', salary: '', status: 'Pending' }

const STATUS_STYLE = {
  Approved: 'bg-emerald-500/10 text-emerald-400',
  Rejected: 'bg-red-500/10 text-red-400',
  Pending:  'bg-amber-500/10 text-amber-400',
}

export default function Recruitment() {
  const [records, setRecords]       = useState([])
  const [staff, setStaff]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [showModal, setShowModal]   = useState(false)
  const [form, setForm]             = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast]           = useState(null)
  const [deleteId, setDeleteId]     = useState(null)

  const load = async () => {
    setLoading(true)
    const [r, s] = await Promise.all([getAll(), getStaff()])
    setRecords(Array.isArray(r) ? r : [])
    setStaff(Array.isArray(s) ? s : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async () => {
    if (!form.empID || !form.salary) {
      showToast('Staff member and salary are required.', 'error'); return
    }
    setSubmitting(true)
    const result = await create(form)
    if (result.success) {
      showToast('Recruitment record created!')
      setShowModal(false); setForm(EMPTY); load()
    } else {
      showToast(result.message || 'Error creating record.', 'error')
    }
    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    const result = await remove(id)
    if (result.success) { showToast('Record deleted.'); load() }
    else showToast('Failed to delete.', 'error')
    setDeleteId(null)
  }

  const counts = {
    total:    records.length,
    approved: records.filter(r => r.status === 'Approved').length,
    pending:  records.filter(r => r.status === 'Pending').length,
    rejected: records.filter(r => r.status === 'Rejected').length,
  }

  const inputCls  = "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 focus:border-sky-400 outline-none"
  const selectCls = `${inputCls} appearance-none`

  return (
    <div className="space-y-6">

      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg text-white text-sm font-medium shadow-lg
          ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-100">Recruitment</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage staff hiring records, salary and approval status</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          <Plus className="w-4 h-4" /> New Record
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total',    value: counts.total,    color: 'text-sky-400'     },
          { label: 'Approved', value: counts.approved, color: 'text-emerald-400' },
          { label: 'Pending',  value: counts.pending,  color: 'text-amber-400'   },
          { label: 'Rejected', value: counts.rejected, color: 'text-red-400'     },
        ].map(c => (
          <div key={c.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className={`text-2xl font-semibold ${c.color}`}>{c.value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">No recruitment records yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-800 bg-slate-950">
                <tr>
                  {['#', 'Staff Member', 'Department', 'Post', 'Hire Date', 'Salary', 'Status', ''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs text-slate-400 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={r.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-slate-400 text-sm">{i + 1}</td>
                    <td className="px-4 py-3 text-slate-100 text-sm font-medium whitespace-nowrap">
                      {r.fname} {r.lname}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded text-xs">{r.department || '—'}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-xs">{r.post || '—'}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm whitespace-nowrap">
                      {r.hiredate ? new Date(r.hiredate).toLocaleDateString() : 'Today'}
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm whitespace-nowrap">
                      ${Number(r.salary).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLE[r.status] || STATUS_STYLE.Pending}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setDeleteId(r.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-100">New Recruitment Record</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Staff */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Staff Member <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select value={form.empID} onChange={e => setForm({...form, empID: e.target.value})} className={selectCls}>
                    <option value="">Select staff member</option>
                    {staff.map(s => <option key={s.id} value={s.id}>{s.fname} {s.lname}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Hire Date */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Hire Date</label>
                <input type="date" value={form.hiredate} onChange={e => setForm({...form, hiredate: e.target.value})}
                  className={inputCls} />
                <p className="text-xs text-slate-500 mt-1">Leave blank to use today's date</p>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Salary <span className="text-red-400">*</span>
                </label>
                <input type="number" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})}
                  placeholder="e.g. 500000" className={inputCls} />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                <div className="relative">
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={selectCls}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-sm px-4 py-2">Cancel</button>
              <button onClick={handleSubmit} disabled={submitting}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition">
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Create
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
            <h2 className="text-lg font-semibold text-slate-100 mb-2">Delete Record?</h2>
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
