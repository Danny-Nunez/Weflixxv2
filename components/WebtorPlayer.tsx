import { useEffect } from "react";

interface WebtorPlayerProps {
  torrentHash: string;
}

const WebtorPlayer: React.FC<WebtorPlayerProps> = ({ torrentHash }) => {
  useEffect(() => {
    (window as any).webtor = (window as any).webtor || [];
    (window as any).webtor.push({
      id: "player",
      magnet: "550177581AF98D94D93AF8630FE846E91FAB290A",
      on: function (e: any) {
        if (e.name === (window as any).webtor.TORRENT_FETCHED) {
          console.log("Torrent fetched!", e.data);
        }
        if (e.name === (window as any).webtor.TORRENT_ERROR) {
          console.log("Torrent error!");
        }
      },
      poster:"https://www.themoviedb.org/t/p/original/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
      width: "100%",
      subtitles: [
        {
            srclang: 'en',
            label: 'test',
            src: 'https://raw.githubusercontent.com/andreyvit/subtitle-tools/master/sample.srt',
            default: true,
        }
    ],
    lang: 'en',
    });
  }, [torrentHash]);

  return <div id="player" className="webtor w-full"></div>;
};

export default WebtorPlayer;

