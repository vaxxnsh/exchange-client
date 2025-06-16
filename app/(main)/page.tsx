import Caraousel from "@/components/common/Caraousel";
import Footer from "@/components/common/Footer";
import Dashboard from "@/components/main/Dashboard";



export default function Home() {
  return (
    <div className="page">
      <Caraousel/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}
