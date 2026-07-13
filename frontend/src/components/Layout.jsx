import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Chatbot from "@/components/Chatbot";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}
