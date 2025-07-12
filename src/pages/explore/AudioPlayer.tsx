import React from 'react'

interface Props {
  musica: {
    tituloMusica: string
    nomeArtista?: string
    capaMusica?: string
    ficheiroPath: string
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function AudioPlayer({ musica }: Props) {
  return (
    <div className="space-y-4 text-center">
      {musica.capaMusica && (
        <img
          src={`${BASE_URL}${musica.capaMusica}`}
          alt="Capa da música"
          className="w-40 h-40 rounded mx-auto object-cover"
        />
      )}
      <div>
        <h3 className="text-lg font-bold">{musica.tituloMusica}</h3>
        <p className="text-sm text-gray-500">{musica.nomeArtista || 'Desconhecido'}</p>
      </div>
      <audio controls className="w-full mt-2">
        <source src={`${BASE_URL}${musica.ficheiroPath}`} type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>
    </div>
  )
}
