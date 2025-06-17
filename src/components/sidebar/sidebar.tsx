import { HomeIcon, LibraryIcon, SearchIcon, ListMusic, Upload, Users } from "lucide-react";

function NavItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <a href="#" className="flex items-center gap-2 text-sm font-sans text-black hover:text-purple-950">
      {icon} {text}
    </a>
  );
}


export default function Sidebar() {
  return (
    <aside className="w-24 lg:w-72 bg-purple-100 p-6 ">
      <nav className="space-y-4">
        <NavItem icon={<HomeIcon size={18} />} text="Home" />
        <NavItem icon={<SearchIcon size={18} />} text="Pesquisar" />
        <NavItem icon={<LibraryIcon size={18} />} text="Sua Biblioteca" />
      </nav>
      <nav className="mt-8 pt-8 border-t border-gray-300 flex flex-col gap-3">
        <NavItem icon={<ListMusic size={18} />} text="Minhas Playlists" />
        <NavItem icon={<Upload size={18} />} text="Uploads" />
        <NavItem icon={<Users size={18} />} text="Meus Grupos" />
      </nav>
    </aside>
  );
}

