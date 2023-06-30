import React, { useEffect, useState, useRef } from 'react';
import HlsPlayer from 'react-hls-player';
import { CircularProgress } from '@mui/material';

interface VideoPlayerProps {
  movieId: string;
  episodeId: string;
  title: string;
  episodeTitle: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, title, episodeId, episodeTitle }) => {
  const [movieUrl, setMovieUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const playerRef = useRef(null);

  const fetchMovieUrl = async (id: string, episodeId: string): Promise<string> => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}streaming?mediaId=${id}&episodeId=${episodeId}`;
      console.log('API URL:', apiUrl); // Check the API URL
  
      const response = await fetch(apiUrl);
      console.log('Response:', response); // Check the response object
  
      const data = await response.json();
      console.log('Data:', data); // Check the response data
  
      const sources = data.data.sources;
      const firstSource = sources[0];
      const quality1080Url = firstSource ? firstSource.url : null;
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
  }, [movieId, episodeId]);

  const isAppleDevice = 
    ["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  return (
    <div className="w-full">
      <div className="text-white font-bold text-lg mb-2">{episodeTitle}</div>
      {isLoading ? (
        <CircularProgress /> // Render the preloader when loading
      ) : (
        movieUrl && (
          isAppleDevice ? 
          (
            <video 
              src={movieUrl}
              controls
              width="100%"
              height="auto"
            />
          ) : 
          (
            <HlsPlayer
              playerRef={playerRef}
              src={movieUrl}
              autoPlay={true}
              controls={true}
              width="100%"
              height="auto"
            />
          )
        )
      )}
    </div>
  );
};

export default VideoPlayer;



