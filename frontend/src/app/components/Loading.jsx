"use client";
import Image from "next/image";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="relative w-[500px] h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/logo.png"
          alt="Loading Logo"
          fill
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 shimmer" />
      </div>
    </div>
  );
}
