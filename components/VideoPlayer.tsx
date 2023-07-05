import React, { useEffect, useState, useRef } from 'react';
import { Player } from 'react-tuby';
import 'react-tuby/css/main.css';
import HlsPlayer from 'react-hls-player';
import Weflixxloader from './weflixxloader';

interface VideoPlayerProps {
  movieId: string;
  episodeId: string;
  title: string;
  episodeTitle: string;
  coverUrl: string;
}

interface Subtitle {
  lang: string;
  url: string;
  language: string;
}

interface Source {
  quality: string;
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, title, episodeId, episodeTitle, coverUrl }) => {
  const [movieUrl, setMovieUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const playerRef = useRef(null);

  const fetchMovieUrl = async (id: string, episodeId: string): Promise<string> => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}streaming?mediaId=${id}&episodeId=${episodeId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      const sources = data.data.sources;
      const firstSource = sources[0];
      const quality1080Url = firstSource ? firstSource.url : null;

      const fetchedSubtitles = data.data.subtiles.map((subtitle: { url: string; lang: string }) => ({
        lang: subtitle.lang,
        url: subtitle.url,
        language: subtitle.lang,
      }));
      setSubtitles(fetchedSubtitles);

      const fetchedSources = sources.map((source: { quality: string; url: string }) => ({
        quality: source.quality,
        url: source.url,
      }));
      setSources(fetchedSources);

      return quality1080Url;
    } catch (error) {
      console.error('Error fetching movie URL:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchUrl = async () => {
      setIsLoading(true);
      const url = await fetchMovieUrl(movieId, episodeId);
      setMovieUrl(url);
      setIsLoading(false);
    };

    fetchUrl();
  }, [movieId, episodeId, coverUrl]);

  return (
    <div className="w-full">
      {isLoading ? (
        <Weflixxloader />
      ) : (
        movieUrl && (
          <Player src={sources} poster={coverUrl} subtitles={subtitles}>
            {(ref, props) => <HlsPlayer playerRef={ref} {...props} />}
          </Player>
        )
      )}
    </div>
  );
};

export default VideoPlayer;


