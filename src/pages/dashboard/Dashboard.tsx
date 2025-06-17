import { Card } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { 
  TrendingUp,
  Music, 
  Video, 
  Users, 
  Star 
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Dashboard() {
  return (
    <MainLayout>
      <Navbar />
      <div className="space-y-6 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Trending</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <Music className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Músicas</p>
                <p className="text-2xl font-semibold">1,234</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <Video className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Vídeos</p>
                <p className="text-2xl font-semibold">567</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Usuários</p>
                <p className="text-2xl font-semibold">890</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Últimas Mídias</h2>
            <div className="space-y-4">
              {/* Sample media items */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">Título da Mídia {item}</p>
                    <p className="text-sm text-gray-500">Artista • Álbum</p>
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 ml-auto" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Playlists Populares</h2>
            <div className="space-y-4">
              {/* Sample playlists */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">Playlist {item}</p>
                    <p className="text-sm text-gray-500">15 músicas • Por Usuário</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 