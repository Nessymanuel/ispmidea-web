import Image from "next/image";
import imagelogin from "../../../public/imagelogin.png";
import logo from "../../../public/logoupdate.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const formData = new FormData();
    formData.append("Username", name);
    formData.append("Senha", password);
    formData.append("Email", email);
    formData.append("Telefone", telefone);
    formData.append("TipoDeUtilizador", "1");
    if (foto) formData.append("foto", foto); // ← campo de upload

    try {
      await signUp(formData);
    } catch (error) {
      setError("Erro ao criar conta");
    }
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col w-2/5 bg-white px-6 py-8">
        <Link href="/" className="text-xl font-bold">
          <Image src={logo} alt="logo" width={80} height={10} />
        </Link>
        <div className="justify-center pt-8">
          <h1 className="font-bold text-2xl pb-2">
            Increva-te na nossa plataforma multimedia
          </h1>
          <form onSubmit={handleSubmit}>
            <Input label="E-mail" value={email} setValue={setEmail} type="email" />
            <Input label="Username" value={name} setValue={setName} />
            <Input label="Telefone" value={telefone} setValue={setTelefone} />
            <Input label="Senha" value={password} setValue={setPassword} type="password" />
            <Input label="Confirme a senha" value={confirmPassword} setValue={setConfirmPassword} type="password" />

            <div className="flex flex-col py-2">
              <span className="font-medium py-2">Foto (arquivo)</span>
              <input type="file" onChange={(e) => setFoto(e.target.files?.[0] || null)} />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <Button type="submit" variant={"secondary"} className="w-full h-12 my-6">
              Criar Conta
            </Button>
            <div className="text-center">
              <p>Já tem conta?</p>
              <Link href="/login" className="text-purple-600 hover:text-purple-500">
                Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-3/5 bg-purple-600">
        <Image src={imagelogin} width={800} height={120} alt="imagem do login" />
      </div>
    </div>
  );
}

function Input({ label, value, setValue, type = "text" }: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-medium py-2">{label}</span>
      <input
        placeholder={`Digite ${label.toLowerCase()}`}
        type={type}
        className="border h-12 pl-6 rounded-xs"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
