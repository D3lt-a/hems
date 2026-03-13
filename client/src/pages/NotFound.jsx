import { useNavigate, useLocation } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-[#0f172a] flex items-center justify-center px-6 overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-md w-full z-10">

        {/* 404 number with gradient overlay */}
        <div className="relative mb-6 select-none">
          <p className="text-[9rem] font-black text-slate-800 leading-none tracking-tighter">
            404
          </p>
          <p className="absolute inset-0 text-[9rem] font-black leading-none tracking-tighter
            text-transparent bg-clip-text bg-linear-to-b from-sky-400/40 to-transparent">
            404
          </p>
        </div>

        {/* Compass Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#1e293b] border border-slate-700 flex items-center justify-center mx-auto mb-6 transition-transform duration-200 hover:scale-110">
          <Compass className="w-8 h-8 text-sky-400" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Page Not Found</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-2">
          The page you're looking for doesn't exist or hasn't been built yet.
        </p>

        {/* Show the bad URL */}
        <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-2 mb-8">
          <span className="text-slate-500 text-xs">tried:</span>
          <code className="text-sky-400 text-xs font-mono">{location.pathname}</code>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 justify-center border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 text-sm font-medium px-6 py-2.5 rounded-lg transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-sky-400 hover:bg-sky-300 text-slate-900 font-bold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-sky-400/20"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    </div>
  )
}