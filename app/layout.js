import "./globals.css";
import Image from "next/image";
import images from "@/public/images";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Devil Fruit</title>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body className="min-h-[1100]">
        <section className="w-full px-16 pt-12">
          <div className="max-container">
            <Image src={images.logo} width={180} height={68} alt="logo" />
          </div>
        </section>
        <div className="w-full absolute top-40 overflow-x-hidden">
          <div className="flex">
            <img
              src={images.bg01}
              alt="background image 01"
              className="flex-1 h-[400px] object-cover"
            />
            <img
              src={images.bg02}
              alt="background image 02"
              className="flex-1 h-[400px] object-cover"
            />
            <img
              src={images.bg03}
              alt="background image 03"
              className="flex-1 h-[400px] object-cover"
            />
          </div>
        </div>

        {children}
        {/* {children} */}
      </body>
    </html>
  );
}
