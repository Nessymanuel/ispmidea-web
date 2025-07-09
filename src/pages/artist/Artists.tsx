'use client'

import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Edit, Save, Trash, Plus, UploadCloud } from 'lucide-react'
import axios from 'axios'
import MainLayout from '@/components/layout/MainLayout'
import { CreateArtistForm } from '@/components/forms/CreateArtistForm'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

type Artist = {
  id: number
  nomeArtista: string
  generoMusical: string
  biografia: string
  nacionalidade: string
  fotoArtista: string
  grupoMusicalId?: number
  utilizadorId: number
}

type Grupo = {
  id: number
  nomeGrupoMusical: string
}

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [newFoto, setNewFoto] = useState<File | null>(null)

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Artista`)
      .then(res => setArtists(res.data))
      .catch(err => console.error("Erro ao buscar artistas:", err))

    axios.get(`${BASE_URL}/api/GrupoMusical`)
      .then(res => setGrupos(res.data))
      .catch(err => console.error("Erro ao buscar grupos:", err))
  }, [])

  const genres = Array.from(new Set(artists.map(a => a.generoMusical)))
  const filteredArtists = artists.filter(a =>
    a.nomeArtista.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre ? a.generoMusical === selectedGenre : true)
  )

  const handleDelete = async (id: number) => {
    await axios.delete(`${BASE_URL}/api/Artista/${id}`)
    setArtists(prev => prev.filter(a => a.id !== id))
    setSelectedArtist(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFoto(e.target.files[0])
    }
  }

  const handleSave = async () => {
    if (!selectedArtist || !selectedArtist.utilizadorId) {
      alert("O artista precisa ter um utilizadorId.")
      return
    }

    const formData = new FormData()
    formData.append("nomeArtista", selectedArtist.nomeArtista)
    formData.append("generoMusical", selectedArtist.generoMusical)
    formData.append("biografia", selectedArtist.biografia)
    formData.append("nacionalidade", selectedArtist.nacionalidade)
    formData.append("utilizadorId", selectedArtist.utilizadorId.toString())

    if (selectedArtist.grupoMusicalId != null) {
      formData.append("grupoMusicalId", selectedArtist.grupoMusicalId.toString())
    }

    if (newFoto) {
      formData.append("foto", newFoto)
    }

    try {
      const res = await axios.put(`${BASE_URL}/api/Artista/${selectedArtist.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setArtists(prev =>
        prev.map(a => a.id === selectedArtist.id ? res.data : a)
      )
      setEditMode(false)
      setNewFoto(null)
    } catch (error: any) {
      console.error("Erro ao atualizar artista:", error.response?.data || error.message)
      alert("Erro ao atualizar artista. Verifique os campos.")
    }
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Artistas</h1>
          <div className="flex gap-4 flex-wrap">
            <input
              placeholder="Pesquisar artista"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg w-64"
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
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} /> Novo Artista
            </button>
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
                <img
                  src={`${BASE_URL}${artist.fotoArtista}`}
                  alt={artist.nomeArtista}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold">{artist.nomeArtista}</h3>
              <p className="text-xs text-gray-500">{artist.generoMusical}</p>
            </div>
          ))}
        </div>

        {/* Modal Detalhes / Edição */}
        <Transition show={!!selectedArtist} as={Fragment}>
          <Dialog onClose={() => setSelectedArtist(null)} className="relative z-50">
            <Transition.Child as={Fragment}>
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Transition.Child as={Fragment}>
                <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-lg font-bold">Detalhes do Artista</Dialog.Title>
                    <button onClick={() => setSelectedArtist(null)} className="text-gray-500 hover:text-gray-700"><X /></button>
                  </div>

                  <div className="relative w-fit">
                    <img
                      src={newFoto ? URL.createObjectURL(newFoto) : `${BASE_URL}${selectedArtist?.fotoArtista}`}
                      alt="Foto"
                      className="w-24 h-24 object-cover rounded-full"
                    />
                    {editMode && (
                      <>
                        <label htmlFor="fotoUpload" className="absolute -bottom-1 -right-1 bg-purple-600 p-2 rounded-full cursor-pointer text-white">
                          <UploadCloud size={16} />
                        </label>
                        <input
                          id="fotoUpload"
                          name="foto"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>

                  {editMode ? (
                    <>
                      <input className="w-full border px-2 py-1 rounded" value={selectedArtist?.nomeArtista} onChange={(e) => setSelectedArtist({ ...selectedArtist!, nomeArtista: e.target.value })} />
                      <input className="w-full border px-2 py-1 rounded" value={selectedArtist?.generoMusical} onChange={(e) => setSelectedArtist({ ...selectedArtist!, generoMusical: e.target.value })} />
                      <textarea className="w-full border px-2 py-1 rounded" value={selectedArtist?.biografia} onChange={(e) => setSelectedArtist({ ...selectedArtist!, biografia: e.target.value })} />
                      <input className="w-full border px-2 py-1 rounded" value={selectedArtist?.nacionalidade} onChange={(e) => setSelectedArtist({ ...selectedArtist!, nacionalidade: e.target.value })} />
                      <select
                        value={selectedArtist?.grupoMusicalId || ""}
                        onChange={(e) => setSelectedArtist({ ...selectedArtist!, grupoMusicalId: parseInt(e.target.value) || undefined })}
                        className="w-full border px-2 py-1 rounded"
                      >
                        <option value="">Selecionar grupo musical</option>
                        {grupos.map(g => (
                          <option key={g.id} value={g.id}>{g.nomeGrupoMusical}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold">{selectedArtist?.nomeArtista}</h2>
                      <p className="text-sm text-gray-600">{selectedArtist?.generoMusical}</p>
                      <p className="text-sm">{selectedArtist?.biografia}</p>
                      <p className="text-sm text-gray-600">{selectedArtist?.nacionalidade}</p>
                    </>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
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

        {/* Modal de criação */}
        <Transition show={isCreateModalOpen} as={Fragment}>
          <Dialog onClose={() => setIsCreateModalOpen(false)} className="relative z-50">
            <Transition.Child as={Fragment}>
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Transition.Child as={Fragment}>
                <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                  <Dialog.Title className="text-lg font-bold">Novo Artista</Dialog.Title>
                  <CreateArtistForm
                    onSuccess={(artistCriado) => {
                      setArtists(prev => [...prev, artistCriado])
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
