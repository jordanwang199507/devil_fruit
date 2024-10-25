import React from "react";
import images from "@/public/images";
import Image from "next/image";
import { devilFruits } from "../_constant";
import { DevilFruitCard } from ".";
const Paramecia = ({ bookState, currentOpenPage }) => {
  return (
    <div className="bg-page bg-cover w-full h-full rounded-r-lg shadow-page-inner-shadow ">
      <div
        className={`w-full flex items-center justify-center pt-8 ${
          currentOpenPage == 2 ? "hidden" : ""
        }`}
      >
        <hr className="flex-1 h-1 bg-primary border-none" />
        <h3 className="flex-1 text-center text-primary text-2xl font-libre font-bold ">
          PARAMECIA
        </h3>
        <hr className="flex-1 h-1 bg-primary border-none" />
      </div>
      <div
        className={`grid grid-cols-5 px-4 gap-4 pt-4 ${
          currentOpenPage == 2 ? "hidden" : ""
        }`}
      >
        {devilFruits.paramecia.map((fruit) => (
          <DevilFruitCard
            fruit={fruit}
            key={fruit.name_eng}
            bookState={bookState}
          />
        ))}
      </div>
    </div>
  );
};

export default Paramecia;
