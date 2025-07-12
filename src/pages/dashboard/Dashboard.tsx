'use client'

import { useState } from 'react'
import {
  Music, Video, Album, ThumbsUp, MessageCircle, Star
} from 'lucide-react'
import clsx from 'clsx'
import { Card } from '@/components/ui/card'
import MainLayout from '@/components/layout/MainLayout'

const mockData = [
  {
    id: 1,
    type: 'music',
    title: 'Luna',
    artist: 'Edmasia',
    cover: '/Luna.jpg',
    audio: '/Luna.mp3',
    duration: '3:30',
    likes: 234,
    comments: [
      { text: 'Muito bom!', rating: 5 },
      { text: 'Essa música é 🔥', rating: 4 }
    ]
  },
  {
    id: 2,
    type: 'video',
    title: 'Preciso de um tempo pra mim',
    group: 'Plutoniooo',
    cover: '/Luna.mp4',
    duration: '12:34',
    likes: 389,
    comments: [
      { text: 'Top demais!', rating: 5 },
      { text: 'Me ajudou muito.', rating: 4 }
    ]
  },
  {
    id: 3,
    type: 'music',
    title: 'Luna',
    artist: 'Edmasia',
    cover: '/Luna.jpg',
    audio: '/Luna.mp3',
    duration: '3:30',
    likes: 234,
    comments: [
      { text: 'Muito bom!', rating: 5 },
      { text: 'Essa música é 🔥', rating: 4 }
    ]
  },
  {
    id: 4,
    type: 'video',
    title: 'Preciso de um tempo pra mim',
    group: 'Plutoniooo',
    cover: '/Luna.mp4',
    duration: '12:34',
    likes: 389,
    comments: [
      { text: 'Top demais!', rating: 5 },
      { text: 'Me ajudou muito.', rating: 4 }
    ]
  },
  
]

const filters = [
  { value: 'all', label: 'Todos', icon: null },
  { value: 'music', label: 'Músicas', icon: <Music size={16} /> },
  { value: 'video', label: 'Vídeos', icon: <Video size={16} /> },
  { value: 'album', label: 'Álbuns', icon: <Album size={16} /> }
]

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [mediaList, setMediaList] = useState(mockData)
  const [selectedMedia, setSelectedMedia] = useState(mockData[0])
  const [likes, setLikes] = useState(selectedMedia.likes)
  const [newComment, setNewComment] = useState('')
  const [newRating, setNewRating] = useState(0)

  const filteredItems = mediaList.filter(item =>
    activeFilter === 'all' || item.type === activeFilter
  )

  const handleLike = () => {
    setLikes(prev => prev + 1)
  }

  const handleAddComment = () => {
    if (newComment.trim() && newRating > 0) {
      const updatedList = mediaList.map(item => {
        if (item.id === selectedMedia.id) {
          return {
            ...item,
            comments: [...item.comments, { text: newComment, rating: newRating }]
          }
        }
        return item
      })
      setMediaList(updatedList)
      setSelectedMedia({
        ...selectedMedia,
        comments: [...selectedMedia.comments, { text: newComment, rating: newRating }]
      })
      setNewComment('')
      setNewRating(0)
    }
  }

  return (
    <MainLayout>
      <main className="max-w-7xl mx-auto px-4 py-20 space-y-12">

        {/* Filtros */}
        <section className="flex gap-2 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={clsx(
                'px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition',
                activeFilter === filter.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </section>

        {/* Player + sugeridos */}
        {selectedMedia && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Player */}
            <div className="col-span-2 space-y-6">
              <div className="w-full aspect-video rounded-xl overflow-hidden space-y-4">
                {selectedMedia.type === 'video' ? (
                  <video controls className="w-full h-full object-cover rounded-xl">
                    <source src={selectedMedia.cover} type="video/mp4" />
                  </video>
                ) : (
                  <>
                    <img
                      src={selectedMedia.cover}
                      alt={selectedMedia.title}
                      className="w-full h-[250px] object-cover rounded-xl"
                    />
                    <audio controls className="w-full">
                      <source src={selectedMedia.audio} type="audio/mpeg" />
                      Seu navegador não suporta o áudio.
                    </audio>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedMedia.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {selectedMedia.artist || selectedMedia.group}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{selectedMedia.duration}</span>
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-1 hover:text-purple-600"
                  >
                    <ThumbsUp size={16} className="text-purple-500" />
                    {likes}
                  </button>
                </div>
              </div>

              {/* Comentários */}
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <MessageCircle size={16} /> Comentários
                </h4>

                <div className="mb-4 space-y-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escreva um comentário..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-purple-500"
                  />
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        onClick={() => setNewRating(star)}
                        className={clsx(
                          "cursor-pointer",
                          star <= newRating ? "text-yellow-400" : "text-gray-300"
                        )}
                        fill={star <= newRating ? "currentColor" : "none"}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">{newRating}/5</span>
                  </div>
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Comentar
                  </button>
                </div>

                <ul className="space-y-3">
                  {selectedMedia.comments.map((comment, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700 flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={clsx(
                              "text-yellow-400",
                              comment.rating >= star ? "fill-yellow-400" : "fill-none"
                            )}
                          />
                        ))}
                      </div>
                      <span>{comment.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sugeridos */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Sugeridos</h4>
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedMedia(item)
                    setLikes(item.likes)
                    setNewComment('')
                    setNewRating(0)
                  }}
                  className={clsx(
                    'flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md',
                    item.id === selectedMedia.id && 'bg-purple-50'
                  )}
                >
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-20 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.artist || item.group}</p>
                    <span className="text-xs text-gray-400">{item.duration}</span>
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