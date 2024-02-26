import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/contexts/AuthProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { GlobalContextProvider } from "@/contexts/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const supabase= createServerComponentClient({cookies})
  const userResponse= await supabase.auth.getUser()
  return (
  
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider value={userResponse.data.user}>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
        </AuthProvider>
        
        </body>
    </html>
  );
}
