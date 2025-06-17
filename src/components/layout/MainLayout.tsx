import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  Star,
  UserPlus
} from 'lucide-react';


interface MainLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Autores', href: '/authors', icon: UserPlus },
  { name: 'Mídias', href: '/media', icon: Music },
  { name: 'Playlists', href: '/playlists', icon: PlayCircle },
  { name: 'Grupos', href: '/groups', icon: Users },
  { name: 'Rádio', href: '/radio', icon: Radio },
  { name: 'Notificações', href: '/notifications', icon: Bell },
  { name: 'Perfil', href: '/profile', icon: User },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed h-screen w-64 bg-white shadow-lg pt-12 ">
          <nav className="mt-4 ">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 border-l-4 border-purple-700' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64 p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 