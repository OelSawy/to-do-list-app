import { Poppins, Handlee } from "next/font/google";

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const handlee = Handlee({
  variable: "--font-handlee",
  weight: ["400"],
  subsets: ["latin"],
});
