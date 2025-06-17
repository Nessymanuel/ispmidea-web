'use client';

import { useState, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Music, Edit, Trash2, Upload } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import Image from 'next/image';

type Author = {
  id: number;
  name: string;
  description: string;
  genre: string;
  country: string;
  image: File | null;
  imagePreview: string;
};

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([
    {
      id: 1,
      name: 'Artista 1',
      description: 'Descrição do artista 1',
      genre: 'Pop',
      country: 'Angola',
      image: null,
      imagePreview: '/cover-radios/radionacional.png',
    },
    // Adicione mais autores de exemplo aqui
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState<Partial<Author>>({
    name: '',
    description: '',
    genre: '',
    country: '',
    image: null,
    imagePreview: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAuthor({
        ...newAuthor,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddAuthor = () => {
    if (newAuthor.name && newAuthor.description) {
      const author: Author = {
        id: authors.length + 1,
        name: newAuthor.name,
        description: newAuthor.description,
        genre: newAuthor.genre || 'Não especificado',
        country: newAuthor.country || 'Não especificado',
        image: newAuthor.image,
        imagePreview: newAuthor.imagePreview || '/cover-radios/radionacional.png',
      };
      setAuthors([...authors, author]);
      setNewAuthor({
        name: '',
        description: '',
        genre: '',
        country: '',
        image: null,
        imagePreview: '',
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <MainLayout>
      <Navbar />
      <div className="space-y-6 pt-16 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Autores</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Autor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Autor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome do Autor
                  </label>
                  <Input
                    id="name"
                    value={newAuthor.name}
                    onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                    placeholder="Digite o nome do autor"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Descrição
                  </label>
                  <Textarea
                    id="description"
                    value={newAuthor.description}
                    onChange={(e) => setNewAuthor({ ...newAuthor, description: e.target.value })}
                    placeholder="Digite uma descrição para o autor"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="genre" className="text-sm font-medium">
                    Gênero Musical
                  </label>
                  <Input
                    id="genre"
                    value={newAuthor.genre}
                    onChange={(e) => setNewAuthor({ ...newAuthor, genre: e.target.value })}
                    placeholder="Digite o gênero musical"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium">
                    País
                  </label>
                  <Input
                    id="country"
                    value={newAuthor.country}
                    onChange={(e) => setNewAuthor({ ...newAuthor, country: e.target.value })}
                    placeholder="Digite o país de origem"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Imagem do Autor
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                      {newAuthor.imagePreview ? (
                        <Image
                          src={newAuthor.imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Escolher Imagem
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <Button onClick={handleAddAuthor} className="w-full">
                  Adicionar Autor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Card key={author.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-purple-100">
                    <Image
                      src={author.imagePreview}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{author.name}</h3>
                    <p className="text-sm text-gray-500">{author.genre}</p>
                    <p className="text-sm text-gray-500">{author.country}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{author.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 