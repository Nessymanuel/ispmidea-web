'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import MainLayout from '@/components/layout/MainLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Edit2, Music, Video, Users, Star, Clock, Upload } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    joinDate: '',
    foto: '',
  })
  const [newPhoto, setNewPhoto] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserId(parsed.id)
      setProfile({
        name: parsed.username || '',
        email: parsed.email || '',
        bio: parsed.estado || '',
        location: parsed.telefone || '',
        joinDate: 'Março 2025', // ou use: new Date(parsed.dataDeCriacao).toLocaleDateString()
        foto: parsed.fotografia || '',
      })
    }
  }, [])

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewPhoto(e.target.files[0])
    }
  }

  const handleSave = async () => {
    if (!userId) return

    const formData = new FormData()
    formData.append("Username", profile.name)
    formData.append("Email", profile.email)
    formData.append("Telefone", profile.location)
    formData.append("Estado", profile.bio) // manter o mesmo estado anterior
    if (newPhoto) formData.append("foto", newPhoto)

    const res = await fetch(`${BASE_URL}/api/Utilizador/${userId}`, {
      method: "PUT",
      body: formData,
    })

    if (res.ok) {
      const updated = await res.json()
      setProfile({
        name: updated.username,
        email: updated.email,
        bio: updated.estado,
        location: updated.telefone,
        joinDate: 'Março 2025',
        foto: updated.fotografia,
      })
      localStorage.setItem("user", JSON.stringify(updated))
      setIsEditing(false)
    } else {
      alert("Erro ao salvar.")
    }
  }

  const stats = [
    { label: 'Músicas', value: '156', icon: Music },
    { label: 'Vídeos', value: '45', icon: Video },
    { label: 'Grupos', value: '8', icon: Users },
    { label: 'Avaliações', value: '234', icon: Star },
  ]

  const recentActivity = [
    { id: 1, title: 'Nova Música', description: 'Você fez upload de "Nome da Música"', timestamp: '2 horas atrás' },
    { id: 2, title: 'Nova Avaliação', description: 'Você avaliou o álbum "Nome do Álbum"', timestamp: '1 dia atrás' },
    { id: 3, title: 'Novo Grupo', description: 'Você criou o grupo "Amigos da Música"', timestamp: '2 dias atrás' },
  ]

  return (
    <MainLayout>
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-6 pt-20">
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative w-32 h-32">
              <Image
                src={newPhoto ? URL.createObjectURL(newPhoto) : `${BASE_URL}${profile.foto}`}
                alt="Foto de perfil"
                width={128}
                height={128}
                className="rounded-full object-cover w-32 h-32"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                  />
                  <button
                    onClick={handlePhotoClick}
                    className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow"
                  >
                    <Upload className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Nome" />
                  <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
                  <Input value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Biografia" />
                  <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} placeholder="Telefone" />
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Salvar</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-gray-600">{profile.email}</p>
                    <p className="mt-2">{profile.bio}</p>
                    <p className="text-sm text-gray-500 mt-1">{profile.location} • Membro desde {profile.joinDate}</p>
                  </div>
                  <Button variant="ghost" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                    <Edit2 className="w-4 h-4" /> Editar Perfil
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <Clock className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}
