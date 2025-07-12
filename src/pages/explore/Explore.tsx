'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, Music, Video, Album, Radio, Play } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import MainLayout from '@/components/layout/MainLayout'
import { Modal } from '@/components/ui/modal'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Musica {
  id: number;
  tituloMusica: string;
  nomeArtista: string | null;
  nomeUtilizador: string;
  ficheiroMusical: string;
  capaMusica: string;
  visibilidade: string;
  utilizadorId: number;
}

export default function Explore() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [selectedMusica, setSelectedMusica] = useState<Musica | null>(null);

  useEffect(() => {
    const fetchMusicas = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;

      const currentUser = JSON.parse(storedUser);
      const userId = currentUser.id;

      try {
        const response = await fetch(`${BASE_URL}/api/Musica`);
        const allMusicas: Musica[] = await response.json();

        const filtered = allMusicas.filter(m =>
          m.visibilidade?.toLowerCase().includes('public') ||
          m.utilizadorId === userId
        );

        setMusicas(filtered.slice(0, 6));
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      }
    };

    fetchMusicas();
  }, []);

  const categories = [
    { id: 1, name: 'Músicas', icon: <Music size={18} />, count: 245 },
    { id: 2, name: 'Vídeos', icon: <Video size={18} />, count: 189 },
    { id: 3, name: 'Álbuns', icon: <Album size={18} />, count: 76 },
    { id: 4, name: 'Rádios', icon: <Radio size={18} />, count: 32 }
  ];

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
            {musicas.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedMusica(item)}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="aspect-square relative">
                    <img
                      src={`${BASE_URL}${item.capaMusica}`}
                      alt={item.tituloMusica}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Play className="text-white" size={32} />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium truncate">{item.tituloMusica}</h3>
                    <p className="text-sm text-gray-500 truncate">{item.nomeArtista || item.nomeUtilizador}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal para reprodução da música */}
      <Modal
        isOpen={!!selectedMusica}
        onClose={() => setSelectedMusica(null)}
        title={selectedMusica?.tituloMusica || "Música"}
      >
        {selectedMusica && (
          <div className="flex flex-col items-center gap-4 p-4">
            <img
              src={`${BASE_URL}${selectedMusica.capaMusica}`}
              alt="Capa"
              className="w-48 h-48 object-cover rounded-md shadow"
            />
            <h3 className="text-lg font-semibold">{selectedMusica.tituloMusica}</h3>
            <p className="text-sm text-gray-500">
              {selectedMusica.nomeArtista || selectedMusica.nomeUtilizador}
            </p>
            <audio controls className="w-full mt-2">
              <source src={`${BASE_URL}${selectedMusica.ficheiroMusical}`} type="audio/mpeg" />
              Seu navegador não suporta áudio.
            </audio>
          </div>
        )}
      </Modal>
    </MainLayout>
  );
}
