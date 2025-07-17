'use client'

import { useEffect, useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Music, Trash2, Plus } from 'lucide-react'
import { useRouter } from 'next/router'
import { Modal } from '@/components/ui/modal'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface Musica {
  id: number
  tituloMusica: string
  ficheiroMusical: string
  capaMusica: string
}

interface Playlist {
  id: number
  nomePlaylist: string
  tipoPlaylist: string
  dataDeCriacao: string
  utilizadorId: number
  capaPlaylist: string
  nomeUtilizador: string
}

export default function PlaylistDetailPage() {
  const router = useRouter()
  const id = router.query.id as string

  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [musicas, setMusicas] = useState<Musica[]>([])
  const [todasMusicas, setTodasMusicas] = useState<Musica[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMusicaId, setSelectedMusicaId] = useState<number | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const [playlistRes, musicasDaPlaylistRes, todasMusicasRes] = await Promise.all([
          fetch(`${BASE_URL}/api/Playlist/${id}`),
          fetch(`${BASE_URL}/api/MusicaDaPlaylist/por-playlist/${id}`),
          fetch(`${BASE_URL}/api/Musica/emalta/1`) // ← pode trocar o 1 pelo userId real
        ])

        const playlistData = await playlistRes.json()
        const musicasData = await musicasDaPlaylistRes.json()
        const todasMusicasData = await todasMusicasRes.json()

        setPlaylist(playlistData)
        setMusicas(musicasData)
        setTodasMusicas(todasMusicasData)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
      }
    }

    fetchData()
  }, [id])

  const handleDeleteMusica = (musicaId: number) => {
    setMusicas(musicas.filter(musica => musica.id !== musicaId))
  }

  const handleAddMusica = async () => {
    if (!selectedMusicaId || !id) return

    try {
      await fetch(`${BASE_URL}/api/MusicaDaPlaylist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          musicaId: selectedMusicaId,
          playlistId: parseInt(id)
        })
      })

      const res = await fetch(`${BASE_URL}/api/MusicaDaPlaylist/por-playlist/${id}`)
      const updated = await res.json()
      setMusicas(updated)
      setIsModalOpen(false)
      setSelectedMusicaId(null)
    } catch (err) {
      console.error('Erro ao adicionar música:', err)
    }
  }

  const musicasDisponiveis = todasMusicas.filter(
    (m) => !musicas.find((mus) => mus.id === m.id)
  )

  return (
    <MainLayout>
      <div className="pt-20 px-4 space-y-8">
        {playlist && (
          <div className="space-y-6">
            <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
              <img
                src={`${BASE_URL}${playlist.capaPlaylist}`}
                alt="Capa da Playlist"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold">{playlist.nomePlaylist}</h1>
              <p className="text-sm text-gray-500">Por {playlist.nomeUtilizador}</p>
              <p className="text-sm text-gray-400">{new Date(playlist.dataDeCriacao).toLocaleDateString()}</p>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Músicas</h2>
              <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
                <Plus className="w-4 h-4" /> Adicionar Música
              </Button>
            </div>

            <div className="space-y-4">
              {musicas.map((musica) => (
                <div
                  key={musica.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-100"
                >
                  <img
                    src={`${BASE_URL}${musica.capaMusica}`}
                    alt="Capa da música"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{musica.tituloMusica}</p>
                    <audio controls className="w-full mt-2">
                      <source src={`${BASE_URL}${musica.ficheiroMusical}`} type="audio/mp3" />
                    </audio>
                  </div>
                  <Button
                    onClick={() => handleDeleteMusica(musica.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal de adicionar música */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Adicionar Música à Playlist"
        >
          <div className="p-4 space-y-4">
            <select
              value={selectedMusicaId ?? ''}
              onChange={(e) => setSelectedMusicaId(parseInt(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Selecione uma música</option>
              {musicasDisponiveis.map((musica) => (
                <option key={musica.id} value={musica.id}>
                  {musica.tituloMusica}
                </option>
              ))}
            </select>

            <Button onClick={handleAddMusica} disabled={!selectedMusicaId}>
              Confirmar Adição
            </Button>
          </div>
        </Modal>
      </div>
    </MainLayout>
  )
}
