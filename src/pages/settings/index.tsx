import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Bell,
  Lock,
  Globe,
  Download,
  Moon,
  Shield,
  Trash2,
  Save
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      comments: true,
      mentions: true
    },
    privacy: {
      profileVisibility: 'public',
      showActivity: true,
      allowMessages: true
    },
    playback: {
      autoplay: true,
      highQuality: true,
      downloadQuality: 'high'
    },
    appearance: {
      darkMode: false,
      compactView: false
    }
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <MainLayout>
      <Navbar/>
      <div className="max-w-6xl mx-auto space-y-6 pt-16">
        <h1 className="text-3xl font-bold">Configurações</h1>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por Email</p>
                <p className="text-sm text-gray-500">
                  Receba atualizações importantes por email
                </p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) =>
                  updateSetting('notifications', 'email', checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações Push</p>
                <p className="text-sm text-gray-500">
                  Receba notificações em tempo real
                </p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) =>
                  updateSetting('notifications', 'push', checked)
                }
              />
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold">Privacidade</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Visibilidade do Perfil</p>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) =>
                  updateSetting('privacy', 'profileVisibility', e.target.value)
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="public">Público</option>
                <option value="friends">Apenas Amigos</option>
                <option value="private">Privado</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mostrar Atividade</p>
                <p className="text-sm text-gray-500">
                  Exibir suas atividades recentes no perfil
                </p>
              </div>
              <Switch
                checked={settings.privacy.showActivity}
                onCheckedChange={(checked) =>
                  updateSetting('privacy', 'showActivity', checked)
                }
              />
            </div>
          </div>
        </Card>

        {/* Playback */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold">Reprodução</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reprodução Automática</p>
                <p className="text-sm text-gray-500">
                  Reproduzir próxima mídia automaticamente
                </p>
              </div>
              <Switch
                checked={settings.playback.autoplay}
                onCheckedChange={(checked) =>
                  updateSetting('playback', 'autoplay', checked)
                }
              />
            </div>
            <div>
              <p className="font-medium mb-2">Qualidade de Download</p>
              <select
                value={settings.playback.downloadQuality}
                onChange={(e) =>
                  updateSetting('playback', 'downloadQuality', e.target.value)
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="high">Alta Qualidade</option>
                <option value="medium">Qualidade Média</option>
                <option value="low">Qualidade Baixa</option>
              </select>
            </div>
          </div>
        </Card>

       

        {/* Account */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold">Conta</h2>
          </div>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full text-red-500">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Conta
            </Button>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </MainLayout>
  );
} 