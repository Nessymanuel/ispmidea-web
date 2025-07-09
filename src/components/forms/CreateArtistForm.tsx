'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Upload } from 'lucide-react'

interface Props {
  onSuccess: (novoArtista: any) => void
  onCancel: () => void
}

interface GrupoMusical {
  id: number
  nomeGrupoMusical: string
}

export function CreateArtistForm({ onSuccess, onCancel }: Props) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [grupos, setGrupos] = useState<GrupoMusical[]>([])

  const [formData, setFormData] = useState({
    nomeArtista: '',
    generoMusical: '',
    biografia: '',
    nacionalidade: '',
    grupoMusicalId: '',
    foto: null as File | null
  })

  useEffect(() => {
    axios.get(`${BASE_URL}/api/GrupoMusical`)
      .then(res => setGrupos(res.data))
      .catch(err => console.error('Erro ao buscar grupos:', err))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, foto: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const user = localStorage.getItem("user")
    if (!user) {
      alert("Utilizador não encontrado. Faça login novamente.")
      return
    }

    const { id: utilizadorId } = JSON.parse(user)

    const data = new FormData()
    data.append('nomeArtista', formData.nomeArtista)
    data.append('generoMusical', formData.generoMusical)
    data.append('biografia', formData.biografia)
    data.append('nacionalidade', formData.nacionalidade)
    data.append('grupoMusicalId', formData.grupoMusicalId)
    data.append('utilizadorId', utilizadorId.toString())
    if (formData.foto) data.append('foto', formData.foto)

    try {
      const response = await axios.post(`${BASE_URL}/api/Artista`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onSuccess(response.data)
    } catch (error) {
      console.error('Erro ao criar artista:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        name="nomeArtista"
        placeholder="Nome do artista"
        className="w-full border px-3 py-2 rounded"
        value={formData.nomeArtista}
        onChange={handleChange}
      />
      <input
        required
        name="generoMusical"
        placeholder="Género musical"
        className="w-full border px-3 py-2 rounded"
        value={formData.generoMusical}
        onChange={handleChange}
      />
      <textarea
        name="biografia"
        placeholder="Biografia"
        className="w-full border px-3 py-2 rounded"
        value={formData.biografia}
        onChange={handleChange}
      />
      <input
        required
        name="nacionalidade"
        placeholder="Nacionalidade"
        className="w-full border px-3 py-2 rounded"
        value={formData.nacionalidade}
        onChange={handleChange}
      />
      <select
        name="grupoMusicalId"
        className="w-full border px-3 py-2 rounded"
        value={formData.grupoMusicalId}
        onChange={handleChange}
        
      >
        <option value="">Selecionar grupo musical</option>
        {grupos.map(grupo => (
          <option key={grupo.id} value={grupo.id}>
            {grupo.nomeGrupoMusical}
          </option>
        ))}
      </select>

      <div className="w-full">
        <label htmlFor="fotoUpload" className="flex items-center justify-center gap-2 border px-4 py-2 rounded cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700">
          <Upload size={18} />
          {formData.foto ? formData.foto.name : 'Escolher foto'}
        </label>
        <input
          id="fotoUpload"
          name="foto"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="text-gray-600 hover:underline">Cancelar</button>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Salvar</button>
      </div>
    </form>
  )
}
