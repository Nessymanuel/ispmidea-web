import { useState } from 'react';
import { useRouter } from 'next/router';
import { Content, Comment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';

export default function ContentDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // This would be replaced with actual data fetching
  const [content, setContent] = useState<Content | null>(null);
  const [newComment, setNewComment] = useState({
    content: '',
    rating: 5
  });

  if (!content) {
    return <div>Carregando...</div>;
  }

  const handleAddComment = () => {
    // This would be replaced with actual API call
    const comment: Comment = {
      id: Math.random().toString(),
      userId: 'user123', // This would come from auth
      userName: 'Usuário', // This would come from auth
      content: newComment.content,
      rating: newComment.rating,
      createdAt: new Date()
    };

    setContent({
      ...content,
      comments: [...content.comments, comment],
      averageRating: (content.averageRating * content.comments.length + newComment.rating) / (content.comments.length + 1)
    });

    setNewComment({ content: '', rating: 5 });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-6">
                <img
                  src={content.thumbnailUrl}
                  alt={content.title}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              
              <div className="prose max-w-none">
                <p>{content.description}</p>
              </div>

              {content.type === 'album' && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Faixas</h3>
                  <div className="space-y-2">
                    {content.tracks.map((track) => (
                      <div key={track.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>{track.title}</span>
                        <span>{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Tipo</h4>
                  <p className="text-muted-foreground">
                    {content.type === 'album' ? 'Álbum' : content.type === 'music' ? 'Música' : 'Vídeo'}
                  </p>
                </div>

                {content.type === 'album' && (
                  <div>
                    <h4 className="font-medium">Artista</h4>
                    <p className="text-muted-foreground">{content.artist}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium">Data de Criação</h4>
                  <p className="text-muted-foreground">
                    {new Date(content.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Avaliação Média</h4>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-2">{content.averageRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Comentários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{comment.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm">{comment.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Adicionar Comentário</h4>
                  <Textarea
                    placeholder="Escreva seu comentário..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    className="mb-4"
                  />
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm">Avaliação:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setNewComment({ ...newComment, rating })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              rating <= newComment.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleAddComment}>Enviar Comentário</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 