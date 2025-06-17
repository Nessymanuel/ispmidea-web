import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Music,
  Video,
  Users,
  Radio,
  Star,
  Upload,
  Download,
  Settings,
  ArrowRight,
  Play,
  Headphones,
  Film,
  Share2,
  Heart,
  Sparkles,
  Pause
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/logoupdate.png"
import { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<{
    name: string;
    country: string;
    streamUrl: string;
  } | null>(null);

  const stations = [
    {
      name: 'Rádio Nacional',
      country: 'Angola',
      streamUrl: 'http://paineldj5.com.br:8076/stream',
    },
    {
      name: 'Rádio Mais',
      country: 'Angola',
      streamUrl: 'http://209.133.216.3:7018/stream',
    },
    {
      name: 'Rádio Luanda',
      country: 'Angola',
      streamUrl: 'http://162.210.196.142:33130/stream',
    },
    {
      name: 'Rádio Ecclesia',
      country: 'Angola',
      streamUrl: 'http://stream.example.com/ecclesia',
    },
  ];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const togglePlay = (station: typeof stations[0]) => {
    if (!audioRef.current) return;

    if (currentStation?.name === station.name && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.src !== station.streamUrl) {
        audioRef.current.src = station.streamUrl;
      }
      audioRef.current.play()
        .then(() => {
          setCurrentStation(station);
          setIsPlaying(true);
        })
        .catch((err) => console.error('Erro ao reproduzir:', err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                  ✨ Nova Plataforma de Mídia
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Sua Plataforma Completa de Mídia
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Gerencie, compartilhe e descubra conteúdo multimídia em um só lugar.
                  Música, vídeos, rádio online e muito mais.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Começar Agora
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  <span>+10k Usuários</span>
                </div>
                <div className="flex items-center">
                  <Music className="h-5 w-5 mr-2 text-blue-500" />
                  <span>+50k Músicas</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>4.9/5 Avaliação</span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Play className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-white">
                <video src="/video.mp4" autoPlay muted loop />
                  <h3 className="text-xl font-semibold">Assista ao vídeo de apresentação</h3>
                  <p className="text-sm opacity-80">Conheça nossa plataforma em 2 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos que você vai amar
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para gerenciar e descobrir conteúdo multimídia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <Music className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Biblioteca de Música</h3>
              <p className="text-gray-600">
                Acesse milhares de músicas, crie playlists e descubra novos artistas.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <Film className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Conteúdo em Vídeo</h3>
              <p className="text-gray-600">
                Assista a vídeos, documentários e conteúdo exclusivo em alta qualidade.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-6">
                <Radio className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rádio Online</h3>
              <p className="text-gray-600">
                Sintonize em estações de rádio ao vivo de todo o mundo.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Grupos e Comunidades</h3>
              <p className="text-gray-600">
                Conecte-se com outros usuários e compartilhe conteúdo em grupos.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                <Share2 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Fácil</h3>
              <p className="text-gray-600">
                Compartilhe seu próprio conteúdo com uploads simples e rápidos.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Recomendações</h3>
              <p className="text-gray-600">
                Receba sugestões personalizadas baseadas no seu gosto.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div id="highlights" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Destaques da Semana
            </h2>
            <p className="text-xl text-gray-600">
              Descubra o que está em alta na plataforma
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Album Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music className="h-12 w-12 text-purple-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Álbum em Destaque</h3>
                <p className="text-gray-600 mb-4">Artista Principal</p>
                <Button variant="outline" className="w-full">Ver Detalhes</Button>
              </div>
            </Card>

            {/* Video Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Film className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Vídeo em Destaque</h3>
                <p className="text-gray-600 mb-4">Criador do Conteúdo</p>
                <Button variant="outline" className="w-full">Ver Detalhes</Button>
              </div>
            </Card>

            {/* Another Album Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-red-100 to-orange-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music className="h-12 w-12 text-red-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Novo Lançamento</h3>
                <p className="text-gray-600 mb-4">Artista Revelação</p>
                <Button variant="outline" className="w-full">Ver Detalhes</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Radio Section */}
      <div id="radio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rádio ao Vivo
            </h2>
            <p className="text-xl text-gray-600">
              Sintonize nas melhores estações de rádio
            </p>
          </div>
          
          {/* Radio Player */}
          <Card className="max-w-2xl mx-auto mb-12 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded bg-purple-100 flex items-center justify-center">
                  <Radio className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{currentStation?.name || 'Selecione uma rádio'}</h3>
                  <p className="text-sm text-gray-500">{currentStation?.country || 'Angola'}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => currentStation && togglePlay(currentStation)}
                disabled={!currentStation}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
            </div>
          </Card>

          {/* Radio Stations by Country */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Angola</h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {stations.map((station, i) => (
                  <Card 
                    key={i} 
                    className={`min-w-[200px] p-4 flex items-center gap-3 cursor-pointer hover:shadow-lg transition-all ${
                      currentStation?.name === station.name ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => togglePlay(station)}
                  >
                    <div className="w-12 h-12 rounded bg-purple-100 flex items-center justify-center">
                      <Radio className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{station.name}</h4>
                      <p className="text-sm text-gray-500">{station.country}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Public Playlists Section */}
      <div id="playlists" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Playlists Públicas
            </h2>
            <p className="text-xl text-gray-600">
              Descubra playlists criadas pela comunidade
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Music className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Playlist {i}</h3>
                <p className="text-gray-600 mb-4">Criada por Usuário {i}</p>
                <Button variant="outline" className="w-full">Explorar</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Artists Section */}
      <div id="artists" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Artistas em Destaque
            </h2>
            <p className="text-xl text-gray-600">
              Conheça os artistas mais populares da plataforma
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Artista {i}</h3>
                <p className="text-gray-600">Gênero Musical</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-white">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-64 w-64 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-64 w-64 rounded-full bg-white/10"></div>
            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comece sua jornada hoje mesmo
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Junte-se a milhares de usuários e descubra um novo mundo de conteúdo.
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="group">
                  Criar Conta Grátis
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2"><Image src={logo} alt="logo" width={80} height={10} />
              </div>
              <p className="text-gray-400">
                Sua plataforma completa para gerenciamento e descoberta de conteúdo multimídia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recursos</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/music" className="hover:text-white transition-colors">Música</Link></li>
                <li><Link href="/videos" className="hover:text-white transition-colors">Vídeos</Link></li>
                <li><Link href="/radio" className="hover:text-white transition-colors">Rádio</Link></li>
                <li><Link href="/groups" className="hover:text-white transition-colors">Grupos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  contato@ispmedia.com
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  (+244) 935-555-500
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📍</span>
                  Luanda, Angola
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ISP Media. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 