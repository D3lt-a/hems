import { NavLink, useNavigate } from 'react-router-dom'
import { Users, Building2, BadgeCheck, KeyRound, LogOut, Stethoscope, ClipboardList } from 'lucide-react'

const navItems = [
  { to: '/staff',       icon: Users,          label: 'Staff'       },
  { to: '/departments', icon: Building2,       label: 'Departments' },
  { to: '/posts',       icon: BadgeCheck,      label: 'Posts'       },
  { to: '/recruitment', icon: ClipboardList,   label: 'Recruitment' },
  { to: '/users',       icon: KeyRound,        label: 'Users'       },
]

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-slate-950 border-r border-slate-800 flex flex-col z-40">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-slate-100 font-semibold text-sm leading-tight">HEMS</p>
            <p className="text-slate-500 text-xs">Hospital Staff System</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        <p className="text-slate-600 text-[11px] font-semibold uppercase tracking-wider px-3 mb-2">
          Main Menu
        </p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${isActive
                ? 'bg-sky-500/10 text-sky-400'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'}`
            }>
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-800">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
