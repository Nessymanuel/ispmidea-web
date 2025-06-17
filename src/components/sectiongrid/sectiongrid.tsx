import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SectionGrid({ title, count, isVertical }: { title: string; count: number; isVertical?: boolean }) {
  return (
    <section>
      <h2 className="font-semibold text-3xl mt-10">{title}</h2>
      <div className={`grid gap-4 mt-4 ${
        isVertical ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}>
        {[...Array(count)].map((_, i) => (
          <a
            key={i}
            href="#"
            className={`${
              isVertical ? "flex flex-col p-1" : "group flex items-center gap-4 overflow-hidden"
            } bg-purple-100 rounded hover:bg-purple-200 transition-colors`}
          >
            <Image src="/cover.jpg" alt="capa" width={104} height={104} className={isVertical ? "w-full" : ""} />
            <div className="flex-1 flex flex-col">
              <strong className="font-semibold">{isVertical ? "Pérola" : "Amor"}</strong>
              {isVertical && <span className="text-sm text-black font-normal">Sentada Familiar</span>}
            </div>
            {!isVertical && (
              <Button variant={"secondary"} className="w-8 h-8 flex items-center justify-center pl-1 p-2 invisible rounded-full  text-black ml-auto mr-4 group-hover:visible">
                <PlayIcon />
              </Button>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
