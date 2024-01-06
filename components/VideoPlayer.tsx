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
      const apiUrl = `${process.env.NEXT_PUBLIC_MOVIE_URL}watch?episodeId=${episodeId}&mediaId=${id}`;
      // console.log(apiUrl);
      // console.log('Fetching movie URL with mediaId:', id, 'and episodeId:', episodeId);
      const response = await fetch(apiUrl);
      const data = await response.json();
      // console.log('API Response:', data);
      console.log(movieUrl);
  
      // Check if the data object and its properties exist before accessing them
      if (data && data.sources) {
        const sources = data.sources;
        const subtitles = data.subtitles;
        
  
        const firstSource = sources[0];
        const quality1080Url = firstSource?.url || null;
  
        const fetchedSubtitles = subtitles.map((subtitle: { url: string; lang: string }) => ({
          lang: subtitle.lang,
          url: subtitle.url,
          language: subtitle.lang.includes('English') ? 'English' : subtitle.lang,
        }));
  
        const englishSubtitle = fetchedSubtitles.find((subtitle: { lang: string }) => subtitle.lang.includes('English'));
  
        setSubtitles(englishSubtitle ? [englishSubtitle, ...fetchedSubtitles] : []);
  
        const fetchedSources = sources.map((source: { quality: string; url: string }) => ({
          quality: source.quality,
          url: source.url,
        }));
        setSources(fetchedSources);
  
        return quality1080Url;
      } else {
        // console.error('Error fetching movie URL: Invalid data in API response');
        return '';
      }
    } catch (error) {
      // console.error('Error fetching movie URL:', error);
      return '';
    }
  };
  

  useEffect(() => {
    const fetchUrl = async () => {
      setIsLoading(true);
      const url = await fetchMovieUrl(movieId, episodeId);
      setMovieUrl(url);
      setIsLoading(false);
      console.log(movieId);
      console.log(episodeId);
    };

    fetchUrl();
  }, [movieId, episodeId, coverUrl]);

  const isAppleDevice =
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

  return (
    <div className="w-full">
    {isLoading ? (
      <Weflixxloader />
    ) : (
      movieUrl && (
        isAppleDevice ? (
          <Player src={`${process.env.NEXT_PUBLIC_APP_CORS_PROXY}?url=${movieUrl}`} poster={coverUrl} subtitles={subtitles}>
            {(ref, props) => <video ref={ref} {...props} autoPlay/>}
          </Player>
          
        ) : (
          <Player src={`${process.env.NEXT_PUBLIC_APP_CORS_PROXY}?url=${movieUrl}`} poster={coverUrl} subtitles={subtitles}>
            {(ref, props) => <HlsPlayer
            playerRef={ref} autoPlay={true} {...props}
            
             />}
          </Player>
        )
      )
    )}
  </div>
  
  );
};

export default VideoPlayer;

