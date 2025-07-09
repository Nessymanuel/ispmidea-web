import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, senha: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Utilizador/login`, {
      email,
      senha
    });

    const user = response.data;

    localStorage.setItem("user", JSON.stringify(user)); // armazena o usuário

    router.push("/");
  } catch (err) {
    throw err;
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
