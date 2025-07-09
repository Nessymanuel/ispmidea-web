import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import logo from "../../../public/logoupdate.png"
import Image from 'next/image'
import { Bell, PlusCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

interface LoggedUser {
  username: string;
  fotografia: string;
  tipoDeUtilizador: number;
}

export function Navbar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<LoggedUser | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex items-center mr-14">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Logo" width={72} height={10} />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center ml-auto space-x-4">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/upload" className="flex items-center gap-1">
                    <PlusCircle className="w-4 h-4" />
                    <span className="hidden md:inline">Upload</span>
                  </Link>
                </Button>
                <Link href="/notifications" className="relative p-2 rounded-full hover:bg-gray-100">
                  <Bell className="text-gray-600" size={20} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link href="/profile" className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.fotografia}`}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </Link>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {user.tipoDeUtilizador === 0 ? 'Editor' : 'Utilizador'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
