
import { useEffect, useState } from "react";
import Image from 'next/image';

interface WebtorPlayerProps {
  torrentHash: string;
  title: string;
  backdrop: string;
}

const WebtorPlayer: React.FC<WebtorPlayerProps> = ({ torrentHash, title, backdrop }) => {
  useEffect(() => {
    if (!torrentHash) return; // Return early if torrentHash is empty or null

    (window as any).webtor = (window as any).webtor || [];
    (window as any).webtor.push({
      id: "player",
      magnet: torrentHash,
      on: function (e: any) {
        if (e.name === (window as any).webtor.TORRENT_FETCHED) {
          console.log("Torrent fetched!", e.data);
          
        }
        if (e.name === (window as any).webtor.TORRENT_ERROR) {
          console.log("Torrent error!");
          
        }
      },
      poster:"https://www.themoviedb.org/t/p/original" + backdrop,
      title: title,
      width: "100%",
      
      features: {
        embed: false, 
        settings: false,
      },
    });
  }, [torrentHash, title, backdrop]);

  return <div id="player" className="webtor w-full"></div>;
};

export default WebtorPlayer;




