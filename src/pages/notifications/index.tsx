import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell,
  MessageSquare,
  UserPlus,
  Star,
  Share2,
  Trash2,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

type Notification = {
  id: number;
  type: 'comment' | 'friend' | 'rating' | 'share';
  message: string;
  timestamp: string;
  isRead: boolean;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'comment',
      message: 'João Silva comentou em sua música "Título da Música"',
      timestamp: '5 minutos atrás',
      isRead: false
    },
    {
      id: 2,
      type: 'friend',
      message: 'Maria Santos aceitou seu pedido de amizade',
      timestamp: '1 hora atrás',
      isRead: false
    },
    {
      id: 3,
      type: 'rating',
      message: 'Pedro Oliveira deu 5 estrelas para seu álbum "Nome do Álbum"',
      timestamp: '2 horas atrás',
      isRead: true
    },
    {
      id: 4,
      type: 'share',
      message: 'Ana Costa compartilhou sua playlist "Músicas Favoritas"',
      timestamp: '1 dia atrás',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'friend':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'rating':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'share':
        return <Share2 className="w-5 h-5 text-purple-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  return (
    <MainLayout>
      <Navbar/>
      <div className="space-y-6 pt-20 mx-4 ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Notificações</h1>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Marcar todas como lidas
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {notification.timestamp}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">
                Nenhuma notificação
              </h3>
              <p className="text-gray-500">
                Você não tem notificações no momento
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 