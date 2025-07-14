'use client'

import { useEffect, useState } from 'react'
import {
  Music, Video, ThumbsUp, MessageCircle, Star
} from 'lucide-react'
import clsx from 'clsx'
import { Card } from '@/components/ui/card'
import MainLayout from '@/components/layout/MainLayout'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface Musica {
  id: number
  tituloMusica: string
  nomeArtista: string
  capaMusica: string
  visibilidade: string
  utilizadorId: number
  tipo: 'musica'
}

interface Video {
  id: number
  tituloVideo: string
  nomeArtista: string
  capaVideo: string
  visibilidade: string
  utilizadorId: number
  tipo: 'video'
}

interface Critica {
  id: number
  pontuacao: number
  comentario: string
  nomeUtilizador: string
  
}

type Conteudo = Musica | Video

export default function Dashboard() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([])
  const [selected, setSelected] = useState<Conteudo | null>(null)
  const [likes, setLikes] = useState<number>(0)
  const [criticas, setCriticas] = useState<Critica[]>([])
  const [activeFilter, setActiveFilter] = useState<'all' | 'music' | 'video'>('all')
  const [comentario, setComentario] = useState('')
  const [estrela, setEstrela] = useState(0)

  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const userId = user ? JSON.parse(user).id : null

  useEffect(() => {
    const fetchConteudos = async () => {
      if (!userId) return
      try {
        const [musicaRes, videoRes] = await Promise.all([
          fetch(`${BASE_URL}/api/Musica/emalta/${userId}`),
          fetch(`${BASE_URL}/api/Video/emalta/${userId}`)
        ])
        const [musicas, videos] = await Promise.all([
          musicaRes.json(),
          videoRes.json()
        ])

        const musicasComTipo = musicas.map((m: any) => ({ ...m, tipo: 'musica' }))
        const videosComTipo = videos.map((v: any) => ({ ...v, tipo: 'video' }))

        const combinados = [...musicasComTipo, ...videosComTipo]
        setConteudos(combinados)
        if (combinados.length > 0) setSelected(combinados[0])
      } catch (err) {
        console.error('Erro ao buscar conteúdos:', err)
      }
    }

    fetchConteudos()
  }, [userId])

  useEffect(() => {
    const fetchExtras = async () => {
      if (!selected) return
      try {
        const tipo = selected.tipo
        const id = selected.id

        const likeRes = await fetch(`${BASE_URL}/api/Like/${tipo}/${id}`)
        const likeData = await likeRes.json()
        setLikes(likeData.totalLikes)

        const criticaRes = await fetch(`${BASE_URL}/api/Critica/${tipo}/${id}`)
        const criticaData = await criticaRes.json()
        setCriticas(criticaData)
      } catch (err) {
        console.error('Erro ao buscar likes e críticas:', err)
      }
    }

    fetchExtras()
  }, [selected])

  const handleLike = async () => {
  if (!selected || !userId) return
  const body = {
    utilizadorId: userId,
    musicaId: selected.tipo === 'musica' ? selected.id : null,
    videoId: selected.tipo === 'video' ? selected.id : null,
    albumId: null // Adicionado aqui
  }

  console.log('Enviando like:', body)

  try {
    await fetch(`${BASE_URL}/api/Like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    setLikes(prev => prev + 1)
  } catch (err) {
    console.error('Erro ao enviar like:', err)
  }
}


const handleCritica = async () => {
  if (!selected || !userId || estrela === 0 || comentario === '') return
  const body = {
    utilizadorId: userId,
    pontuacao: estrela,
    comentario,
    musicaId: selected.tipo === 'musica' ? selected.id : null,
    videoId: selected.tipo === 'video' ? selected.id : null,
    albumId: null // Adicionado aqui
  }

  console.log('Enviando crítica:', body)

  try {
    await fetch(`${BASE_URL}/api/Critica`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    setComentario('')
    setEstrela(0)
  } catch (err) {
    console.error('Erro ao enviar crítica:', err)
  }
}


  const conteudosFiltrados = conteudos.filter(c =>
    activeFilter === 'all' || c.tipo === (activeFilter === 'music' ? 'musica' : 'video')
  )

  return (
    <MainLayout>
      <main className="max-w-7xl mx-auto px-4 py-20 space-y-12">
        {/* Filtro */}
        <div className="flex gap-4">
          {['all', 'music', 'video'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f as any)}
              className={clsx("px-4 py-2 rounded-full", activeFilter === f ? 'bg-purple-600 text-white' : 'bg-gray-200')}
            >
              {f === 'all' && 'Todos'}
              {f === 'music' && <><Music size={16} className="inline mr-1" /> Músicas</>}
              {f === 'video' && <><Video size={16} className="inline mr-1" /> Vídeos</>}
            </button>
          ))}
        </div>

        {selected && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              {/* Player */}
              <div className="w-full aspect-video rounded-xl overflow-hidden space-y-4">
                {selected.tipo === 'musica' && (
                  <img
                    src={`${BASE_URL}${selected.capaMusica}`}
                    className="w-full h-[450px] object-cover rounded-xl"
                  />
                )}
                {selected.tipo === 'musica' ? (
                  <audio controls className="w-full">
                    <source src={`${BASE_URL}/api/Musica/stream/${selected.id}`} type="audio/mpeg" />
                  </audio>
                ) : (
                  <video controls className="w-full h-[450px] rounded-xl">
                    <source src={`${BASE_URL}/api/Video/stream/${selected.id}`} type="video/mp4" />
                  </video>
                )}
              </div>

              {/* Info + Like + Crítica */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selected.tipo === 'musica' ? selected.tituloMusica : selected.tituloVideo}
                </h3>
                <p className="text-gray-600 text-sm">{selected.nomeArtista || 'Artista desconhecido'}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <ThumbsUp onClick={handleLike} className="text-purple-500 cursor-pointer" />
                  {likes} curtidas
                </div>

                {/* Crítica */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Enviar Avaliação</h4>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={20}
                        onClick={() => setEstrela(s)}
                        className={clsx('cursor-pointer', estrela >= s ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400')}
                      />
                    ))}
                  </div>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Escreva um comentário..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button onClick={handleCritica} className="bg-purple-600 text-white px-4 py-2 rounded-md">Enviar</button>
                </div>

                {/* Lista de comentários */}
                <div>
                  <h4 className="font-semibold">Comentários</h4>
                  <ul className="space-y-3">
                    {criticas.map((critica, idx) => (
                      <li key={idx} className="bg-gray-100 p-3 rounded-md">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className={clsx('text-yellow-400', critica.pontuacao >= s ? 'fill-yellow-400' : 'fill-none')} />
                          ))}
                        </div>
                        <p className="text-sm">{critica.comentario}</p>
                        <p className="text-xs text-gray-500">por {critica.nomeUtilizador}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Lista em alta */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Em Alta</h4>
              {conteudosFiltrados.map(item => (
                <div
                  key={`${item.tipo}-${item.id}`}
                  onClick={() => setSelected(item)}
                  className={clsx('flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md', selected?.id === item.id && selected?.tipo === item.tipo && 'bg-purple-50')}
                >
                  <img
                    src={`${BASE_URL}${item.tipo === 'musica' ? item.capaMusica : item.capaVideo}`}
                    className="w-20 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.tipo === 'musica' ? item.tituloMusica : item.tituloVideo}</p>
                    <p className="text-xs text-gray-500">{item.nomeArtista || 'Artista'}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </MainLayout>
  )
}
