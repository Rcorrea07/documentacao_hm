import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planejador Financeiro & Bolsa · Documentação",
  description:
    "Documentação do Planejador Financeiro & Bolsa, nova funcionalidade do App Inatel Acadêmico: User Story, Análise da Tarefa, Diagrama de Classes e Wireframe.",
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-full overflow-x-clip">{children}</body>
    </html>
  );
}
