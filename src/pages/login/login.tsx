import Image from "next/image";
import imagelogin from "../../../public/imagelogin.png"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import logo from "../../../public/logoupdate.png"
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export function Login() {
    const { signIn } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);

        } catch (err) {
            setError("Email ou senha inválidos");
        }
    };



    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="flex flex-col w-2/5 bg-white px-6 py-8">
                <Link href="/landing" className="text-xl font-bold">
                    <Image src={logo} alt="logo" width={80} height={10} />
                </Link>
                <div className="justify-center pt-14">
                    <div className="">
                        <h1 className="font-bold text-2xl pb-2">Bem vindo(a) ao ISPMEDIA 👋</h1>
                        <p>Faça login para acessar a sua conta e começar a explorar todos os recursos da plataforma.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="">
                        <div className="flex flex-col">
                            <span className="font-medium py-2">E-mail</span>
                            <input
                                placeholder="Digite o seu e-mail"
                                type="email"
                                className="border h-12 pl-6 rounded-xs"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium py-2">Senha</span>
                            <input
                                placeholder="Digite a sua senha"
                                type="password"
                                className="border h-12 pl-6 rounded-xs"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between py-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="mr-2"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="remember">Lembrar-me</label>
                            </div>
                            <a href="#" className="text-purple-600 hover:text-purple-500">Esqueceu a senha?</a>
                        </div>

                        <Button variant={"secondary"} className="w-full h-12 my-8">
                            Entrar
                        </Button>

                        <div className="py-3 text-center">
                            <p>Não tem conta?</p>
                            <Link href="/signup" className="text-purple-600 hover:text-purple-500">
                                Criar conta
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex w-3/5 bg-purple-600">
                <Image src={imagelogin} width="800" height="120" alt="imagem do login" />
            </div>
        </div>
    );
}