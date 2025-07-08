'use client';

import { useEffect, useRef, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import radionacional from "../../../public/cover-radios/radionacional.png"
import { Input } from '@/components/ui/input';
import {
  Search,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

type Station = {
  id: number;
  name: string;
  country: string;
  genre: string;
  streamUrl: string;
  logo: string;
};

export default function RadioPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStationId, setCurrentStationId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('ao');

  const stations: Station[] = [
    {
      id: 1,
      name: 'Rádio Nacional',
      country: 'ao',
      genre: 'Geral',
      streamUrl: 'http://paineldj5.com.br:8076/stream',
      logo: '/cover-radios/radionacional.png',
    },
    {
      id: 2,
      name: 'Rádio Mais',
      country: 'ao',
      genre: 'Popular',
      streamUrl: 'http://209.133.216.3:7018/stream',
      logo: '/cover-radios/radionacional.png',
    },
    {
      id: 3,
      name: 'Rádio Luanda',
      country: 'ao',
      genre: 'Notícias',
      streamUrl: 'http://162.210.196.142:33130/stream',
      logo: '/cover-radios/radionacional.png',
    },
    {
      id: 4,
      name: 'Rádio Mais',
      country: 'ao',
      genre: 'Pop / Urbano',
      streamUrl: 'http://209.133.216.3:7018/stream',
      logo: '/cover-radios/radionacional.png',
    },
    {
      id: 5,
      name: 'Rádio Ecclesia',
      country: 'ao',
      genre: 'Religiosa',
      streamUrl: 'http://stream.example.com/ecclesia',
      logo: '/cover-radios/radionacional.png',
    },
  ];

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  const togglePlay = (station: Station) => {
    if (!audioRef.current) return;

    if (currentStationId === station.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.src !== station.streamUrl) {
        audioRef.current.src = station.streamUrl;
      }
      audioRef.current
        .play()
        .then(() => {
          setCurrentStationId(station.id);
          setIsPlaying(true);
        })
        .catch((err) => console.error('Erro ao reproduzir:', err));
    }
  };

  const filtered = stations.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCountry === 'all' || s.country === selectedCountry)
  );

  return (
    <MainLayout>
      <Navbar />
      <div className="space-y-6 pt-20 px-4">
        <h1 className="text-3xl font-bold">Rádios de Angola</h1>

        <div className="flex gap-4 flex-wrap">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar estações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="ao">Angola</option>
            <option value="all">Todos os Países</option>
          </select>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24"
            />
          </div>


        </div>
        {(isPlaying && currentStationId) && (
          <Card className="p-4 mt-4 flex items-start  justify-between">
            <div className="flex items-center gap-4">
              <img src={
                stations.find(s => s.id === currentStationId)?.logo
              } alt="Tocando" className="w-16 h-16 rounded" />
              <div>
                <h3 className="font-semibold">
                  {stations.find(s => s.id === currentStationId)?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Tocando agora
                </p>
              </div>
            </div>

          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((station) => (
            <Card key={station.id} className="p-4 flex flex-col items-center text-center">
              <img src={station.logo} alt={station.name} className="w-20 h-20 rounded mb-2" />
              <h3 className="font-semibold">{station.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{station.genre}</p>
              <Button variant="ghost" size="sm" onClick={() => togglePlay(station)}>
                {isPlaying && currentStationId === station.id ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>
            </Card>
          ))}
        </div>



      </div>
    </MainLayout>
  );
}
