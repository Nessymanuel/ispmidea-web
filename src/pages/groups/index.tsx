import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Users, 
  UserPlus,
  Share2,
  MoreVertical,
  MessageSquare
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Modal } from '@/components/ui/modal';
import { CreateGroupForm } from '@/components/forms/CreateGroupForm';

interface Group {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  isAdmin: boolean;
}

interface PendingInvite {
  id: number;
  groupName: string;
  invitedBy: string;
}

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Amigos do Rock',
      description: 'Grupo para compartilhar músicas de rock',
      memberCount: 12,
      isAdmin: true
    },
    {
      id: 2,
      name: 'Músicos Locais',
      description: 'Compartilhando músicas da cena local',
      memberCount: 8,
      isAdmin: false
    },
    {
      id: 3,
      name: 'Fãs de Jazz',
      description: 'Tudo sobre jazz e blues',
      memberCount: 15,
      isAdmin: false
    }
  ]);

  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([
    {
      id: 1,
      groupName: 'Produtores Musicais',
      invitedBy: 'João Silva'
    },
    {
      id: 2,
      groupName: 'Compositores',
      invitedBy: 'Maria Santos'
    }
  ]);

  const handleCreateGroup = (data: { name: string; description: string }) => {
    const newGroup: Group = {
      id: groups.length + 1,
      name: data.name,
      description: data.description,
      memberCount: 1,
      isAdmin: true
    };

    setGroups([...groups, newGroup]);
    setIsCreateModalOpen(false);
  };

  return (
    <MainLayout>
      <Navbar/>
      <div className="space-y-6 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Grupos</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Novo Grupo
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar grupos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Pending Invites */}
        {pendingInvites.length > 0 && (
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Convites Pendentes</h2>
            <div className="space-y-4">
              {pendingInvites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{invite.groupName}</p>
                    <p className="text-sm text-gray-500">Convidado por {invite.invitedBy}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Recusar</Button>
                    <Button size="sm">Aceitar</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {group.memberCount} membros
                  </div>
                  {group.isAdmin && (
                    <span className="text-blue-500">Admin</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Criar Novo Grupo"
      >
        <CreateGroupForm
          onSubmit={handleCreateGroup}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </MainLayout>
  );
} 