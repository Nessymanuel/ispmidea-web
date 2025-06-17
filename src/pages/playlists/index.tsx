import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Lock, 
  Globe, 
  MoreVertical,
  Music,
  Clock
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Modal } from '@/components/ui/modal';
import { CreatePlaylistForm } from '@/components/forms/CreatePlaylistForm';

interface Playlist {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  trackCount: number;
  duration: string;
}

export default function PlaylistsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: 1,
      name: 'Minhas Favoritas',
      description: 'Músicas que mais gosto',
      isPublic: true,
      trackCount: 15,
      duration: '45:30'
    },
    {
      id: 2,
      name: 'Rock Clássico',
      description: 'Os melhores do rock',
      isPublic: false,
      trackCount: 20,
      duration: '1:15:45'
    },
    {
      id: 3,
      name: 'Para Trabalhar',
      description: 'Músicas para concentração',
      isPublic: true,
      trackCount: 12,
      duration: '38:20'
    }
  ]);

  const handleCreatePlaylist = (data: { name: string; description: string; isPublic: boolean }) => {
    const newPlaylist: Playlist = {
      id: playlists.length + 1,
      name: data.name,
      description: data.description,
      isPublic: data.isPublic,
      trackCount: 0,
      duration: '00:00'
    };

    setPlaylists([...playlists, newPlaylist]);
    setIsCreateModalOpen(false);
  };

  return (
    <MainLayout>
      <Navbar/>
      <div className="space-y-6 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Playlists</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Nova Playlist
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{playlist.name}</h3>
                    <p className="text-sm text-gray-500">{playlist.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Music className="w-4 h-4" />
                      {playlist.trackCount} músicas
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {playlist.duration}
                    </div>
                  </div>
                  {playlist.isPublic ? (
                    <Globe className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Nova Playlist"
      >
        <CreatePlaylistForm
          onSubmit={handleCreatePlaylist}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </MainLayout>
  );
} 