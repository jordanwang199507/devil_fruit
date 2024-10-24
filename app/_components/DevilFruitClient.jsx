// app/_components/DevilFruitClient.js
"use client"; // Add this directive to indicate this is a client component

import dynamic from "next/dynamic";

const DevilFruitBook = dynamic(() => import("./DevilFruitBook"), {
  ssr: false,
});

export default DevilFruitBook;
