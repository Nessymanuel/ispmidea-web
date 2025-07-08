// Dados mockados otimizados
'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import {
  Play,
  Lock,
  Users,
  Music,
  Video,
  Album,
  ListMusic
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import MainLayout from '@/components/layout/MainLayout'
import * as Dialog from '@radix-ui/react-dialog'

 const mockData = {
  user: {
    username: 'Gracieth',
    role: 'editor',
    avatar: '/imgprofile.jpg'
  },
  groups: [
    { id: 1, name: 'Grupo Unde', members: 6, isOwner: false },
    { id: 2, name: 'Grupo Nam', members: 11, isOwner: false },
    { id: 3, name: 'Grupo Ad', members: 23, isOwner: false },
    { id: 4, name: 'Grupo Ad', members: 20, isOwner: false },
    { id: 5, name: 'Grupo Doloribus', members: 28, isOwner: false },
    { id: 6, name: 'Grupo Rem', members: 12, isOwner: true },
    { id: 7, name: 'Grupo Recusandae', members: 8, isOwner: true },
    { id: 8, name: 'Grupo Qui', members: 6, isOwner: true },
    { id: 9, name: 'Grupo Commodi', members: 26, isOwner: false },
    { id: 10, name: 'Grupo Illo', members: 25, isOwner: true },
    { id: 11, name: 'Grupo Non', members: 24, isOwner: false },
    { id: 12, name: 'Grupo Eaque', members: 14, isOwner: false },
    { id: 13, name: 'Grupo Ducimus', members: 5, isOwner: false },
    { id: 14, name: 'Grupo Cupiditate', members: 15, isOwner: true },
    { id: 15, name: 'Grupo Nobis', members: 8, isOwner: true },
    { id: 16, name: 'Grupo Corporis', members: 18, isOwner: false },
    { id: 17, name: 'Grupo Ducimus', members: 10, isOwner: false },
    { id: 18, name: 'Grupo Deleniti', members: 17, isOwner: true },
    { id: 19, name: 'Grupo Inventore', members: 18, isOwner: false },
    { id: 20, name: 'Grupo Dicta', members: 27, isOwner: false }
  ],
  playlists: [
    { id: 1, name: 'Playlist Dolor', type: 'private', items: 26 },
    { id: 2, name: 'Playlist Provident', type: 'public', items: 21 },
    { id: 3, name: 'Playlist Nemo', type: 'private', items: 28 },
    { id: 4, name: 'Playlist Placeat', type: 'private', items: 45 },
    { id: 5, name: 'Playlist Voluptatum', type: 'public', items: 40 },
    { id: 6, name: 'Playlist Consectetur', type: 'private', items: 48 },
    { id: 7, name: 'Playlist Veritatis', type: 'public', items: 45 },
    { id: 8, name: 'Playlist Ab', type: 'private', items: 37 },
    { id: 9, name: 'Playlist Tenetur', type: 'private', items: 34 },
    { id: 10, name: 'Playlist Quisquam', type: 'public', items: 39 },
    { id: 11, name: 'Playlist Blanditiis', type: 'private', items: 19 },
    { id: 12, name: 'Playlist Minima', type: 'public', items: 16 },
    { id: 13, name: 'Playlist Ex', type: 'private', items: 41 },
    { id: 14, name: 'Playlist Adipisci', type: 'public', items: 38 },
    { id: 15, name: 'Playlist Itaque', type: 'private', items: 43 },
    { id: 16, name: 'Playlist Libero', type: 'private', items: 20 },
    { id: 17, name: 'Playlist Ipsum', type: 'public', items: 25 },
    { id: 18, name: 'Playlist Facere', type: 'public', items: 30 },
    { id: 19, name: 'Playlist Incidunt', type: 'private', items: 15 },
    { id: 20, name: 'Playlist Natus', type: 'public', items: 29 }
  ], featured: [
    {
      id: 1,
      type: 'music',
      title: 'Late meeting',
      group: 'Dawson-Reynolds',
      cover: '/cover-1.jpg',
      duration: '3:11'
    },
    {
      id: 2,
      type: 'album',
      title: 'Wish',
      artist: 'Melissa Davis',
      cover: '/cover-2.jpg',
      duration: '3:43'
    },
    {
      id: 3,
      type: 'video',
      title: 'Great value',
      group: 'Smith Group',
      cover: '/cover-3.jpg',
      duration: '4:22'
    },
    {
      id: 4,
      type: 'video',
      title: 'Unique ability',
      group: 'Young LLC',
      cover: '/cover-4.jpg',
      duration: '1:29'
    },
    {
      id: 5,
      type: 'music',
      title: 'You are special',
      artist: 'Paula Phillips',
      cover: '/cover-5.jpg',
      duration: '2:46'
    },
    {
      id: 6,
      type: 'album',
      title: 'Test name',
      artist: 'Michael Hernandez',
      cover: '/cover-6.jpg',
      duration: '2:52'
    },
    {
      id: 7,
      type: 'music',
      title: 'Another song',
      artist: 'Carl Peterson',
      cover: '/cover-7.jpg',
      duration: '3:15'
    },
    {
      id: 8,
      type: 'album',
      title: 'Summer vibes',
      artist: 'Angela Thompson',
      cover: '/cover-8.jpg',
      duration: '4:33'
    },
    {
      id: 9,
      type: 'video',
      title: 'Learning today',
      group: 'Johnson-Kelly',
      cover: '/cover-9.jpg',
      duration: '5:12'
    },
    {
      id: 10,
      type: 'music',
      title: 'Smooth jazz',
      artist: 'Frank Adams',
      cover: '/cover-10.jpg',
      duration: '4:04'
    }, {
      id: 11,
      type: 'music',
      title: 'Beats of the Future',
      artist: 'DJ Nova',
      cover: '/cover-11.jpg',
      duration: '2:50'
    },
    {
      id: 12,
      type: 'album',
      title: 'Horizonte Infinito',
      artist: 'Luna Costa',
      cover: '/cover-12.jpg',
      duration: '3:58'
    },
    {
      id: 13,
      type: 'video',
      title: 'Code Harder',
      group: 'DevLab',
      cover: '/cover-13.jpg',
      duration: '6:10'
    },
    {
      id: 14,
      type: 'video',
      title: 'React Revolution',
      group: 'Frontend Masters',
      cover: '/cover-14.jpg',
      duration: '12:34'
    },
    {
      id: 15,
      type: 'music',
      title: 'Digital Samba',
      artist: 'Carlos Groove',
      cover: '/cover-15.jpg',
      duration: '3:25'
    },
    {
      id: 16,
      type: 'album',
      title: 'Paz & Caos',
      artist: 'Ana Lima',
      cover: '/cover-16.jpg',
      duration: '3:20'
    },
    {
      id: 17,
      type: 'video',
      title: 'Full Stack Crash Course',
      group: 'Tech Explained',
      cover: '/cover-17.jpg',
      duration: '8:00'
    },
    {
      id: 18,
      type: 'music',
      title: 'Frequência Urbana',
      artist: 'ZK & Flow',
      cover: '/cover-18.jpg',
      duration: '3:45'
    },
    {
      id: 19,
      type: 'album',
      title: 'Noite Azul',
      artist: 'Isadora Cruz',
      cover: '/cover-19.jpg',
      duration: '4:21'
    },
    {
      id: 20,
      type: 'music',
      title: 'Flow Digital',
      artist: 'Nando Códigos',
      cover: '/cover-20.jpg',
      duration: '3:30'
    }

  ],
  recentMedia: [
    {
      id: 1,
      type: 'album',
      title: 'Advanced asymmetric groupware',
      group: 'Montgomery, Holloway and King',
      cover: '/media-1.jpg',
      duration: '4:05',
      visibility: 'public'
    },
    {
      id: 2,
      type: 'video',
      title: 'Compatible contextually-based secured line',
      artist: 'Edward Allen',
      cover: '/media-2.jpg',
      duration: '2:58',
      visibility: 'private'
    },
    {
      id: 3,
      type: 'music',
      title: 'Progressive next generation throughput',
      artist: 'Heather Johnson',
      cover: '/media-3.jpg',
      duration: '3:37',
      visibility: 'public'
    },
    {
      id: 4,
      type: 'music',
      title: 'Refatorando a Vida',
      artist: 'João Dev',
      cover: '/media-4.jpg',
      duration: '2:48',
      visibility: 'private'
    },
    {
      id: 5,
      type: 'video',
      title: 'Documentários de Código',
      group: 'Techflix',
      cover: '/media-5.jpg',
      duration: '10:22',
      visibility: 'public'
    },
    {
      id: 6,
      type: 'music',
      title: 'Pixel Beats',
      artist: 'BitByte',
      cover: '/media-6.jpg',
      duration: '3:03',
      visibility: 'private'
    },
    {
      id: 7,
      type: 'album',
      title: 'Estação Lunar',
      artist: 'DJ Cosmo',
      cover: '/media-7.jpg',
      duration: '3:18',
      visibility: 'public'
    },
    {
      id: 8,
      type: 'music',
      title: 'Linha de Código',
      artist: 'MC Stack',
      cover: '/media-8.jpg',
      duration: '4:05',
      visibility: 'private'
    },
    {
      id: 9,
      type: 'video',
      title: 'Async Await 101',
      group: 'DevClasses',
      cover: '/media-9.jpg',
      duration: '5:15',
      visibility: 'public'
    },
    {
      id: 10,
      type: 'music',
      title: 'Lo-fi Terminal',
      artist: 'Studio Nodes',
      cover: '/media-10.jpg',
      duration: '2:40',
      visibility: 'public'
    },
    {
      id: 11,
      type: 'album',
      title: 'Códigos & Melodias',
      artist: 'Array Sound',
      cover: '/media-11.jpg',
      duration: '3:00',
      visibility: 'public'
    },
    {
      id: 12,
      type: 'music',
      title: 'Ctrl+C Feelings',
      artist: 'Copilot Beats',
      cover: '/media-12.jpg',
      duration: '3:27',
      visibility: 'private'
    },
    {
      id: 13,
      type: 'video',
      title: 'Deploy sem Medo',
      group: 'Fullstack Now',
      cover: '/media-13.jpg',
      duration: '7:45',
      visibility: 'public'
    },
    {
      id: 14,
      type: 'music',
      title: 'Bug no Coração',
      artist: '404 Band',
      cover: '/media-14.jpg',
      duration: '4:15',
      visibility: 'private'
    },
    {
      id: 15,
      type: 'music',
      title: 'Merge Conflicts',
      artist: 'Git Flow',
      cover: '/media-15.jpg',
      duration: '3:33',
      visibility: 'public'
    },
    {
      id: 16,
      type: 'album',
      title: 'Git Push Dreams',
      artist: 'CliPlay',
      cover: '/media-16.jpg',
      duration: '3:58',
      visibility: 'private'
    },
    {
      id: 17,
      type: 'video',
      title: 'Criando APIs REST',
      group: 'DevCast',
      cover: '/media-17.jpg',
      duration: '9:09',
      visibility: 'public'
    },
    {
      id: 18,
      type: 'music',
      title: 'Echo do Terminal',
      artist: 'Shell Vibes',
      cover: '/media-18.jpg',
      duration: '2:59',
      visibility: 'private'
    },
    {
      id: 19,
      type: 'video',
      title: 'Microservices Basics',
      group: 'Dev Talks',
      cover: '/media-19.jpg',
      duration: '11:00',
      visibility: 'public'
    },
    {
      id: 20,
      type: 'music',
      title: 'Reflexões de um Loop',
      artist: 'Infinite Band',
      cover: '/media-20.jpg',
      duration: '4:10',
      visibility: 'public'
    }
  ]
};
const mediaFilters = [
  { value: 'all', label: 'Todos', icon: null },
  { value: 'music', label: 'Músicas', icon: <Music size={16} /> },
  { value: 'video', label: 'Vídeos', icon: <Video size={16} /> },
  { value: 'album', label: 'Álbuns', icon: <Album size={16} /> }
]

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false)
  const [isContentModalOpen, setContentModalOpen] = useState(false)

  return (
    <MainLayout>
      <main className="max-w-6xl mx-auto px-4 py-20 space-y-12">

        {/* Destaques */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Em destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockData.featured.slice(0, 4).map(item => (
              <Card key={item.id} className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-[4/3] bg-gray-100 relative rounded-t-lg">
                  <img src={item.cover} alt={item.title} className="object-cover w-full h-full" />
                  <button className="absolute inset-0 m-auto w-12 h-12 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-purple-700" fill="currentColor" size={24} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.artist || item.group}
                  </p>
                  {item.duration && (
                    <span className="text-xs text-gray-400 mt-2 block">{item.duration}</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Grupos */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Seus grupos</h2>
          <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
            {mockData.groups.map(group => (
              <div key={group.id} className="flex flex-col items-center min-w-[120px]">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center relative">
                  <Users className="text-purple-600" size={24} />
                  {group.isOwner && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      ★
                    </span>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className="font-medium text-sm text-gray-800 truncate max-w-[100px]">{group.name}</p>
                  <span className="text-xs text-gray-500">{group.members} membros</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Playlists com Modal */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Suas playlists</h2>
            <Dialog.Root open={isPlaylistModalOpen} onOpenChange={setPlaylistModalOpen}>
              <Dialog.Trigger asChild>
                <button className="text-sm text-purple-600 hover:underline">Ver todas</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
                <Dialog.Content className="fixed inset-0 md:inset-20 bg-white p-6 rounded-md shadow-lg overflow-y-auto z-50">
                  <h2 className="text-xl font-bold mb-4">Todas as playlists</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mockData.playlists.map(pl => (
                      <Card key={pl.id} className="p-4 space-y-2">
                        <h3 className="font-medium">{pl.name}</h3>
                        <p className="text-sm text-gray-500">{pl.items} itens</p>
                      </Card>
                    ))}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockData.playlists.slice(0, 8).map(playlist => (
              <Card key={playlist.id} className="aspect-square relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                  <ListMusic className="text-purple-300" size={32} />
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Play className="text-white" size={32} />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Conteúdos com Modal */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Seus conteúdos</h2>
            <Dialog.Root open={isContentModalOpen} onOpenChange={setContentModalOpen}>
              <Dialog.Trigger asChild>
                <button className="text-sm text-purple-600 hover:underline">Ver todos</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
                <Dialog.Content className="fixed inset-0 md:inset-20 bg-white p-6 rounded-md shadow-lg overflow-y-auto z-50">
                  <h2 className="text-xl font-bold mb-4">Todos os conteúdos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockData.recentMedia.map(media => (
                      <Card key={media.id} className="p-4 space-y-1">
                        <h3 className="font-medium">{media.title}</h3>
                        <p className="text-sm text-gray-500">{media.artist || media.group}</p>
                      </Card>
                    ))}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div className="flex gap-2">
            {mediaFilters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={clsx(
                  'px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-colors',
                  activeFilter === filter.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockData.recentMedia
              .filter(item => activeFilter === 'all' || item.type === activeFilter)
              .slice(0, 8)
              .map(media => (
                <Card key={media.id} className="p-3 space-y-1">
                  <h3 className="font-medium">{media.title}</h3>
                  <p className="text-sm text-gray-500">{media.artist || media.group}</p>
                </Card>
              ))}
          </div>
        </section>
      </main>
    </MainLayout>
  )
}
