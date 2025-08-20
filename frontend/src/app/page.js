"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  });

  return (
    <div className="bg-[var(--landing-page-bg)] w-screen h-screen items-center justify-center flex flex-col">
      <Image
        src="/logo.png"
        alt="Description of the image"
        objectFit="cover"
        width={500}
        height={300}
      />
    </div>
  );
}
