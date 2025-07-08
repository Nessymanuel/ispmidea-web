'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export type VideoForm = {
  TituloVideo: string;
  FicheiroDoVideo: FileList;
  Legenda: string;
  Produtor: string;
  GeneroDoVideo: string;
  Visibilidade: string;
  DataLancamento: string;
  UtilizadorId: number;
  ArtistaId: number;
  GrupoMusicalId: number;
  capa: FileList;
};

export default function CriarVideoPage() {
  const { register, handleSubmit, reset } = useForm<VideoForm>();

  const onSubmit = (data: VideoForm) => {
    const formData = new FormData();
    formData.append('TituloVideo', data.TituloVideo);
    formData.append('Legenda', data.Legenda);
    formData.append('Produtor', data.Produtor);
    formData.append('GeneroDoVideo', data.GeneroDoVideo);
    formData.append('Visibilidade', data.Visibilidade);
    formData.append('DataLancamento', data.DataLancamento);
    formData.append('UtilizadorId', String(data.UtilizadorId));
    formData.append('ArtistaId', String(data.ArtistaId));
    formData.append('GrupoMusicalId', String(data.GrupoMusicalId));
    formData.append('FicheiroDoVideo', data.FicheiroDoVideo[0]);
    formData.append('capa', data.capa[0]);

    console.log('Enviando dados para a API...', formData);
    reset();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-purple-700">Cadastro de Vídeo</h2>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
          </Link>
        </div>

        <Card className="p-10 shadow-xl border border-purple-200 rounded-2xl bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="TituloVideo">Título do Vídeo</Label>
                <Input id="TituloVideo" {...register('TituloVideo')} placeholder="Insira o título" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Legenda">Legenda</Label>
                <Input id="Legenda" {...register('Legenda')} placeholder="Ex: Entrevista exclusiva..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Produtor">Produtor</Label>
                <Input id="Produtor" {...register('Produtor')} placeholder="Nome do produtor" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="GeneroDoVideo">Gênero</Label>
                <Input id="GeneroDoVideo" {...register('GeneroDoVideo')} placeholder="Ex: Documentário" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Visibilidade">Visibilidade</Label>
                <Input id="Visibilidade" {...register('Visibilidade')} placeholder="Público ou Privado" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="DataLancamento">Data de Lançamento</Label>
                <Input id="DataLancamento" type="datetime-local" {...register('DataLancamento')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="UtilizadorId">ID do Utilizador</Label>
                <Input id="UtilizadorId" type="number" {...register('UtilizadorId')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ArtistaId">ID do Artista</Label>
                <Input id="ArtistaId" type="number" {...register('ArtistaId')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="GrupoMusicalId">ID do Grupo Musical</Label>
                <Input id="GrupoMusicalId" type="number" {...register('GrupoMusicalId')} />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="FicheiroDoVideo">Vídeo</Label>
                <Input
                  id="FicheiroDoVideo"
                  type="file"
                  {...register('FicheiroDoVideo')}
                  className="cursor-pointer file:bg-purple-600 file:text-white file:rounded-md px-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capa">Capa do Vídeo</Label>
                <Input
                  id="capa"
                  type="file"
                  {...register('capa')}
                  className="cursor-pointer file:bg-purple-600 file:text-white file:rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-xl">
                <FileUp className="w-4 h-4 mr-2" /> Enviar Vídeo
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}

