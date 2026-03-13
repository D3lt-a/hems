import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { UserCircle, Shield } from 'lucide-react'

const pageTitles = {
  '/staff':       { title: 'Staff',       subtitle: 'Manage hospital employees'             },
  '/departments': { title: 'Departments', subtitle: "Manage your organisation's departments" },
  '/posts':       { title: 'Posts',       subtitle: 'Manage employee posts and positions'   },
  '/recruitment': { title: 'Recruitment', subtitle: 'Track staff recruitment records'       },
  '/users':       { title: 'Users',       subtitle: 'View system users and access'          },
}

export default function Layout() {
  const location = useLocation()
  const page = pageTitles[location.pathname] || { title: 'HEMS', subtitle: '' }

  let user = {}
  try { user = JSON.parse(localStorage.getItem('user') || '{}') } catch { user = {} }

  const initials = user?.username?.slice(0, 2)?.toUpperCase() || 'AD'

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-slate-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-slate-100 font-semibold text-lg tracking-tight">{page.title}</h2>
            {page.subtitle && <p className="text-slate-500 text-xs mt-0.5">{page.subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-slate-200 text-sm font-medium flex items-center justify-end gap-1">
                <UserCircle className="w-4 h-4 text-slate-400" />
                {user?.username || 'Admin'}
              </p>
              <p className="text-slate-500 text-xs flex items-center justify-end gap-1">
                <Shield className="w-3.5 h-3.5" /> Administrator
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">{initials}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
