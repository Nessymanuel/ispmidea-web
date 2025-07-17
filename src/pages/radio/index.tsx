'use client';

import { useEffect, useRef, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Navbar } from '@/components/layout/navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';

type Station = {
  name: string;
  country: string;
  tags: string;
  url_resolved: string;
  favicon: string;
};

export default function RadioPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const [current, setCurrent] = useState<Station | null>(null);
  const [country, setCountry] = useState<string>('');
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchStations = async (countryFilter?: string) => {
    const url = countryFilter
      ? `https://de1.api.radio-browser.info/json/stations/bycountry/${encodeURIComponent(
          countryFilter.trim()
        )}?limit=100`
      : `https://de1.api.radio-browser.info/json/stations/topclick/100`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setStations(data);
      setCurrent(data[0] || null);
    } catch (error) {
      console.error('Erro ao buscar estações:', error);
    }
  };

  useEffect(() => {
    fetchStations(country);
  }, []);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  const togglePlay = (station: Station) => {
    if (!audioRef.current) return;

    if (current?.url_resolved === station.url_resolved && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current.src !== station.url_resolved) {
        audioRef.current.src = station.url_resolved;
      }
      audioRef.current
        .play()
        .then(() => {
          setCurrent(station);
          setIsPlaying(true);
        })
        .catch((err) => console.error('Erro ao reproduzir:', err));
    }
  };

  const handleSearch = () => {
    if (!country.trim()) return;
    fetchStations(country);
  };

  return (
    <MainLayout>
      <Navbar />
      <div className="pt-20 px-4 space-y-6">
        <h1 className="text-3xl font-bold">Rádio Global</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por país (ex: Angola, Brazil)"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Buscar</Button>

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

        {current && isPlaying && (
          <Card className="p-4 mt-4 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={current.favicon || '/cover-radios/radionacional.png'}
                alt="Logo"
                className="w-16 h-16 rounded"
              />
              <div>
                <h3 className="font-semibold">{current.name}</h3>
                <p className="text-sm text-gray-500">
                  Tocando agora • {current.country}
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
          {stations.map((station, index) => (
            <Card
              key={index}
              className={`p-4 flex flex-col items-center text-center ${
                current?.url_resolved === station.url_resolved
                  ? 'border-2 border-orange-500'
                  : ''
              }`}
            >
              <img
                src={station.favicon || '/cover-radios/radionacional.png'}
                alt={station.name}
                className="w-20 h-20 rounded mb-2"
              />
              <h3 className="font-semibold">{station.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{station.tags}</p>
              <Button variant="ghost" size="sm" onClick={() => togglePlay(station)}>
                {isPlaying && current?.url_resolved === station.url_resolved ? (
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