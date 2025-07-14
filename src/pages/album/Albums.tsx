'use client'

import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Edit, Save, Trash, Plus, UploadCloud } from 'lucide-react'
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

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [artistas, setArtistas] = useState<Artista[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newCapa, setNewCapa] = useState<File | null>(null)
  const [search, setSearch] = useState("")
  const [selectedVisibility, setSelectedVisibility] = useState("")

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Album`).then(res => setAlbums(res.data))
    axios.get(`${BASE_URL}/api/Artista`).then(res => setArtistas(res.data))
  }, [])

  const filteredAlbums = albums.filter(album =>
    album.tituloAlbum.toLowerCase().includes(search.toLowerCase()) &&
    (selectedVisibility ? album.visibilidade === selectedVisibility : true)
  )

  const handleDelete = async (id: number) => {
    await axios.delete(`${BASE_URL}/api/Album/${id}`)
    setAlbums(prev => prev.filter(a => a.id !== id))
    setSelectedAlbum(null)
  }

  const handleSave = async () => {
    if (!selectedAlbum) return

    const formData = new FormData()
    formData.append('tituloAlbum', selectedAlbum.tituloAlbum)
    formData.append('descricao', selectedAlbum.descricao)
    formData.append('editora', selectedAlbum.editora)
    formData.append('dataLancamento', selectedAlbum.dataLancamento)
    formData.append('visibilidade', selectedAlbum.visibilidade || 'publico')
    if (selectedAlbum.artistaId) {
      formData.append('artistaId', selectedAlbum.artistaId.toString())
    }
    if (newCapa) {
      formData.append('capa', newCapa)
    }

    try {
      const res = await axios.put(`${BASE_URL}/api/Album/${selectedAlbum.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setAlbums(prev =>
        prev.map(a => a.id === selectedAlbum.id ? res.data : a)
      )
      setEditMode(false)
      setNewCapa(null)
    } catch (error: any) {
      console.error('Erro ao atualizar álbum:', error.response?.data || error.message)
    }
  }

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
              onClick={() => { setSelectedAlbum(album); setEditMode(false) }}
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

        {/* Modal de Detalhes/Edição */}
        <Transition show={!!selectedAlbum} as={Fragment}>
          <Dialog onClose={() => setSelectedAlbum(null)} className="relative z-50">
            <Transition.Child as={Fragment}>
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Transition.Child as={Fragment}>
                <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-lg font-bold">Detalhes do Álbum</Dialog.Title>
                    <button onClick={() => setSelectedAlbum(null)}><X /></button>
                  </div>

                  <div className="relative w-full">
                    <img
                      src={newCapa ? URL.createObjectURL(newCapa) : `${BASE_URL}${selectedAlbum?.capaAlbum}`}
                      alt="Capa"
                      className="w-full h-48 object-cover rounded"
                    />
                    {editMode && (
                      <>
                        <label htmlFor="capaUpload" className="absolute -bottom-2 right-0 bg-purple-600 p-2 rounded-full cursor-pointer text-white">
                          <UploadCloud size={16} />
                        </label>
                        <input
                          id="capaUpload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files) setNewCapa(e.target.files[0])
                          }}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>

                  {editMode ? (
                    <>
                      <input className="w-full border px-3 py-2 rounded" value={selectedAlbum?.tituloAlbum} onChange={(e) => setSelectedAlbum({ ...selectedAlbum!, tituloAlbum: e.target.value })} />
                      <textarea className="w-full border px-3 py-2 rounded" value={selectedAlbum?.descricao} onChange={(e) => setSelectedAlbum({ ...selectedAlbum!, descricao: e.target.value })} />
                      <input className="w-full border px-3 py-2 rounded" value={selectedAlbum?.editora} onChange={(e) => setSelectedAlbum({ ...selectedAlbum!, editora: e.target.value })} />
                      <input className="w-full border px-3 py-2 rounded" type="date" value={selectedAlbum?.dataLancamento.split('T')[0]} onChange={(e) => setSelectedAlbum({ ...selectedAlbum!, dataLancamento: e.target.value })} />
                      <select className="w-full border px-3 py-2 rounded" value={selectedAlbum?.artistaId || ''} onChange={(e) => setSelectedAlbum({ ...selectedAlbum!, artistaId: parseInt(e.target.value) })}>
                        <option value="">Selecionar artista</option>
                        {artistas.map(a => (
                          <option key={a.id} value={a.id}>{a.nomeArtista}</option>
                        ))}
                      </select>
                      <select className="w-full border px-3 py-2 rounded" value={selectedAlbum?.visibilidade || 'publico'} onChange={(e) => setSelectedAlbum({ ...selectedAlbum!, visibilidade: e.target.value })}>
                        <option value="publico">Público</option>
                        <option value="privado">Privado</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold">{selectedAlbum?.tituloAlbum}</h2>
                      <p className="text-sm text-gray-600">{selectedAlbum?.descricao}</p>
                      <p className="text-sm">{selectedAlbum?.editora}</p>
                      <p className="text-sm text-gray-600">{selectedAlbum?.dataLancamento.split('T')[0]}</p>
                      <p className="text-sm">{selectedAlbum?.visibilidade}</p>
                    </>
                  )}

                  <div className="flex justify-end gap-2 pt-3">
                    <button onClick={() => handleDelete(selectedAlbum!.id)} className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center gap-1">
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
