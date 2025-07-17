// pages/album-detail.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MoreVertical, Edit, Trash, Music, Download } from 'lucide-react'
import axios from 'axios'
import MainLayout from '@/components/layout/MainLayout'
import { Dialog } from '@headlessui/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function AlbumDetail() {
  const router = useRouter()
  const params = useSearchParams()
  const albumId = params.get('id')

  const [album, setAlbum] = useState<any>(null)
  const [musicas, setMusicas] = useState<any[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!albumId) return
    axios.get(`${BASE_URL}/api/Album/${albumId}`).then(res => setAlbum(res.data))
    axios.get(`${BASE_URL}/api/Musica/album/${albumId}`).then(res => setMusicas(res.data))
  }, [albumId])

  const handleDelete = async () => {
    await axios.delete(`${BASE_URL}/api/Album/${albumId}`)
    router.push('/albums')
  }

  if (!album) return <p className="p-10">Carregando...</p>

  return (
    <MainLayout>
      <div className="relative w-full h-[280px] bg-black text-white overflow-hidden">
        <img
          src={`${BASE_URL}${album.capaAlbum}`}
          alt="Capa"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
        <div className="relative z-10 max-w-6xl mx-auto p-6 flex flex-col justify-end h-full">
          <h1 className="text-4xl font-bold mb-1 drop-shadow-lg">{album.tituloAlbum}</h1>
          <p className="text-sm text-gray-200 mb-1">{album.descricao}</p>
          <p className="text-sm mb-1">Editora: <strong>{album.editora}</strong></p>
          <p className="text-sm">Visibilidade: <strong>{album.visibilidade}</strong></p>
        </div>
        <div className="absolute top-4 right-6 z-10">
          <button onClick={() => setShowOptions(true)} className="bg-white text-black p-2 rounded-full shadow">
            <MoreVertical />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Music size={20} /> Músicas
        </h2>
        <ul className="space-y-6">
          {musicas.map(m => (
            <li key={m.id} className="flex items-center gap-4 bg-white rounded-lg shadow p-3">
              <img
                src={`${BASE_URL}${m.capaMusica}`}
                alt="Capa da música"
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-base text-purple-800 mb-1 truncate">{m.tituloMusica}</p>
                <div className="w-full bg-purple-100 rounded overflow-hidden">
                  <audio
                    controls
                    className="w-full [&>::-webkit-media-controls-panel]:bg-purple-600 [&>::-webkit-media-controls-play-button]:text-white [&>::-webkit-media-controls-current-time-display]:text-white [&>::-webkit-media-controls-time-remaining-display]:text-white"
                  >
                    <source src={`${BASE_URL}/api/Musica/stream/${m.id}`} type="audio/mpeg" />
                  </audio>
                </div>
              </div>
              <a
                href={`${BASE_URL}${m.ficheiroMusical}`}
                download
                className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                <Download size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de opções */}
      <Dialog open={showOptions} onClose={() => setShowOptions(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg space-y-4">
            <button
              onClick={() => {
                setShowOptions(false)
                router.push(`/albums/edit?id=${album.id}`)
              }}
              className="flex items-center gap-2 text-purple-600"
            >
              <Edit size={18} /> Editar Álbum
            </button>
            <button
              onClick={() => {
                setShowOptions(false)
                setShowDeleteConfirm(true)
              }}
              className="flex items-center gap-2 text-red-600"
            >
              <Trash size={18} /> Eliminar Álbum
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal de confirmação */}
      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg space-y-4 text-center">
            <h2 className="text-lg font-bold">Confirmar exclusão</h2>
            <p>Tem certeza que deseja excluir este álbum?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </MainLayout>
  )
}