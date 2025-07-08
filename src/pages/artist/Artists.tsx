
'use client'

import { useState, Fragment } from 'react'
import { motion } from 'framer-motion'
import { Users, Album, Play, Plus, Edit, Trash, X, Save } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Dialog, Transition } from '@headlessui/react'

type Artist = {
  id: number
  name: string
  followers: number
  albums: number
  cover: string
  genre?: string
  bio?: string
}

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>(
    Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Artista ${String.fromCharCode(65 + i)}`,
      followers: Math.floor(Math.random() * 1000000),
      albums: Math.floor(Math.random() * 10) + 1,
      cover: "./imgprofile.png",
      genre: ['Pop', 'Rock', 'Hip Hop', 'Eletrônica', 'Jazz'][i % 5],
      bio: `Biografia do Artista ${String.fromCharCode(65 + i)}`
    }))
  )

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [editMode, setEditMode] = useState(false)

  const filteredArtists = artists.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre ? a.genre === selectedGenre : true)
  )

  const genres = Array.from(new Set(artists.map(a => a.genre)))

  const handleDelete = (id: number) => {
    setArtists(prev => prev.filter(a => a.id !== id))
    setSelectedArtist(null)
  }

  const handleSave = () => {
    if (!selectedArtist) return
    setArtists(prev => prev.map(a => a.id === selectedArtist.id ? selectedArtist : a))
    setEditMode(false)
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-18">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Artistas</h1>
          </div>
          <div className="flex gap-12 flex-wrap">
            <input
              placeholder="Digite o nome do artista"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" mx-24 px-24 py-1 border rounded-lg"
            />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">Todos os géneros</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredArtists.map(artist => (
            <div
              key={artist.id}
              className="text-center group cursor-pointer relative"
              onClick={() => { setSelectedArtist(artist); setEditMode(false) }}
            >
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3">
                <img src={artist.cover} alt={artist.name} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" />

              </div>
              <h3 className="font-semibold">{artist.name}</h3>
              <p className="text-xs text-gray-500">{artist.genre}</p>
            </div>
          ))}
        </div>

        <Transition show={!!selectedArtist} as={Fragment}>
          <Dialog onClose={() => setSelectedArtist(null)} className="relative z-50">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-lg font-bold">Detalhes do Artista</Dialog.Title>
                    <button onClick={() => setSelectedArtist(null)} className="text-gray-500 hover:text-gray-700"><X /></button>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={selectedArtist?.cover} alt={selectedArtist?.name} className="w-20 h-20 rounded-full object-cover" />
                    <div className="flex-1 space-y-1">
                      {editMode ? (
                        <input
                          className="w-full border px-2 py-1 rounded"
                          value={selectedArtist?.name}
                          onChange={(e) => setSelectedArtist({ ...selectedArtist!, name: e.target.value })}
                        />
                      ) : (
                        <h2 className="font-bold text-lg">{selectedArtist?.name}</h2>
                      )}
                      <p className="text-sm text-gray-500">{selectedArtist?.genre}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                    {editMode ? (
                      <textarea
                        className="w-full border px-2 py-1 rounded"
                        value={selectedArtist?.bio}
                        onChange={(e) => setSelectedArtist({ ...selectedArtist!, bio: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm text-gray-700">{selectedArtist?.bio}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleDelete(selectedArtist!.id)} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center gap-1">
                      <Trash size={16} /> Eliminar
                    </button>
                    <button
                      onClick={editMode ? handleSave : () => setEditMode(true)}
                      className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 flex items-center gap-1"
                    >
                      {editMode ? <Save size={16} /> : <Edit size={16} />}
                      {editMode ? 'Salvar' : 'Editar'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </MainLayout>
  )
}
