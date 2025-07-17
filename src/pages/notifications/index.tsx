import { useState, useEffect } from 'react';
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
  Check,
  Heart,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import {
  connectToNotificationHub,
  disconnectFromNotificationHub,
} from '@/lib/signalr';

type Notification = {
  id: number;
  type: 'comment' | 'friend' | 'rating' | 'share' | 'like';
  message: string;
  timestamp: string;
  isRead: boolean;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    const userId = user.id;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Notificacao/utilizador/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const parsed: Notification[] = data.map((n: any) => {
          let tipo: Notification['type'] = 'comment';
          if (n.textoNotificacao?.toLowerCase().includes('curtiu')) tipo = 'like';

          return {
            id: n.id,
            type: tipo,
            message: `${n.nomeUtilizadorOrigem ?? 'Alguém'} ${n.textoNotificacao}`,
            timestamp: new Date(n.dataNotificacao).toLocaleString('pt-AO'),
            isRead: n.visto === true,
          };
        });

        setNotifications(parsed.reverse()); // Reversing the notifications to display latest first
        setUnreadCount(parsed.filter((n: Notification) => !n.isRead).length);
      });

    connectToNotificationHub(userId, (mensagem) => {
      const novaNotificacao: Notification = {
        id: Date.now(),
        type: mensagem.toLowerCase().includes('curtiu') ? 'like' : 'comment',
        message: mensagem,
        timestamp: 'Agora mesmo',
        isRead: false,
      };
      setNotifications((prev) => [novaNotificacao, ...prev]); // New notification at the start of the list
      setUnreadCount((prev) => prev + 1);

      const audio = new Audio('/sounds/notification.wav');
      audio.play();
    });

    return () => disconnectFromNotificationHub();
  }, []);

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
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <MainLayout>
      <Navbar notificationCount={unreadCount} />
      <div className="space-y-6 pt-20 mx-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Notificações</h1>
          <Button variant="outline" onClick={markAllAsRead} className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Marcar todas como lidas
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 ${!notification.isRead ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <p className="text-gray-900">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
                <div className="flex gap-2">
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Nenhuma notificação</h3>
              <p className="text-gray-500">Você não tem notificações no momento</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
