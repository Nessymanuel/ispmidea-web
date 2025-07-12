// src/pages/Albuns.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Edit, Trash, Save } from 'lucide-react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'

interface Album {
  id: number
  name: string
  artist: string
  genre: string
  cover: string
  description: string
}

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 1,
      name: 'Recomeço',
      artist: 'Joana Lemos',
      genre: 'Pop',
      cover: '/default-cover.png',
      description: 'Primeiro álbum da artista Joana Lemos'
    },
    {
      id: 2,
      name: 'Som da Rua',
      artist: 'Rapper X',
      genre: 'Hip Hop',
      cover: '/default-cover.png',
      description: 'Sucesso nas batalhas de rima'
    }
  ])

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (album: Album) => {
    setSelectedAlbum(album)
    setEditMode(false)
    setIsModalOpen(true)
  }

  const handleDelete = () => {
    if (selectedAlbum) {
      setAlbums(albums.filter(a => a.id !== selectedAlbum.id))
      setIsModalOpen(false)
    }
  }

  const handleSave = () => {
    if (selectedAlbum) {
      setAlbums(albums.map(a => (a.id === selectedAlbum.id ? selectedAlbum : a)))
      setEditMode(false)
    }
  }

  return (

    <MainLayout>
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Álbuns</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
          <Plus size={18} /> Criar Álbum
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {albums.map(album => (
          <div
            key={album.id}
            className="bg-white rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleOpenModal(album)}
          >
            <div className="aspect-square overflow-hidden rounded-lg mb-2">
              <Image src={album.cover} alt={album.name} width={300} height={300} className="object-cover w-full h-full" />
            </div>
            <h2 className="font-semibold text-lg">{album.name}</h2>
            <p className="text-sm text-gray-500">{album.artist}</p>
            <p className="text-xs text-gray-400 italic">{album.genre}</p>
          </div>
        ))}
      </div>

      <Transition show={isModalOpen} as={Transition.Fragment}>
        <Dialog onClose={() => setIsModalOpen(false)} className="relative z-50">
          <Transition.Child
            as={Transition.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
              <div className="flex justify-between items-center">
                <Dialog.Title className="text-xl font-bold">Detalhes do Álbum</Dialog.Title>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {selectedAlbum && (
                <>
                  <div className="aspect-square overflow-hidden rounded-lg mx-auto w-48">
                    <Image src={selectedAlbum.cover} alt="Capa" width={200} height={200} className="object-cover w-full h-full" />
                  </div>

                  <div className="space-y-2">
                    <input
                      disabled={!editMode}
                      value={selectedAlbum.name}
                      onChange={(e) => setSelectedAlbum({ ...selectedAlbum, name: e.target.value })}
                      className="w-full border px-3 py-1.5 rounded-lg"
                    />
                    <input
                      disabled={!editMode}
                      value={selectedAlbum.artist}
                      onChange={(e) => setSelectedAlbum({ ...selectedAlbum, artist: e.target.value })}
                      className="w-full border px-3 py-1.5 rounded-lg"
                    />
                    <input
                      disabled={!editMode}
                      value={selectedAlbum.genre}
                      onChange={(e) => setSelectedAlbum({ ...selectedAlbum, genre: e.target.value })}
                      className="w-full border px-3 py-1.5 rounded-lg"
                    />
                    <textarea
                      disabled={!editMode}
                      value={selectedAlbum.description}
                      onChange={(e) => setSelectedAlbum({ ...selectedAlbum, description: e.target.value })}
                      className="w-full border px-3 py-1.5 rounded-lg"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600"
                    >
                      <Trash size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (editMode) handleSave()
                        setEditMode(!editMode)
                      }}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      {editMode ? <Save size={16} /> : <Edit size={16} />}
                      {editMode ? 'Salvar' : 'Editar'}
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
    </MainLayout>
  )
}