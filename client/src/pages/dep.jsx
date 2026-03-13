import { useState, useEffect } from "react"
import { getAll, create } from "../services/deps.js"
import {
    Plus,
    Search,
    Building2,
    X,
    Loader2
} from "lucide-react"

export default function Departments() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [newName, setNewName] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [toast, setToast] = useState(null)
    const [search, setSearch] = useState("")

    const loadData = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await getAll()
            setData(res.deps || [])
        } catch {
            setError("Failed to load departments.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const showToast = (msg, type = "success") => {
        setToast({ msg, type })
        setTimeout(() => setToast(null), 3000)
    }

    const handleCreate = async () => {
        if (!newName.trim()) return

        setSubmitting(true)

        try {
            const res = await create(newName.trim())

            if (res.message?.includes("👍")) {
                showToast("Department created successfully!")
                setNewName("")
                setShowModal(false)
                loadData()
            } else {
                showToast(res.message || "Something went wrong.", "error")
            }
        } catch {
            showToast("Failed to create department.", "error")
        } finally {
            setSubmitting(false)
        }
    }

    const filtered = data.filter((d) =>
        d.name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-8">

            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 right-6 px-5 py-3 rounded-lg text-sm font-medium shadow-lg
        ${toast.type === "error"
                        ? "bg-red-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}>
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-xl font-semibold text-slate-100">
                        Departments
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Manage your organisation's departments
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                    <Plus className="w-4 h-4" />
                    New Department
                </button>

            </div>

            {/* Stats */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4 w-fit">

                <Building2 className="w-6 h-6 text-sky-400" />

                <div>
                    <p className="text-2xl font-semibold text-slate-100">
                        {data.length}
                    </p>
                    <p className="text-xs text-slate-400">
                        Total Departments
                    </p>
                </div>

            </div>

            {/* Search */}
            <div className="relative max-w-xs">

                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search departments..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:border-sky-400 outline-none"
                />

            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-red-400 text-sm">
                        {error}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 text-sm">
                        No departments found
                    </div>
                ) : (
                    <table className="w-full">

                        <thead className="border-b border-slate-800 bg-slate-950">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">
                                    Department
                                </th>
                                <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase">
                                    ID
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {filtered.map((dep, i) => (
                                <tr
                                    key={dep.id}
                                    className="border-b border-slate-800 hover:bg-slate-800/60 transition-colors"
                                >
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {i + 1}
                                    </td>

                                    <td className="px-6 py-4 text-slate-100 text-sm font-medium">
                                        {dep.name}
                                    </td>

                                    <td className="px-6 py-4 text-slate-400 text-sm font-mono">
                                        #{dep.id}
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
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setShowModal(false)}
                >

                    <div
                        className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex items-center justify-between mb-4">

                            <h2 className="text-lg font-semibold text-slate-100">
                                New Department
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>

                        </div>

                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Department name"
                            className="w-full mb-5 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-100 focus:border-sky-400 outline-none"
                        />

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleCreate}
                                disabled={submitting}
                                className="bg-sky-500 hover:bg-sky-400 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                {submitting && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                Create
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}