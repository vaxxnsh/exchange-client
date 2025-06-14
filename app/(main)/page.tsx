import Caraousel from "@/components/common/Caraousel";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Dashboard from "@/components/main/Dashboard";



export default function Home() {
  return (
    <div className="page">
      <Navbar/>
      <Caraousel/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}
