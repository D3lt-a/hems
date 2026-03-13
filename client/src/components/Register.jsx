import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { create } from "../services/auth"
import { User, KeyRound, IdCard, UserPlus } from "lucide-react"

function Register() {
    const [empID, setempID] = React.useState("")
    const [name, setname] = React.useState("")
    const [key, setkey] = React.useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const results = await create(empID, name, key)

        if (results.success) {
            alert(`Success: ${results.message}`)
            navigate("/")
        } else {
            alert(`Failed: ${results.message}`)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4">

            <div className="w-full max-w-sm p-8 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 shadow-sm">

                <div className="mb-6 text-center">
                    <h2 className="text-xl font-semibold text-white tracking-tight">
                        Create account
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Register a new employee
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <IdCard className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            value={empID}
                            onChange={(e) => setempID(e.target.value)}
                            type="text"
                            placeholder="Employee ID"
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 text-sm text-white rounded-lg border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            type="text"
                            placeholder="Full name"
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 text-sm text-white rounded-lg border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            value={key}
                            onChange={(e) => setkey(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 text-sm text-white rounded-lg border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-400 active:scale-[0.98] transition-all"
                    >
                        <UserPlus className="w-4 h-4" />
                        Register
                    </button>

                </form>

                <p className="text-sm text-center text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-sky-400 hover:text-sky-300 transition-colors"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Register