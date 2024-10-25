"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import images from "@/public/images";
import { Paramecia } from ".";
gsap.registerPlugin(ScrollTrigger);

const DevilFruitBook = () => {
  const [bookState, setBookState] = useState(false); // Track book open state
  const [currentOpenPage, setCurrentOpenPage] = useState(0);
  const scrollRef = useRef({});
  const infoDivRef = useRef(); // Ref for the "info" div
  const pageButtons = useRef();
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, delay: 2 });
    gsap.to("#subtitle", { opacity: 1, y: 0, delay: 2 });
    gsap.from("#book", {
      rotation: 360,
      duration: 2,
      ease: "power1.inOut",
    });
  }, []);
  useGSAP(() => {
    const book = document.getElementById("book");
    if (book) {
      // Function to update book position based on screen width
      const updateBookPosition = () => {
        const centerX =
          window.innerWidth > 1500
            ? (window.innerWidth - book.offsetWidth) / 4
            : (window.innerWidth - book.offsetWidth) / 2;

        gsap.to("#book", {
          y: 150,
          x: centerX,
          zIndex: 999,
          scrollTrigger: {
            trigger: "#book",
            start: "-10% 20%",
            end: "30% 30%",
            scrub: true,
            markers: true,
            onLeave: () => {
              // Hide info div and trigger book opening
              gsap.to(infoDivRef.current, { opacity: 0, duration: 0.5 });
              setBookState(true);
              gsap.to(pageButtons.current, {
                opacity: 1,
                x: centerX,
                duration: 0.5,
              });
            },
            onEnterBack: () => {
              // Show info div and reset book state
              gsap.to(infoDivRef.current, { opacity: 1, duration: 0.5 });
              setBookState(false);
              setCurrentOpenPage(0);
            },
          },
        });
      };

      // Call updateBookPosition and add resize event listener
      updateBookPosition();
      window.addEventListener("resize", updateBookPosition);

      return () => window.removeEventListener("resize", updateBookPosition);
    }
  }, []);

  useGSAP(() => {
    if (bookState) {
      // If book is open, trigger GSAP animations for turning pages and cover
      scrollRef.current.coverAnimation = gsap.to(".cover.turn", {
        duration: 3,
        transform: "translateX(-50%) rotateY(-180deg)",
        ease: "power1.inOut",
        onStart: () => gsap.set(".cover.turn", { zIndex: 999 }),
        onComplete: () => gsap.set(".cover.front", { zIndex: 3 }),
      });

      scrollRef.current.pageAnimations = gsap.to(".page.turn", {
        duration: 3,
        transform: "translateX(-51%) rotateY(-180deg)",
        zIndex: 998,
        ease: "power1.inOut",
        stagger: { each: 0.3 },
      });

      scrollRef.current.open150deg = gsap.to(".page.open150", {
        duration: 3,
        delay: 0.99,
        transform: "translateX(-51%) rotateY(-150deg)",
        zIndex: 998,
        ease: "power1.inOut",
      });

      scrollRef.current.open140deg = gsap.to(".page.open140", {
        duration: 3,
        delay: 1.2,
        transform: "translateX(-51%) rotateY(-140deg)",
        zIndex: 998,
        ease: "power1.inOut",
      });
    } else {
      // Reverse the animations when the book is closed
      gsap.set(".page.filler", { zIndex: 2 });
      scrollRef.current?.pageAnimations?.reverse();
      scrollRef.current?.open150deg?.reverse();
      scrollRef.current?.open140deg?.reverse();
      setTimeout(() => {
        scrollRef.current?.coverAnimation?.reverse();
      }, 2000);
    }
  }, [bookState]);
  const changePageToParamecia = () => {
    setCurrentOpenPage(1);
  };
  const changePageToZoan = () => {
    setCurrentOpenPage(2);
  };

  const pageAnimationRef = useRef(null);

  useEffect(() => {
    if (bookState && currentOpenPage === 2) {
      // Set zIndex to 999 before the animation starts
      gsap.set(".page.open130", { zIndex: 999 });

      // Create and store the animation instance in the ref
      pageAnimationRef.current = gsap.to(".page.open130", {
        transform: "translateX(-51%) rotateY(-140deg)",
        duration: 1,
        ease: "power1.inOut",
      });
    } else if (pageAnimationRef.current) {
      // Once the reverse is complete, reset z-index to 1
      pageAnimationRef.current.eventCallback("onReverseComplete", () => {
        gsap.set(".page.paramecia", { zIndex: 1 });
      });
      // Reverse the animation
      pageAnimationRef.current.reverse();
    }
  }, [bookState, currentOpenPage]);

  return (
    <div className="flex items-end w-full gap-2 xl:gap-10 mt-10 h-screen">
      <div
        id="book"
        className="w-2/3 min-w-[45rem] max-w-[60rem] max-md:min-w-[38rem] max-sm:min-w-[30rem] max-[500px]:min-w-[20rem] flex-1 book-container mx-auto mb-20 left-0 relative"
      >
        {/* Book Pages */}
        <span className={`page filler ${bookState ? "turn" : ""}`}></span>
        <span className={`page filler ${bookState ? "turn" : ""}`}></span>
        <span className={`page filler ${bookState ? "turn" : ""}`}></span>
        <span className={`page filler ${bookState ? "open150" : ""}`}></span>
        <span className={`page filler ${bookState ? "open140" : ""}`}></span>
        <span className="cover"></span>
        <span className="page"></span>
        <span className="page"></span>
        <span
          className={`page paramecia ${
            currentOpenPage == 2 ? "open130" : ""
          } p-10 shadow-custom-shadow`}
        >
          <Image
            src={images.bookCorner}
            alt="Book Cover corner decoration"
            width={75}
            height={75}
            className="absolute top-2 left-2 "
          />
          <Image
            src={images.bookCorner}
            alt="Book Cover corner decoration"
            width={75}
            height={75}
            className="absolute top-2 right-2 rotate-90 "
          />
          <Image
            src={images.bookCorner}
            alt="Book Cover corner decoration"
            width={75}
            height={75}
            className="absolute bottom-2 right-2 rotate-180"
          />
          <Image
            src={images.bookCornerBottomLeft}
            alt="Book Cover corner decoration"
            width={75}
            height={75}
            className="absolute bottom-2 left-2"
          />
          <Image
            src={images.bookTop}
            alt="Book Cover corner decoration"
            width={140}
            height={25}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 rotate-180"
          />
          <Image
            src={images.bookTop}
            alt="Book Cover corner decoration"
            width={140}
            height={25}
            className="absolute top-1 left-1/2 -translate-x-1/2"
          />
          <Image
            src={images.bookSide}
            alt="Book Cover corner decoration"
            width={20}
            height={100}
            className="absolute left-2 top-1/2 -translate-y-1/2 "
          />
          <Image
            src={images.bookSide}
            alt="Book Cover corner decoration"
            width={20}
            height={100}
            className="absolute right-2 top-1/2 -translate-y-1/2 "
          />
          <Paramecia bookState={bookState} currentOpenPage={currentOpenPage} />
        </span>
        <div
          className={`cover front ${
            bookState ? "turn" : ""
          } py-4 px-4 max-[500px]:p-2 z-[3]`}
        >
          <div className="border-8 border-background h-full rounded-md p-24 max-sm:px-16 max-[500px]:px-10 relative z-10 flex flex-col justify-end">
            <Image
              src={images.bookCorner}
              alt="Book Cover corner decoration"
              width={125}
              height={125}
              className="absolute top-2 left-2 max-sm:w-[75px] max-sm:h-[75px] max-[500px]:w-[45px] max-[500px]:h-[45px]"
            />
            <Image
              src={images.bookTop}
              alt="Book Cover corner decoration"
              width={260}
              height={75}
              className="absolute top-2 left-1/2 -translate-x-1/2 max-sm:w-[130px] max-sm:h-[35px]"
            />
            <Image
              src={images.bookCorner}
              alt="Book Cover corner decoration"
              width={125}
              height={125}
              className="absolute top-2 right-2 rotate-90 max-sm:w-[75px] max-sm:h-[75px] max-[500px]:w-[45px] max-[500px]:h-[45px]"
            />
            <Image
              src={images.bookSide}
              alt="Book Cover corner decoration"
              width={33}
              height={300}
              className="absolute left-2 top-1/2 -translate-y-1/2 max-sm:w-[22px] max-sm:h-[200px] max-[500px]:w-[12px] max-[500px]:h-[150px]"
            />
            <div className="border-4 border-background py-8 px-20 max-sm:px-8 max-w-md bg-page bg-cover m-auto mt-16 rounded-md  font-bold text-center text-primary">
              <h1 className="text-[64px] max-md:text-5xl max-sm:text-3xl max-[500px]:text-xl">
                悪魔の実
              </h1>
              <h3 className="text-sm max-sm:text-xs">
                [Devil Fruit Encyclopedia]
              </h3>
            </div>
            <Image
              src={images.bookSide}
              alt="Book Cover corner decoration"
              width={33}
              height={300}
              className="absolute right-2 top-1/2 -translate-y-1/2 max-sm:w-[22px] max-sm:h-[200px] max-[500px]:w-[12px] max-[500px]:h-[150px]"
            />
            <Image
              src={images.bookCorner}
              alt="Book Cover corner decoration"
              width={125}
              height={125}
              className="absolute bottom-2 right-2 rotate-180 max-sm:w-[75px] max-sm:h-[75px] max-[500px]:w-[45px] max-[500px]:h-[45px]"
            />
            <Image
              src={images.bookTop}
              alt="Book Cover corner decoration"
              width={260}
              height={75}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rotate-180 max-sm:w-[130px] max-sm:h-[35px]"
            />
            <Image
              src={images.bookCornerBottomLeft}
              alt="Book Cover corner decoration"
              width={125}
              height={125}
              className="absolute bottom-2 left-2 max-sm:w-[75px] max-sm:h-[75px] max-[500px]:w-[45px] max-[500px]:h-[45px]"
            />
            <div
              ref={infoDivRef}
              className="max-w-md text-primary-100 m-auto mb-0 hidden max-lg:block"
            >
              <h1
                id="title"
                className="font-libre font-bold text-2xl opacity-0 max-sm:text-lg"
              >
                DEVIL FRUIT
                <br /> ENCYCLOPEDIA
              </h1>
              <p
                id="subtitle"
                className="font-montserrat font-thin mt-6 ml-20 max-sm:ml-5 text-sm max-sm:text-xs opacity-0 translate-y-20"
              >
                Devil Fruits are supernatural fruits that are scattered
                throughout the world. Any living being who eats one will gain a
                unique ability at the cost of becoming weakened in bodies of
                water, resulting in them losing the ability to swim. With one
                notable exception, beings are limited to acquiring one Devil
                Fruit power.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={infoDivRef}
        className={`mb-80 max-w-lg text-white-900 max-lg:hidden ${
          bookState ? "hidden" : ""
        }`}
      >
        <h1 id="title" className="font-libre font-bold text-4xl opacity-0">
          DEVIL FRUIT ENCYCLOPEDIA
        </h1>
        <p
          id="subtitle"
          className="font-montserrat font-thin mt-6 xl:ml-16 text-base opacity-0 translate-y-20 max-w-md"
        >
          Devil Fruits are supernatural fruits that are scattered throughout the
          world. Any living being who eats one will gain a unique ability at the
          cost of becoming weakened in bodies of water, resulting in them losing
          the ability to swim. With one notable exception, beings are limited to
          acquiring one Devil Fruit power.
        </p>
      </div>
      <div
        ref={pageButtons}
        className={`opacity-0 flex flex-col items-start ${
          bookState ? "block" : "hidden"
        }`}
      >
        <button
          className="font-libre text-2xl text-white"
          onClick={changePageToParamecia}
        >
          PARAMECIA
        </button>
        <button
          className="font-libre text-2xl text-white"
          onClick={changePageToZoan}
        >
          ZOAN
        </button>
      </div>
    </div>
  );
};

export default DevilFruitBook;
