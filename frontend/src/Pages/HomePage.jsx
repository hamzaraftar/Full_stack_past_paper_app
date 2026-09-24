import React from "react";
import Navebar from "../Components/Navebar";
import Card from "../Components/Card";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F1E4]">
      <Navebar />
      <main className="flex-1">
        <Card />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
