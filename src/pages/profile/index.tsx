import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User,
  Edit2,
  Music,
  Video,
  Users,
  Star,
  Clock,
  Settings
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import profileimage from "../../../public/profileimg.jpg"
import Image from 'next/image';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Gracieth Manuel',
    email: 'graciethmanuel13@gmail.com',
    bio: 'Apaixonada por música e tecnologia',
    location: 'Luanda, Angola',
    joinDate: 'Março 2025'
  });

  const stats = [
    { label: 'Músicas', value: '156', icon: Music },
    { label: 'Vídeos', value: '45', icon: Video },
    { label: 'Grupos', value: '8', icon: Users },
    { label: 'Avaliações', value: '234', icon: Star }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'upload',
      title: 'Nova Música',
      description: 'Você fez upload de "Nome da Música"',
      timestamp: '2 horas atrás'
    },
    {
      id: 2,
      type: 'rating',
      title: 'Nova Avaliação',
      description: 'Você avaliou o álbum "Nome do Álbum"',
      timestamp: '1 dia atrás'
    },
    {
      id: 3,
      type: 'group',
      title: 'Novo Grupo',
      description: 'Você criou o grupo "Amigos da Música"',
      timestamp: '2 dias atrás'
    }
  ];

  return (
    <MainLayout>
      <Navbar/>
      <div className="max-w-6xl mx-auto space-y-6 pt-20">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div >
               <Image className="rounded-full" src={profileimage} alt="Profile" width={128} height={128}/>
               </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Nome"
                  />
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="Email"
                  />
                  <Input
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Biografia"
                  />
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="Localização"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(false)}>Salvar</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{profile.name}</h1>
                      <p className="text-gray-600">{profile.email}</p>
                      <p className="mt-2">{profile.bio}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {profile.location} • Membro desde {profile.joinDate}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar Perfil
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b last:border-0"
              >
                <div className="mt-1">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
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
  );
} 