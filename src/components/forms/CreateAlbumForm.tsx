'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Upload } from 'lucide-react'

interface Props {
  onSuccess: (novoAlbum: any) => void
  onCancel: () => void
}

interface Artista {
  id: number
  nomeArtista: string
}

export function CreateAlbumForm({ onSuccess, onCancel }: Props) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const [artistas, setArtistas] = useState<Artista[]>([])
  const [formData, setFormData] = useState({
    tituloAlbum: '',
    descricao: '',
    editora: '',
    dataLancamento: '',
    visibilidade: 'publico',
    artistaId: '',
    utilizadorId: ''
  })
  const [capa, setCapa] = useState<File | null>(null)

  useEffect(() => {
    axios.get(`${BASE_URL}/api/Artista`)
      .then(res => setArtistas(res.data))
      .catch(err => console.error('Erro ao buscar artistas:', err))

    const user = localStorage.getItem("user")
    if (user) {
      const { id } = JSON.parse(user)
      setFormData(prev => ({ ...prev, utilizadorId: id.toString() }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCapa(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.tituloAlbum || !formData.editora || !formData.dataLancamento || !formData.artistaId || !capa) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })
    data.append('capa', capa)

    try {
      const res = await axios.post(`${BASE_URL}/api/Album`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      onSuccess(res.data)
    } catch (err) {
      console.error('Erro ao criar álbum:', err)
      alert('Erro ao criar álbum. Verifique os dados.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        name="tituloAlbum"
        placeholder="Título do Álbum"
        className="w-full border px-3 py-2 rounded"
        value={formData.tituloAlbum}
        onChange={handleChange}
      />
      <textarea
        name="descricao"
        placeholder="Descrição"
        className="w-full border px-3 py-2 rounded"
        value={formData.descricao}
        onChange={handleChange}
      />
      <input
        required
        name="editora"
        placeholder="Editora"
        className="w-full border px-3 py-2 rounded"
        value={formData.editora}
        onChange={handleChange}
      />
      <input
        required
        type="date"
        name="dataLancamento"
        className="w-full border px-3 py-2 rounded"
        value={formData.dataLancamento}
        onChange={handleChange}
      />
      <select
        required
        name="artistaId"
        className="w-full border px-3 py-2 rounded"
        value={formData.artistaId}
        onChange={handleChange}
      >
        <option value="">Selecionar artista</option>
        {artistas.map(a => (
          <option key={a.id} value={a.id}>{a.nomeArtista}</option>
        ))}
      </select>

      <div className="w-full">
        <label htmlFor="capaUpload" className="flex items-center justify-center gap-2 border px-4 py-2 rounded cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700">
          <Upload size={18} />
          {capa ? capa.name : 'Selecionar capa'}
        </label>
        <input
          id="capaUpload"
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