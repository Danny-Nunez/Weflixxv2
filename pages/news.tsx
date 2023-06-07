import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import Header from '../components/Header'
import NewsBanner from '../components/NewsBanner'

interface Movie {
  title: string;
  image: string;
  description: string;
}

const News = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://www.moviefone.com/feeds/news.rss');
        const xmlData = response.data;
        parseString(xmlData, (err, result) => {
          if (err) {
            console.error('Error parsing XML:', err);
            return;
          }
          const movieItems = result.rss.channel[0].item;
          const parsedMovies = movieItems.map((item: any) => ({
            title: item.title[0],
            image: item.enclosure[0].$.url,
            description: item.description[0],
          }));
          setMovies(parsedMovies);
        });
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    
    <div>
      
      <Header />
      <div className="backgroundMaster mt-20 grid-col m-auto relative pl-4 pr-4 pb-24 lg:space-y-24 lg:pl-16 lg:pr-16 lg:w-4/5 md:w-4/5">
      {/* <NewsBanner /> */}
      
      {movies.map((movie) => (
        <div key={movie.title}>
          <img className="rounded" src={movie.image} alt={movie.title} />
          <h2 className="font-extrabold text-2xl pt-4">{movie.title}</h2>
          <p className="text-slate-200 text-sm">{movie.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default News;
