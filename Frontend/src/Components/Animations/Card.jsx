"use client";

import ContextMenu from "../ui/ContextMenu";
import MouseTiltCard from "../ui/MouseTiltCard";
import {
  Share2,
  Info,
  Download,
  Heart,
  Eye,
  Star,
  Edit,
  Trash2
} from "lucide-react";

const ContextMenuDemo = () => {

  const characters = [
    { image: "/gori.png", name: "Gori", title: "Jungle Sage", description: "Strength and wisdom" },
    { image: "/crocs2.png", name: "Snap", title: "Swamp King", description: "Master of the lagoon" },
    { image: "/crow.png", name: "Crowley", title: "Night Watcher", description: "Messenger of the skies" },
    { image: "/foxy.png", name: "Foxy", title: "Forest Trickster", description: "Cunning and quick" }
  ];

  const getContextMenuItems = (character) => [
    {
      id: "view",
      label: "View Character",
      icon: Eye,
      action: () => alert(`Viewing ${character.name}...`)
    },
    {
      id: "favorite",
      label: "Add to Favorites",
      icon: Heart,
      shortcut: "Ctrl + F",
      action: () => alert(`${character.name} added to favorites!`)
    },
    {
      id: "rate",
      label: "Rate Character",
      icon: Star,
      action: () => alert(`Rating ${character.name}...`),
      separator: true
    },
    {
      id: "edit",
      label: "Edit Details",
      icon: Edit,
      shortcut: "Ctrl + E",
      action: () => alert(`Editing ${character.name}...`)
    },
    {
      id: "info",
      label: "Character Info",
      icon: Info,
      action: () => alert(`${character.name}: ${character.description}`),
      separator: true
    },
    {
      id: "download",
      label: "Download Image",
      icon: Download,
      shortcut: "Ctrl + D",
      action: () => alert(`Downloading ${character.name} image...`)
    },
    {
      id: "share",
      label: "Share Character",
      icon: Share2,
      action: () => alert(`Sharing ${character.name}...`)
    },
    {
      id: "delete",
      label: "Remove Character",
      icon: Trash2,
      shortcut: "Del",
      action: () => alert(`Removing ${character.name}...`),
      separator: true
    }
  ];

  const handleMenuItemClick = (item) => {
    console.log("Menu item clicked:", item.label);
  };

  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
          {characters.map((character, index) => (
            <ContextMenu
              key={index}
              menuItems={getContextMenuItems(character)}
            >
              <MouseTiltCard
                tiltIntensity={15}
                scale={1.05}
                glareIntensity={0.1}
              >
                <div className="h-96 w-60 bg-black relative flex flex-col rounded-lg overflow-hidden shadow-[3px_3px_10px_rgba(0,0,0,0.5)]">

                  <img
                    src={character.image}
                    alt={character.name}
                    className="h-full w-full object-cover absolute inset-0 z-0"
                  />

                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background: "linear-gradient(to top, #000, transparent)"
                    }}
                  />

                  <div className="relative z-20 mt-auto p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {character.name}
                    </h3>

                    <p className="text-sm text-white/80 font-medium mb-2">
                      {character.title}
                    </p>

                    <p className="text-xs text-white/60 font-light">
                      {character.description}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-white/60">
                    Right Click
                  </div>

                </div>
              </MouseTiltCard>
            </ContextMenu>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContextMenuDemo;