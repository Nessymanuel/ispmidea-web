'use client'

import { useEffect, useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Lock, Globe, Music, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Modal } from '@/components/ui/modal'
import { CreatePlaylistForm } from '@/components/forms/CreatePlaylistForm'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface Playlist {
  id: number
  nomePlaylist: string
  tipoPlaylist: string
  dataDeCriacao: string
  utilizadorId: number
  capaPlaylist: string
  nomeUtilizador: string
  totalMusicas?: number
}

export default function PlaylistsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPlaylists = async () => {
      const storedUser = localStorage.getItem('user')
      if (!storedUser) return

      const currentUser = JSON.parse(storedUser)
      const userId = currentUser.id

      const [publicRes, userRes] = await Promise.all([
        fetch(`${BASE_URL}/api/Playlist/publicas`),
        fetch(`${BASE_URL}/api/Playlist/por-editor/${userId}`),
      ])

      const publicPlaylists = await publicRes.json()
      const ownPlaylists = await userRes.json()

      const ownPlaylistsWithName = ownPlaylists.map((p: Playlist) => ({
        ...p,
        nomeUtilizador: currentUser.username,
      }))

      const combined = [...publicPlaylists, ...ownPlaylistsWithName].filter(
        (p, index, self) => index === self.findIndex((x) => x.id === p.id)
      )

      const updated = await Promise.all(
        combined.map(async (playlist) => {
          try {
            const res = await fetch(`${BASE_URL}/api/MusicaDaPlaylist/por-playlist/${playlist.id}`)
            const musicas = await res.json()
            return { ...playlist, totalMusicas: musicas.length }
          } catch {
            return { ...playlist, totalMusicas: 0 }
          }
        })
      )

      setPlaylists(updated)
    }

    fetchPlaylists()
  }, [])

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.nomePlaylist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <MainLayout>
      <Navbar />
      <div className="space-y-6 pt-20 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Playlists</h1>
          <Button
            className="flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Nova Playlist
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/playlistDetailPage/${playlist.id}`)}
            >
              <div className="bg-gray-100 w-full h-[160px] overflow-hidden">
                {playlist.capaPlaylist && (
                  <img
                    src={`${BASE_URL}${playlist.capaPlaylist}`}
                    alt="Capa da playlist"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{playlist.nomePlaylist}</h3>
                    <p className="text-sm text-gray-500">por {playlist.nomeUtilizador}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Music className="w-4 h-4" />
                      {playlist.totalMusicas ?? 0} músicas
                    </div>
                  </div>
                  {playlist.tipoPlaylist === 'publica' ? (
                    <Globe className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Nova Playlist"
      >
        <div className="p-2 sm:p-4">
          <CreatePlaylistForm
            onSubmit={() => setIsCreateModalOpen(false)}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </div>
      </Modal>
    </MainLayout>
  )
}
