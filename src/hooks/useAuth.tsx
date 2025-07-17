import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL =`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Utilizador`;

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // LOGIN
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        senha: password,
      });

      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // REGISTO
  const signUp = async (formData: FormData): Promise<void> => {
    try {
      setLoading(true);

      await axios.post(API_BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/login");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return {
    signIn,
    signUp,
    signOut,
    loading,
  };
}
