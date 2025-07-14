import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const connectToNotificationHub = (userId: number, onReceive: (message: string) => void) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    console.error("❌ NEXT_PUBLIC_API_BASE_URL não definida");
    return;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${baseUrl}/notificationhub?userId=${userId}`)
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveNotification", onReceive);

  connection
    .start()
    .then(() => console.log("✅ Conectado ao SignalR"))
    .catch((err) => console.error("Erro ao conectar ao SignalR:", err));
};

export const disconnectFromNotificationHub = () => {
  if (connection) {
    connection.stop();
    connection = null;
  }
};
