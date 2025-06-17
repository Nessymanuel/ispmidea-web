import { Github, PersonStanding } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "../../../public/logoupdate.png"

export default function Menu() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full border-b flex flex-row items-center justify-between px-4 sm:px-6 py-3 shadow shadow-purple-100 bg-transparent">
      <div>
        {/* <h1 className="font-bold text-lg sm:text-xl">ISPMIDEA</h1> */}
        <Image src={logo} alt="logo" width={80} height={10} />
      </div>
      <div className="flex items-center space-x-4 sm:space-x-8 bg-purple-200 p-1 rounded-full">
        <div  className="flex items-center gap-1 px-3 py-1 text-sm rounded-4xl bg-purple-600">
          <span className="hidden sm:inline font-bold text-lg">A</span>
        </div>
      </div>
    </div>
  );
}
