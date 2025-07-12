'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface CreatePlaylistFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export function CreatePlaylistForm({ onSubmit, onCancel }: CreatePlaylistFormProps) {
  const [nomePlaylist, setNomePlaylist] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user = localStorage.getItem('user');
    if (!user) return;
    const { id } = JSON.parse(user);

    const formData = new FormData();
    formData.append('NomePlaylist', nomePlaylist);
    formData.append('TipoPlaylist', isPublic ? 'publica' : 'privada');
    formData.append('UtilizadorId', id);
    if (foto) formData.append('foto', foto);

    const response = await fetch(`${BASE_URL}/api/Playlist`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      onSubmit();
    } else {
      console.error('Erro ao criar playlist');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome da playlist */}
      <div className="space-y-2">
        <Label>Nome da Playlist</Label>
        <Input
          type="text"
          value={nomePlaylist}
          onChange={(e) => setNomePlaylist(e.target.value)}
          required
        />
      </div>

      {/* Switch de tipo */}
      <div className="space-y-2">
        <Label className="flex items-center justify-between">
          <span>Tipo da Playlist</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {isPublic ? 'Pública' : 'Privada'}
            </span>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
        </Label>
      </div>

      {/* Upload da imagem */}
      <div className="space-y-2">
        <Label>Imagem da Capa</Label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md bg-gray-100">
            <Upload className="w-4 h-4" />
            <span>Escolher imagem</span>
            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
          </label>
          {foto && (
            <button
              type="button"
              onClick={() => {
                setFoto(null);
                setPreview(null);
              }}
              className="text-red-500"
              title="Remover imagem"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {preview && (
          <img src={preview} alt="Preview" className="mt-2 h-32 rounded-md object-cover" />
        )}
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Criar</Button>
      </div>
    </form>
  );
}
