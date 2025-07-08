import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  Home, 
  Music, 
  Video, 
  Users, 
  Radio, 
  Bell, 
  User, 
  Settings,
  PlayCircle,
  PlusCircle,
  Upload,
  Album,
  Mic2,
  ListMusic
} from 'lucide-react'
import { Navbar } from './navbar'

interface MainLayoutProps {
  children: ReactNode
}

const navItems = [
  { name: 'Início', href: '/dashboard', icon: Home },
  { name: 'Explorar', href: '/explore', icon: Music },
  { name: 'Artistas', href: '/artists', icon: Mic2 },
  { name: 'Álbuns', href: '/albums', icon: Album },
  { name: 'Playlists', href: '/playlists', icon: ListMusic },
  { name: 'Grupos', href: '/groups', icon: Users },
  { name: 'Rádio', href: '/radio', icon: Radio },
  { name: 'Enviar', href: '/upload', icon: Upload },
]

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar mais compacta */}
        <aside className="fixed h-screen w-56 bg-white shadow-sm  hidden md:block border-r my-14">
          <nav className="mt-8 space-y-1 px-2">
            {navItems.map(item => {
              const isActive = router.pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Conteúdo principal com margem adequada */}
        <div className="flex-1 md:ml-56">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}