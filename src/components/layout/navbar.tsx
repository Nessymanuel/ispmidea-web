import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import logo from "../../../public/logoupdate.png"
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Navbar() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const isLandingPage = router.pathname === '/landing';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="w-1/4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={logo} alt="logo" width={80} height={10} />
            </Link>
          </div>

          {/* Navigation Links - Centered - Only on Landing Page */}
          {isLandingPage && (
            <div className="hidden md:flex w-2/4 justify-center">
              <div className="flex items-center space-x-8">
                <Link href="#highlights" className="text-gray-600 hover:text-gray-900">
                  Destaques
                </Link>
                <Link href="#features" className="text-gray-600 hover:text-gray-900">
                  Recursos
                </Link>
                <Link href="#radio" className="text-gray-600 hover:text-gray-900">
                  Rádio
                </Link>
                <Link href="#playlists" className="text-gray-600 hover:text-gray-900">
                  Playlists
                </Link>
                <Link href="#artists" className="text-gray-600 hover:text-gray-900">
                  Artistas
                </Link>
              </div>
            </div>
          )}

          {/* Login/Cadastro Buttons */}
          <div className={`${isLandingPage ? 'w-1/4' : 'w-full'} flex justify-end`}>
            {user ? (
              // Botões para usuário logado
              <>
                <Link href="/content">
                  <Button variant="ghost">Conteúdos</Button>
                </Link>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-4 sm:space-x-8 bg-purple-200 p-1 rounded-full"
                  onClick={() => signOut()}
                >
                  <div className="flex items-center gap-1 px-3 py-1 text-sm rounded-4xl bg-purple-600">
                    <span className="hidden sm:inline font-bold text-lg text-blackZ">A</span>
                  </div>
                </Button>
              </>
            ) : isLandingPage && (
              // Botões de login/cadastro só na landing
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/signup">
                  <Button>Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 