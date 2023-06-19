import React, { useEffect, useState, useRef } from 'react';
import HlsPlayer from 'react-hls-player';
import { CircularProgress } from '@mui/material';

interface VideoPlayerProps {
  movieId: string;
  episodeId: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, title, episodeId }) => {
  const [movieUrl, setMovieUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const playerRef = useRef(null);

  const fetchMovieUrl = async (id: string, episodeId: string): Promise<string> => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}streaming?mediaId=${id}&episodeId=${episodeId}`;
      // console.log('API URL:', apiUrl); // Log the API URL
      const response = await fetch(apiUrl);
      const data = await response.json();
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
      // console.log('Movie URL:', url); // Log the movie URL
      setMovieUrl(url);
      setIsLoading(false);
    };

    fetchUrl();
  }, [movieId, episodeId, title]);

  return (
    <div className="w-full">
      <div className="text-white font-bold text-lg mb-2">{title}</div>
      {isLoading ? (
        <CircularProgress /> // Render the preloader when loading
      ) : (
        movieUrl && (
          <HlsPlayer
            playerRef={playerRef}
            src={movieUrl}
            autoPlay
            controls={true}
            width="100%"
            height="auto"
          />
        )
      )}
    </div>
  );
};

export default VideoPlayer;

