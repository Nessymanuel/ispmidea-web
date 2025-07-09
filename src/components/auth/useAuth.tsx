import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, senha: string): Promise<void> => {
    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/api/Utilizador/login`, {
        email,
        senha,
      });

      const { id, username, email: userEmail, fotografia, isEditor } = res.data;

      const user = { id, username, email: userEmail, fotografia, isEditor };

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home"); // ou dashboard
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (formData: FormData): Promise<void> => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/Utilizador`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return {
    signIn,
    signUp,
    logout,
    loading,
  };
}
