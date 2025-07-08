import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://smart-donuts-talk.loca.lt/api/user";

export function useAuth() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // LOGIN
    const signIn = async (email: string, password: string): Promise<void> => {
        try {
            setLoading(true);

            const response = await axios.post(`https://smart-donuts-talk.loca.lt/api/user/login`, {
                email,
                senha: password,

            },
                // {
                //     withCredentials: false
                // }
            );
            console.log({ response });

            const user = response.data;

            // Armazena dados no localStorage (opcional)
            localStorage.setItem("user", JSON.stringify(user));

            // Redireciona após login
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
