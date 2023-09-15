import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow"></div>
      <Footer />
    </div>
  );
}
