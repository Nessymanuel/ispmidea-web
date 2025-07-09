import { useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  fotografia: string;
  isEditor: boolean;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return user;
}
