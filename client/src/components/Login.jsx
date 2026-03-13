import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/auth"
import React from "react"
import { User, KeyRound, LogIn } from "lucide-react"

/*
    Testing Credentials:
    Michael Lee
    pass5
*/

function Login() {
    const [name, setName] = React.useState("")
    const [key, setKey] = React.useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        const results = await login(name, key)

        if (results.success) {
            alert(`Success: ${results.message}`)
            navigate("/staff")
        } else {
            alert(`Failed: ${results.message}`)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4">
            <div className="w-full max-w-sm p-8 bg-slate-900/80 backdrop-blur rounded-xl border border-slate-800 shadow-sm transition-all">

                <div className="mb-6 text-center">
                    <h2 className="text-xl font-semibold text-white tracking-tight">
                        Welcome back
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Sign in to continue
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">

                    <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Username"
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 text-sm text-white rounded-lg border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>

                    <div className="relative">
                        <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full pl-9 pr-3 py-2 bg-slate-800 text-sm text-white rounded-lg border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-400 active:scale-[0.98] transition-all"
                    >
                        <LogIn className="w-4 h-4" />
                        Login
                    </button>

                </form>

                <p className="text-sm text-center text-slate-400 mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-sky-400 hover:text-sky-300 transition-colors"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login