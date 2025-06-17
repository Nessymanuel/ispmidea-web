import Image from "next/image";
import imagelogin from "../../../public/imagelogin.png"
import logo from "../../../public/logoupdate.png"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export function SignUp() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signUp(email, password, name);
        } catch (error) {
            setError('Erro ao criar conta');
        }
    };

    return (
        <div className="flex flex-row w-screen h-screen">
            <div className="flex flex-col w-2/5 bg-white px-6 py-8">
                <Link href="/" className="text-xl font-bold">
                    <Image src={logo} alt="logo" width={80} height={10} />
                </Link>
                <div className="justify-center pt-8">
                    <div className="">
                        <h1 className="font-bold text-2xl pb-2">Increva-te na nossa plataforma multimedia</h1>
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
                            <span className="font-medium py-2">Username</span>
                            <input
                                placeholder="Digite o seu nome de utilizador"
                                type="text"
                                className="border h-12 pl-6 rounded-xs"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                        <div className="flex flex-col">
                            <span className="font-medium py-2">Confirme a Sua Senha</span>
                            <input
                                placeholder="Confirme a sua senha"
                                type="password"
                                className="border h-12 pl-6 rounded-xs"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}

                        <Button type="submit" variant={"secondary"} className="w-full h-12 my-6">
                            Criar Conta
                        </Button>
                        <div className=" text-center">
                            <p>Já tem conta?</p>
                            <Link href="/login" className="text-purple-600 hover:text-purple-500">
                                Faça login
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