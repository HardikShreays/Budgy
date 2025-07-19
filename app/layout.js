import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { AuthProvider } from "./context/Authcontext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Budgy - Smart Financial Management",
  description: "Your smart financial companion for better money management and financial freedom.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
