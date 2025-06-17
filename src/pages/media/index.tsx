import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Play,
  MoreVertical,
  Image as ImageIcon,
  Video,
  Music
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Modal } from '@/components/ui/modal';
import { CreateMediaForm } from '@/components/forms/CreateMediaForm';

interface Media {
  id: number;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'image';
  file: File;
  previewUrl: string;
}

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [media, setMedia] = useState<Media[]>([]);

  const handleCreateMedia = (data: { title: string; description: string; type: string; file: File }) => {
    const previewUrl = URL.createObjectURL(data.file);
    
    const newMedia: Media = {
      id: media.length + 1,
      title: data.title,
      description: data.description,
      type: data.type as 'video' | 'audio' | 'image',
      file: data.file,
      previewUrl
    };

    setMedia([...media, newMedia]);
    setIsCreateModalOpen(false);
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'audio':
        return <Music className="w-6 h-6" />;
      case 'image':
        return <ImageIcon className="w-6 h-6" />;
      default:
        return <Play className="w-6 h-6" />;
    }
  };

  const renderMediaPreview = (item: Media) => {
    if (item.type === 'image') {
      return (
        <img 
          src={item.previewUrl} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
      );
    } else if (item.type === 'video') {
      return (
        <video 
          src={item.previewUrl}
          className="w-full h-full object-cover"
          controls
        />
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-2">
            {getMediaIcon(item.type)}
            <span className="text-sm text-gray-500">{item.file.name}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <MainLayout>
      <Navbar/>
      <div className="space-y-6 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mídias</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Nova Mídia
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar mídias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                {renderMediaPreview(item)}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </Button>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  {getMediaIcon(item.type)}
                  <span className="capitalize">{item.type}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Nova Mídia"
      >
        <CreateMediaForm
          onSubmit={handleCreateMedia}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </MainLayout>
  );
} 