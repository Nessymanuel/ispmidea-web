import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://192.168.100.79:5252/api/Utilizador";

export function useAuth() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const signUp = async (formData: FormData): Promise<void> => {
        try {
            setLoading(true);
            await axios.post("http://192.168.100.79:5252/api/Utilizador", formData, {
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


    const signIn = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    return {
        signUp,
        signIn,
        loading,
    };
}
