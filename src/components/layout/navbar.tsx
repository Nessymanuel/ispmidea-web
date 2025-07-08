import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import logo from "../../../public/logoupdate.png"
import imgprofile from "../../../public/imgprofile.png"
import Image from 'next/image'
import { Bell, PlusCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function Navbar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const isLoggedIn = true // Mocked - substituir por estado real depois

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
            <Link href="/" className="flex items-center jun ">
              <Image src={logo} alt="Logo" width={72} height={10}  />
            </Link>
          </div>

          {/* Search bar - mockado como visível quando logado
          {isLoggedIn && (
            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
              <div className="relative items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar músicas, vídeos, álbuns..."
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          )} */}

          {/* Right side - mockado */}
          <div className="flex items-center ml-auto space-x-4">
            {isLoggedIn ? (
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
                      src={imgprofile}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </Link>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">Ana</p>
                    <p className="text-xs text-gray-500">Editor</p>
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