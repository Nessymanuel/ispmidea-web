import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Critica {
  id: number;
  pontuacao: number;
  comentario: string;
  dataDeRegisto: string;
  nomeUtilizador: string;
}

export function DetalhesMusica({ musicaId }: { musicaId: number }) {
  const [likes, setLikes] = useState(0);
  const [comentarios, setComentarios] = useState<Critica[]>([]);

  useEffect(() => {
    if (!musicaId) return;

    // Buscar likes
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Like/musica/${musicaId}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.totalLikes || 0));

    // Buscar críticas
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Critica/musica/${musicaId}`)
      .then((res) => res.json())
      .then((data) => setComentarios(data));
  }, [musicaId]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Detalhes da Música</h2>

      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-red-500" />
        <span className="text-lg">{likes} curtidas</span>
      </div>

      <div>
        <h3 className="font-medium mb-2">Comentários:</h3>
        {comentarios.length === 0 ? (
          <p className="text-gray-500">Nenhum comentário ainda.</p>
        ) : (
          <ul className="space-y-2">
            {comentarios.map((c) => (
              <li key={c.id} className="bg-gray-100 p-3 rounded">
                <div className="text-sm text-gray-700">
                  <strong>{c.nomeUtilizador}</strong> avaliou com <strong>{c.pontuacao}/10</strong>
                </div>
                <p className="text-sm">{c.comentario}</p>
                <p className="text-xs text-gray-500">{new Date(c.dataDeRegisto).toLocaleString('pt-AO')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
