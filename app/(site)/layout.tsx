import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader } from "@/components/Brand";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
