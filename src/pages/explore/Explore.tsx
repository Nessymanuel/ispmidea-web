import { motion } from 'framer-motion'
import { Filter, Search, Music, Video, Album, Radio, Play } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import MainLayout from '@/components/layout/MainLayout'

const categories = [
  { id: 1, name: 'Músicas', icon: <Music size={18} />, count: 245 },
  { id: 2, name: 'Vídeos', icon: <Video size={18} />, count: 189 },
  { id: 3, name: 'Álbuns', icon: <Album size={18} />, count: 76 },
  { id: 4, name: 'Rádios', icon: <Radio size={18} />, count: 32 }
]

const trendingContent = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Conteúdo em Alta ${i + 1}`,
  type: ['music', 'video', 'album'][i % 3],
  author: `Artista ${String.fromCharCode(65 + (i % 10))}`,
  plays: Math.floor(Math.random() * 10000),
  cover: "./profileimg.jpg"
}))

export default function Explore() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-8">
        {/* Cabeçalho e Busca */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">Explorar Conteúdo</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Busque por músicas, artistas, álbuns..."
                className="pl-10 w-full"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Filter size={16} />
              Filtros
            </Button>
          </div>
        </motion.div>

        {/* Categorias */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {categories.map(category => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-4 hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} itens</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Conteúdo em Alta */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Em Alta Agora</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingContent.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden group">
                  <div className="aspect-square relative">
                    <img 
                      src={item.cover} 
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Play className="text-white" size={32} />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{item.author}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Play size={12} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}