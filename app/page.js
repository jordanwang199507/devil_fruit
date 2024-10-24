import Image from "next/image";
// import DevilFruitBook from "./_components/DevilFruitBook";
import DevilFruitClient from "./_components/DevilFruitClient";
import images from "@/public/images";

export default function Home() {
  return (
    <div className="w-full min-h-screen h-full flex justify-center sm:px-16 px-8 pt-12 pb-52 bg-background">
      <section className="max-container mx-auto relative">
        <DevilFruitClient />
      </section>
    </div>
  );
}
