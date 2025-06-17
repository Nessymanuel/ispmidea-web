import { useState } from 'react';
import { useRouter } from 'next/router';
import { ContentType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

export default function NewContentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [contentType, setContentType] = useState<ContentType>('album');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailFile: null as File | null,
    artist: '',
    releaseDate: '',
    duration: '',
    mediaFile: null as File | null,
    category: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'media') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'thumbnail') {
        setFormData({ ...formData, thumbnailFile: file });
      } else {
        setFormData({ ...formData, mediaFile: file });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Você precisa estar logado para criar conteúdo');
      return;
    }

    // Here you would typically upload the files to your storage service
    // and then create the content with the file URLs
    console.log('Submitting form:', { type: contentType, ...formData });
    
    // For now, we'll just redirect back to the content list
    router.push('/content');
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Novo Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Tipo de Conteúdo</Label>
                <Select
                  value={contentType}
                  onValueChange={(value: ContentType) => setContentType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="album">Álbum</SelectItem>
                    <SelectItem value="music">Música</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="thumbnail">Imagem de Capa</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnail')}
                  required
                />
              </div>

              {(contentType === 'album' || contentType === 'music') && (
                <div>
                  <Label htmlFor="artist">Artista</Label>
                  <Input
                    id="artist"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    required
                  />
                </div>
              )}

              {contentType === 'album' && (
                <div>
                  <Label htmlFor="releaseDate">Data de Lançamento</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    required
                  />
                </div>
              )}

              {(contentType === 'music' || contentType === 'video') && (
                <div>
                  <Label htmlFor="duration">Duração (em segundos)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              )}

              {contentType === 'music' && (
                <div>
                  <Label htmlFor="audio">Arquivo de Áudio</Label>
                  <Input
                    id="audio"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e, 'media')}
                    required
                  />
                </div>
              )}

              {contentType === 'video' && (
                <>
                  <div>
                    <Label htmlFor="video">Arquivo de Vídeo</Label>
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'media')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 