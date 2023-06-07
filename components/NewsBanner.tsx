import { useEffect, useState } from 'react';
import Parser from 'rss-parser';

interface Item {
  title: string;
  enclosure: {
    url: string;
  };
  description: string;
}

function NewsBanner() {
  const [randomItem, setRandomItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchRSSData = async () => {
      const parser = new Parser();
      const rssUrl = 'https://www.moviefone.com/feeds/what-to-watch.rss';
      const feed = await parser.parseURL(rssUrl);
      const items = feed.items;

      // Get a random item from the RSS feed
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem: Item = items[randomIndex] as Item; // Assert the type to Item

      setRandomItem(randomItem);
    };

    fetchRSSData();
  }, []);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
      {randomItem && (
        <div>
          <img className="object-cover" src={randomItem.enclosure.url} alt="Banner"/>
          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">{randomItem.title}</h1>
          <p>{randomItem.description}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default NewsBanner;


