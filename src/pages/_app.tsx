import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from '@/components/layout/navbar';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const isAuthPage = false; // Removed auth check

  return (
    <div className="min-h-screen bg-white">
      {!isAuthPage }
      <Component {...pageProps} />
    </div>
  );
}
