import { AuthProvider } from "./context/Authcontext";
import { BudgetProvider } from "./context/BudgetContext";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";

export const metadata = {
  title: "Budgy - Smart Financial Management",
  description: "Your smart financial companion for better money management and financial freedom.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AuthProvider>
          <BudgetProvider>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
          </BudgetProvider>
        </AuthProvider>
      </body>
    </html>
  );
}