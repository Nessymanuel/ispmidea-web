import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic2, Users, Album, Play, Plus, Edit, Trash, X } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'


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

  // Estados para os modais
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null)

  // Estado para o novo artista
  const [newArtist, setNewArtist] = useState<Omit<Artist, 'id'>>({
    name: '',
    followers: 0,
    albums: 0,
    cover: "./imgprofile.png",
    genre: 'Pop',
    bio: ''
  })

  // Funções para abrir os modais
  const openAddModal = () => {
    setNewArtist({
      name: '',
      followers: 0,
      albums: 0,
      cover: "./imgprofile.png",
      genre: 'Pop',
      bio: ''
    })
    setIsAddModalOpen(true)
  }

  const openEditModal = (artist: Artist) => {
    setCurrentArtist(artist)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (artist: Artist) => {
    setCurrentArtist(artist)
    setIsDeleteModalOpen(true)
  }

  // Funções CRUD
  const handleAddArtist = () => {
    const newId = artists.length > 0 ? Math.max(...artists.map(a => a.id)) + 1 : 1
    setArtists([...artists, { ...newArtist, id: newId }])
    setIsAddModalOpen(false)
  }

  const handleUpdateArtist = () => {
    if (!currentArtist) return
    setArtists(artists.map(a => a.id === currentArtist.id ? currentArtist : a))
    setIsEditModalOpen(false)
  }

  const handleDeleteArtist = () => {
    if (!currentArtist) return
    setArtists(artists.filter(a => a.id !== currentArtist.id))
    setIsDeleteModalOpen(false)
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-8">
        {/* Cabeçalho com botão de adicionar */}
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Artistas</h1>
            <p className="text-gray-600 mt-2">
              Descubra e explore artistas na plataforma
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={18} />
            Adicionar Artista
          </motion.button>
        </div>

        {/* Lista de Artistas */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
        >
          {artists.map(artist => (
            <motion.div
              key={artist.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center text-center group cursor-pointer relative">
                {/* Botões de ação */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openEditModal(artist)
                    }}
                    className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Edit size={16} className="text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openDeleteModal(artist)
                    }}
                    className="p-1.5 bg-white rounded-full shadow-md hover:bg-red-100"
                  >
                    <Trash size={16} className="text-red-600" />
                  </button>
                </div>

                <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3">
                  <img
                    src={artist.cover}
                    alt={artist.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="font-semibold">{artist.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{artist.genre}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {artist.followers.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Album size={12} />
                    {artist.albums}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal de Adicionar Artista */}
        {/* Modal de Adicionar Artista */}
        <Dialog
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold">Adicionar Artista</Dialog.Title>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault()

                  const form = e.currentTarget as HTMLFormElement
                  const formData = new FormData(form)
                  formData.set('DataDeRegisto', new Date().toISOString()) // automático

                  try {
                    const response = await fetch('/api/Artista', {
                      method: 'POST',
                      body: formData
                    })

                    if (response.ok) {
                      alert('Artista criado com sucesso!')
                      setIsAddModalOpen(false)
                      // Idealmente: atualizar a lista de artistas aqui
                    } else {
                      console.error('Erro:', await response.text())
                      alert('Erro ao criar artista.')
                    }
                  } catch (err) {
                    console.error('Erro:', err)
                    alert('Erro ao enviar dados.')
                  }
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Artista</label>
                  <input name="NomeArtista" required className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Género Musical</label>
                  <input name="GeneroMusical" required className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
                  <input name="Nacionalidade" required className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grupo Musical (ID)</label>
                  <input name="GrupoMusicalId" type="number" required className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                  <textarea name="Biografia" rows={3} className="w-full px-3 py-2 border rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                  <input
                    type="file"
                    name="foto"
                    accept="image/*"
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </Dialog>


        {/* Modal de Editar Artista */}
        <Dialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold">Editar Artista</Dialog.Title>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {currentArtist && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={currentArtist.name}
                      onChange={(e) => setCurrentArtist({ ...currentArtist, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seguidores</label>
                      <input
                        type="number"
                        value={currentArtist.followers}
                        onChange={(e) => setCurrentArtist({ ...currentArtist, followers: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Álbuns</label>
                      <input
                        type="number"
                        value={currentArtist.albums}
                        onChange={(e) => setCurrentArtist({ ...currentArtist, albums: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                    <select
                      value={currentArtist.genre}
                      onChange={(e) => setCurrentArtist({ ...currentArtist, genre: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="Pop">Pop</option>
                      <option value="Rock">Rock</option>
                      <option value="Hip Hop">Hip Hop</option>
                      <option value="Eletrônica">Eletrônica</option>
                      <option value="Jazz">Jazz</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                    <textarea
                      value={currentArtist.bio}
                      onChange={(e) => setCurrentArtist({ ...currentArtist, bio: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleUpdateArtist}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Dialog>

        {/* Modal de Confirmar Exclusão */}
        <Transition.Root show={isDeleteModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setIsDeleteModalOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
                  <Dialog.Title className="text-lg font-bold">Confirmar Exclusão</Dialog.Title>
                  <p className="mt-2 text-sm text-gray-700">
                    Tem certeza que deseja excluir <span className="font-semibold">{currentArtist?.name}</span>?
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={handleDeleteArtist}
                    >
                      Excluir
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

      </div>
    </MainLayout>
  )
}