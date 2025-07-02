import Footer from "@/component/Footer/Footer";
import "./globals.css";
import Navbar from "@/component/Navbar/Navbar";
import ContextProvider from "@/contexts/provider";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "My Cart App",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <Navbar />
      <body>
        <ContextProvider>
          {children}
          <ToastContainer />
        </ContextProvider>
      </body>
      <Footer />
    </html>
  );
}
