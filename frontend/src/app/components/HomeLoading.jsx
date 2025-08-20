"use client";
import Image from "next/image";
import "./Loading.css";

export default function HomeLoading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="relative w-[500px] h-[300px] flex items-center justify-center overflow-hidden -translate-x-64">
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
