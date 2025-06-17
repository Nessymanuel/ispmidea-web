import { Shuffle, SkipBack, SkipForward, Repeat, Mic2, LayoutList, Laptop2, Volume2, Maximize2, PlayIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PlayerFooter() {
  return (
    <footer className="bg-purple-100 border-t border-purple-200 p-4 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Image src="/cover.jpg" alt="capa" width={56} height={56} />
        <div className="flex flex-col">
          <strong className="font-semibold">Pérola</strong>
          <span className="text-xs text-gray-900">Sentada Famíliar</span>
        </div>
      </div>
      <div className="flex flex-col  ml-32 items-center gap-2">
        <div className="flex items-center  gap-6">
          <Shuffle size={20} className="text-black" />
          <SkipBack size={20} className="text-black" />
          <Button variant={"secondary"} className="w-10 h-10 flex items-center justify-center p-2 rounded-full  text-black">
            <PlayIcon size={20} />
          </Button>
          <SkipForward size={20} className="text-black" />
          <Repeat size={20} className="text-black" />
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-900">0:31</span>
          <div className="flex-1 h-1 rounded-full bg-purple-200 border-purple-500 w-42  mx-2">
            <div className="bg-purple-800 h-1 w-40 rounded-full"></div>
          </div>
          <span className="text-xs text-gray-900">2:14</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Mic2 size={20} className="text-black" />
        <LayoutList size={20} className="text-black" />
        <Laptop2 size={20} className="text-black" />
        <div className="flex items-center gap-2">
          <Volume2 size={20} className="text-black" />
          <div className="h-1 rounded-full w-24 bg-purborder-purple-500">
            <div className="w-10 h-1 rounded-full bg-purple-800"></div>
          </div>
        </div>
        <Maximize2 size={20} className="text-black" />
      </div>
    </footer>
  );
}
