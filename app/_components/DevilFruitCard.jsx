import { useEffect } from "react";
import images from "@/public/images";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DevilFruitCard = ({ fruit, bookState }) => {
  useEffect(() => {
    if (bookState) {
      gsap.to(".fruit", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        delay: 1, // 1-second delay
      });
    } else {
      gsap.to(".fruit", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.01,
      });
    }
  }, [bookState]);
  return (
    <div className="fruit flex items-center flex-col opacity-0 translate-y-20">
      <div className="w-[75px] h-[75px] relative">
        <Image
          src={fruit.image}
          alt={`${fruit.name_eng} fruit`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h4 className="font-libre text-primary font-bold text-base pt-1">
        {fruit.name_jap}
      </h4>
      <p className="font-libre text-primary text-[10px] font-bold">no Mi</p>
      <p className="font-libre text-primary text-xs font-bold">
        {fruit.name_eng}
      </p>
    </div>
  );
};

export default DevilFruitCard;
