'use client'
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function LivePage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video && Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource('http://localhost:5000/stream/live/stream.m3u8')
      hls.attachMedia(video)
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'http://localhost:5000/stream/live/stream.m3u8'
    }
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📡 Transmissão ao Vivo</h2>
      <video ref={videoRef} controls autoPlay className="w-full rounded-lg shadow-lg" />
    </div>
  )
}
