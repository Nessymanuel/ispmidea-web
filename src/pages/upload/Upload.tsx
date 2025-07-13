'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { UploadCloud, X, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import MainLayout from '@/components/layout/MainLayout'

const BASE_URL = 'http://localhost:5252'

type FileWithPreview = {
  file: File
  preview: string
  type: 'audio' | 'video' | 'image' | 'other'
}

export default function Upload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [capa, setCapa] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [tipoMidia, setTipoMidia] = useState<'musica' | 'video'>('musica')
  const [visibilidadePublica, setVisibilidadePublica] = useState(true)

  const [formData, setFormData] = useState<any>({
    DataLancamento: new Date().toISOString()
  })

  const [artistas, setArtistas] = useState<any[]>([])
  const [grupos, setGrupos] = useState<any[]>([])
  const [albuns, setAlbuns] = useState<any[]>([])

  useEffect(() => {
    fetch(`${BASE_URL}/api/Artista`).then(res => res.json()).then(setArtistas)
    fetch(`${BASE_URL}/api/GrupoMusical`).then(res => res.json()).then(setGrupos)
    fetch(`${BASE_URL}/api/Album`).then(res => res.json()).then(setAlbuns)
  }, [])

  // Resetar campos específicos quando muda o tipo de mídia
  useEffect(() => {
    const novaData = new Date().toISOString()
    if (tipoMidia === 'musica') {
      setFormData({
        TituloMusica: '',
        GeneroMusical: '',
        Letra: '',
        Produtor: '',
        Compositor: '',
        ArtistaId: '',
        GrupoMusicalId: '',
        AlbumId: '',
        DataLancamento: novaData
      })
    } else {
      setFormData({
        TituloVideo: '',
        GeneroDoVideo: '',
        Legenda: '',
        Produtor: '',
        ArtistaId: '',
        GrupoMusicalId: '',
        AlbumId: '',
        DataLancamento: novaData
      })
    }
  }, [tipoMidia])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => {
        let type: FileWithPreview['type'] = 'other'
        if (file.type.startsWith('audio/')) type = 'audio'
        else if (file.type.startsWith('video/')) type = 'video'
        else if (file.type.startsWith('image/')) type = 'image'

        return {
          file,
          preview: URL.createObjectURL(file),
          type
        }
      })
      setFiles(prev => [...prev, ...newFiles])
    }
  }, [])

  const removeFile = (index: number) => {
    const newFiles = [...files]
    URL.revokeObjectURL(newFiles[index].preview)
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files.length) return alert('Adicione pelo menos um ficheiro.')

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (!user?.id) {
      alert("Usuário não autenticado.")
      return
    }

    const payload = new FormData()
    payload.append(tipoMidia === 'musica' ? 'ficheiroMusica' : 'ficheiroVideo', files[0].file)
    if (capa) payload.append('capa', capa)
    payload.append('Visibilidade', visibilidadePublica ? 'publica' : 'privada')
    payload.append('DataLancamento', formData.DataLancamento)
    payload.append('UtilizadorId', user.id.toString())

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        payload.append(key, value.toString())
      }
    })

    // Debug do FormData
    for (const [key, value] of payload.entries()) {
      console.log(`${key}:`, value)
    }

    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 20
      })
    }, 300)

    try {
      await axios.post(`${BASE_URL}/api/${tipoMidia === 'musica' ? 'Musica' : 'Video'}`, payload)
      alert('Upload concluído com sucesso!')
    } catch (err) {
      console.error(err)
      alert('Erro ao enviar. Verifique os campos e tente novamente.')
    } finally {
      clearInterval(interval)
      setTimeout(() => {
        setFiles([])
        setCapa(null)
        setFormData({ DataLancamento: new Date().toISOString() })
        setUploadProgress(0)
        setIsUploading(false)
      }, 1000)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 space-y-10">
        <h1 className="text-3xl font-bold text-center">Upload de Conteúdo</h1>

        <select
          value={tipoMidia}
          onChange={(e) => setTipoMidia(e.target.value as 'musica' | 'video')}
          className="border px-3 py-1 rounded"
        >
          <option value="musica">Música</option>
          <option value="video">Vídeo</option>
        </select>

        <div className="border-2 border-dashed p-6 text-center relative rounded-lg">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            accept="audio/*,video/*"
          />
          <UploadCloud className="mx-auto text-gray-400" />
          <p>Arraste ou clique para enviar sua mídia</p>
        </div>

        <div className="border p-4 rounded">
          <label className="block text-sm mb-1">Capa da {tipoMidia === 'musica' ? 'Música' : 'Vídeo'}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCapa(e.target.files?.[0] || null)}
            className="w-full border px-3 py-1 rounded"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tipoMidia === 'musica' ? (
            <>
              <TextInput label="Título da Música" name="TituloMusica" setFormData={setFormData} />
              <TextInput label="Gênero Musical" name="GeneroMusical" setFormData={setFormData} />
              <TextInput label="Letra" name="Letra" setFormData={setFormData} />
              <TextInput label="Produtor" name="Produtor" setFormData={setFormData} />
              <TextInput label="Compositor" name="Compositor" setFormData={setFormData} />
            </>
          ) : (
            <>
              <TextInput label="Título do Vídeo" name="TituloVideo" setFormData={setFormData} />
              <TextInput label="Gênero do Vídeo" name="GeneroDoVideo" setFormData={setFormData} />
              <TextInput label="Legenda" name="Legenda" setFormData={setFormData} />
              <TextInput label="Produtor" name="Produtor" setFormData={setFormData} />
            </>
          )}

          <SelectInput label="Artista" name="ArtistaId" options={artistas} labelKey="nomeArtista" setFormData={setFormData} />
          <SelectInput label="Grupo Musical" name="GrupoMusicalId" options={grupos} labelKey="nomeGrupoMusical" setFormData={setFormData} />
          <SelectInput label="Álbum" name="AlbumId" options={albuns} labelKey="tituloAlbum" setFormData={setFormData} />

          <div className="flex items-center gap-2">
            <label>Visibilidade pública:</label>
            <Switch checked={visibilidadePublica} onCheckedChange={setVisibilidadePublica} />
          </div>

          <div>
            <label className="text-sm">Data de Lançamento</label>
            <input
              type="date"
              value={formData.DataLancamento.split('T')[0]}
              onChange={(e) => setFormData({ ...formData, DataLancamento: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }} />
            </div>
          )}
          {uploadProgress === 100 && (
            <div className="bg-green-100 text-green-800 p-3 rounded flex items-center gap-2">
              <Check /> Upload concluído!
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button type="reset" variant="outline" onClick={() => {
              setFiles([])
              setCapa(null)
              setFormData({ DataLancamento: new Date().toISOString() })
            }}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              {isUploading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

function TextInput({ label, name, setFormData }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="text"
        onChange={(e) => setFormData((prev: any) => ({ ...prev, [name]: e.target.value }))}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  )
}

function SelectInput({ label, name, options, labelKey, setFormData }: any) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select
        required
        className="w-full px-3 py-2 border rounded text-black bg-white"
        onChange={(e) => setFormData((prev: any) => ({ ...prev, [name]: e.target.value }))}
      >
        <option value="">Selecione...</option>
        {options.map((opt: any) => (
          <option key={opt.id} value={String(opt.id)}>
            {opt[labelKey]}
          </option>
        ))}
      </select>
    </div>
  )
}
