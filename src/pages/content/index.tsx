import { useState, useEffect } from 'react';
import { Content, ContentFilters, ContentType } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

// Mock data for demonstration
const mockContents: Content[] = [
  {
    id: '1',
    title: 'Álbum de Exemplo',
    description: 'Um álbum incrível com várias músicas',
    type: 'album',
    thumbnailUrl: 'https://via.placeholder.com/300',
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.5,
    comments: [],
    artist: 'Artista Exemplo',
    releaseDate: new Date(),
    tracks: []
  },
  {
    id: '2',
    title: 'Música Legal',
    description: 'Uma música muito boa',
    type: 'music',
    thumbnailUrl: 'https://via.placeholder.com/300',
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.0,
    comments: [],
    artist: 'Artista Exemplo',
    duration: 180,
    audioUrl: 'https://example.com/audio.mp3'
  },
  {
    id: '3',
    title: 'Vídeo Incrível',
    description: 'Um vídeo muito interessante',
    type: 'video',
    thumbnailUrl: 'https://via.placeholder.com/300',
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.8,
    comments: [],
    duration: 300,
    videoUrl: 'https://example.com/video.mp4',
    category: 'Entretenimento'
  }
];

export default function ContentListPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [filters, setFilters] = useState<ContentFilters>({
    type: undefined,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Filter and sort contents
    let filteredContents = [...mockContents];

    if (filters.type) {
      filteredContents = filteredContents.filter(content => content.type === filters.type);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredContents = filteredContents.filter(
        content => 
          content.title.toLowerCase().includes(searchLower) ||
          content.description.toLowerCase().includes(searchLower)
      );
    }

    filteredContents.sort((a, b) => {
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'title') {
        return order * a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'rating') {
        return order * (a.averageRating - b.averageRating);
      }
      return order * (a.createdAt.getTime() - b.createdAt.getTime());
    });

    setContents(filteredContents);
  }, [filters, user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestão de Conteúdos Multimídia</h1>
        {user.role === 'editor' && (
          <Button asChild>
            <Link href="/content/new">Novo Conteúdo</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conteúdo..."
            className="pl-9"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <Select
          value={filters.type}
          onValueChange={(value: ContentType) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Conteúdo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="album">Álbuns</SelectItem>
            <SelectItem value="music">Músicas</SelectItem>
            <SelectItem value="video">Vídeos</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy}
          onValueChange={(value: 'title' | 'createdAt' | 'rating') => 
            setFilters({ ...filters, sortBy: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Título</SelectItem>
            <SelectItem value="createdAt">Data de Criação</SelectItem>
            <SelectItem value="rating">Avaliação</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setFilters({ ...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
        >
          {filters.sortOrder === 'asc' ? '↑' : '↓'} Ordem
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content) => (
          <Link href={`/content/${content.id}`} key={content.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative mb-4">
                  <img
                    src={content.thumbnailUrl}
                    alt={content.title}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {content.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {content.type === 'album' ? 'Álbum' : content.type === 'music' ? 'Música' : 'Vídeo'}
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">★</span>
                    <span className="text-sm">{content.averageRating.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 