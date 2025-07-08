import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, Music, Video, Image, File, X, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MainLayout from '@/components/layout/MainLayout'

type FileWithPreview = {
  file: File
  preview: string
  type: 'audio' | 'video' | 'image' | 'other'
}

export default function Upload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: 'Pop',
    description: ''
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({
        target: { files: e.dataTransfer.files }
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    URL.revokeObjectURL(newFiles[index].preview)
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulação de upload
    try {
      const formPayload = new FormData()
      files.forEach(file => formPayload.append('files', file.file))
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value)
      })

      // Simulando progresso do upload
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 300)

      // Simulando requisição
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      clearInterval(interval)
      setUploadProgress(100)
      
      // Reset após "upload" completo
      setTimeout(() => {
        setFiles([])
        setFormData({
          title: '',
          artist: '',
          genre: 'Pop',
          description: ''
        })
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
      
    } catch (error) {
      console.error('Upload error:', error)
      setIsUploading(false)
    }
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Enviar Conteúdo</h1>
            <p className="text-gray-600">
              Adicione suas músicas, vídeos ou álbuns à plataforma
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Área de Upload */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors relative"
            >
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="audio/*,video/*,image/*"
              />
              <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
                <UploadCloud className="text-gray-400" size={48} />
                <div>
                  <p className="font-medium text-gray-900">
                    Arraste e solte seus arquivos aqui
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Ou clique para selecionar arquivos
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Formatos suportados: MP3, FLAC, WAV, MP4, AVI, PNG, JPG
                </p>
              </div>
            </motion.div>

            {/* Arquivos Selecionados */}
            {files.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Arquivos selecionados ({files.length})</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {file.type === 'audio' && <Music className="text-purple-600" size={20} />}
                        {file.type === 'video' && <Video className="text-purple-600" size={20} />}
                        {file.type === 'image' && <Image className="text-purple-600" size={20} />}
                        {file.type === 'other' && <File className="text-purple-600" size={20} />}
                        
                        <div className="truncate max-w-xs">
                          <p className="truncate">{file.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pré-visualização para imagens */}
            {files.some(f => f.type === 'image') && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {files.filter(f => f.type === 'image').map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img
                      src={file.preview}
                      alt={`Preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Detalhes do Conteúdo */}
            <div className="pt-6 border-t">
              <h2 className="font-semibold text-lg mb-4">Detalhes do Conteúdo</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Nome do conteúdo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Artista *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.artist}
                      onChange={(e) => setFormData({...formData, artist: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Nome do artista"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gênero *
                    </label>
                    <select
                      required
                      value={formData.genre}
                      onChange={(e) => setFormData({...formData, genre: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="Pop">Pop</option>
                      <option value="Rock">Rock</option>
                      <option value="Hip Hop">Hip Hop</option>
                      <option value="Eletrônica">Eletrônica</option>
                      <option value="Sertanejo">Sertanejo</option>
                      <option value="Funk">Funk</option>
                      <option value="MPB">MPB</option>
                      <option value="Clássica">Clássica</option>
                      <option value="Jazz">Jazz</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Adicione uma descrição..."
                  ></textarea>
                </div>

                {/* Barra de Progresso */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Enviando arquivos...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Mensagem de Sucesso */}
                {uploadProgress === 100 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3"
                  >
                    <Check className="text-green-600" size={20} />
                    <span>Upload concluído com sucesso!</span>
                  </motion.div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    disabled={isUploading}
                    onClick={() => {
                      setFiles([])
                      setFormData({
                        title: '',
                        artist: '',
                        genre: 'Pop',
                        description: ''
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={files.length === 0 || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : 'Enviar Conteúdo'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  )
}