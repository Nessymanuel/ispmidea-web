'use client'

import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { X, Edit, Save, Trash, Plus, UploadCloud, Music } from 'lucide-react'
import axios from 'axios'
import MainLayout from '@/components/layout/MainLayout'
import { CreateAlbumForm } from '@/components/forms/CreateAlbumForm'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

type Album = {
  id: number
  tituloAlbum: string
  descricao: string
  editora: string
  capaAlbum: string
  dataLancamento: string
  artistaId?: number
  nomeArtista?: string
  visibilidade?: string
}

type Artista = {
  id: number
  nomeArtista: string
}

type Musica = {
  id: number
  tituloMusica: string
}

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [artistas, setArtistas] = useState<Artista[]>([])
  const [search, setSearch] = useState("")
  const [selectedVisibility, setSelectedVisibility] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Album`).then(res => setAlbums(res.data))
    axios.get(`${BASE_URL}/api/Artista`).then(res => setArtistas(res.data))
  }, [])

  const filteredAlbums = albums.filter(album =>
    album.tituloAlbum.toLowerCase().includes(search.toLowerCase()) &&
    (selectedVisibility ? album.visibilidade === selectedVisibility : true)
  )

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Álbuns</h1>
          <div className="flex flex-wrap gap-3">
            <input
              placeholder="Pesquisar álbum"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded w-60"
            />
            <select
              value={selectedVisibility}
              onChange={(e) => setSelectedVisibility(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Todas as visibilidades</option>
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
            </select>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} /> Novo Álbum
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredAlbums.map(album => (
            <div
              key={album.id}
              className="text-center group cursor-pointer"
              onClick={() => router.push(`/albumdetail?id=${album.id}`)}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-2">
                <img
                  src={`${BASE_URL}${album.capaAlbum}`}
                  alt={album.tituloAlbum}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold">{album.tituloAlbum}</h3>
              <p className="text-xs text-gray-500">{album.nomeArtista || '-'}</p>
            </div>
          ))}
        </div>

        {/* Modal de Criação */}
        <Transition show={isCreateModalOpen} as={Fragment}>
          <Dialog onClose={() => setIsCreateModalOpen(false)} className="relative z-50">
            <Transition.Child as={Fragment}>
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Transition.Child as={Fragment}>
                <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                  <Dialog.Title className="text-lg font-bold">Novo Álbum</Dialog.Title>
                  <CreateAlbumForm
                    onSuccess={(novo) => {
                      setAlbums(prev => [...prev, novo])
                      setIsCreateModalOpen(false)
                    }}
                    onCancel={() => setIsCreateModalOpen(false)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </MainLayout>
  )
}