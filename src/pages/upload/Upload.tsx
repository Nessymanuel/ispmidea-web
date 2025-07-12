'use client'

import { useState, useCallback } from 'react'
import { UploadCloud, Music, Video, Image, File, X, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MainLayout from '@/components/layout/MainLayout'
import { Switch } from '@/components/ui/switch'

type FileWithPreview = {
  file: File
  preview: string
  type: 'audio' | 'video' | 'image' | 'other'
}

export default function Upload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [tipoMidia, setTipoMidia] = useState<'musica' | 'video'>('musica')
  const [visibilidadePublica, setVisibilidadePublica] = useState(true)

  const [formData, setFormData] = useState<any>({
    DataLancamento: new Date().toISOString()
  })

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

  const validateFields = () => {
    const requiredFieldsMusica = ['TituloMusica', 'GeneroMusical']
    const requiredFieldsVideo = ['TituloVideo', 'GeneroDoVideo']
    const required = tipoMidia === 'musica' ? requiredFieldsMusica : requiredFieldsVideo

    for (const field of required) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`O campo "${field}" é obrigatório.`)
        return false
      }
    }

    if (files.length === 0) {
      alert('Adicione pelo menos um ficheiro para upload.')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateFields()) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const payload = new FormData()
      files.forEach(file => payload.append(file.type === 'audio' ? 'ficheiroMusica' : 'ficheiroVideo', file.file))
      payload.append('Visibilidade', visibilidadePublica ? 'Público' : 'Privado')
      payload.append('DataLancamento', formData.DataLancamento || new Date().toISOString())

      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value)
      })

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 25
        })
      }, 250)

      await new Promise(resolve => setTimeout(resolve, 3000))
      clearInterval(interval)
      setUploadProgress(100)

      setTimeout(() => {
        setFiles([])
        setFormData({ DataLancamento: new Date().toISOString() })
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)

    } catch (err) {
      console.error('Erro:', err)
      setIsUploading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Enviar Conteúdo</h1>
          <p className="text-gray-600">Adicione suas músicas ou vídeos à plataforma</p>
        </div>

        {/* Tipo de mídia */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Tipo de mídia:</label>
          <select
            value={tipoMidia}
            onChange={(e) => setTipoMidia(e.target.value as 'musica' | 'video')}
            className="border px-3 py-1 rounded"
          >
            <option value="musica">Música</option>
            <option value="video">Vídeo</option>
          </select>
        </div>

        {/* Upload */}
        <div
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
          onDrop={(e) => {
            e.preventDefault()
            handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>)
          }}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 relative"
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="audio/*,video/*"
          />
          <div className="pointer-events-none flex flex-col items-center space-y-2">
            <UploadCloud className="text-gray-400" size={40} />
            <p className="font-medium">Clique ou arraste seus arquivos aqui</p>
            <p className="text-sm text-gray-500">Formatos suportados: MP3, MP4, etc.</p>
          </div>
        </div>

        {/* Lista */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex justify-between items-center border p-2 rounded">
                <span>{file.file.name}</span>
                <button type="button" onClick={() => removeFile(idx)}>
                  <X className="text-red-500" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {tipoMidia === 'musica' ? (
            <>
              <LabelInput label="Título da Música" required name="TituloMusica" setFormData={setFormData} />
              <LabelInput label="Gênero Musical" required name="GeneroMusical" setFormData={setFormData} />
              <LabelInput label="Letra" name="Letra" setFormData={setFormData} />
              <LabelInput label="Produtor" name="Produtor" setFormData={setFormData} />
              <LabelInput label="Compositor" name="Compositor" setFormData={setFormData} />
            </>
          ) : (
            <>
              <LabelInput label="Título do Vídeo" required name="TituloVideo" setFormData={setFormData} />
              <LabelInput label="Gênero do Vídeo" required name="GeneroDoVideo" setFormData={setFormData} />
              <LabelInput label="Legenda" name="Legenda" setFormData={setFormData} />
              <LabelInput label="Produtor" name="Produtor" setFormData={setFormData} />
            </>
          )}

          {/* Visibilidade */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Público</label>
            <Switch checked={visibilidadePublica} onCheckedChange={setVisibilidadePublica} />
          </div>

          {/* Data de Lançamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Lançamento *</label>
            <input
              type="date"
              required
              value={formData.DataLancamento.split('T')[0]}
              onChange={(e) => setFormData({ ...formData, DataLancamento: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Progresso */}
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {uploadProgress === 100 && (
            <div className="bg-green-100 text-green-700 p-3 rounded flex items-center gap-2">
              <Check size={18} /> Upload finalizado!
            </div>
          )}

          <div className="flex justify-end gap-4 pt-2">
            <Button type="reset" variant="outline" onClick={() => { setFiles([]); setFormData({ DataLancamento: new Date().toISOString() }) }}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
              {isUploading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

// Componente auxiliar
function LabelInput({
  label,
  name,
  setFormData,
  required = false
}: {
  label: string
  name: string
  required?: boolean
  setFormData: (value: any) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        onChange={(e) => setFormData(prev => ({ ...prev, [name]: e.target.value }))}
        className="w-full px-4 py-2 border rounded-lg"
        required={required}
      />
    </div>
  )
}