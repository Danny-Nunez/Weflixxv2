import { ThumbUpIcon } from '@heroicons/react/solid';
import { setDoc } from 'firebase/firestore';

import { Movie } from '../typings'
import { useEffect, useState } from 'react';
import { updateDoc, doc, arrayUnion, arrayRemove, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { User } from "firebase/auth";

interface Props {
  movieId: string; // or number, depending on the type of your movieId
}

const LikeButton: React.FC<Props> = ({ movieId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const movieRef = doc(db, 'movies', movieId);
    const unsubscribe = onSnapshot(movieRef, (snapshot) => {
      const data = snapshot.data() as Movie;
      if (data) {
        setLikes(data.likes || 0);
        setLiked(data.likedUsers?.includes(user?.uid ?? '') || false);

      }
    });

    return () => {
      unsubscribe();
    };
  }, [movieId, user]);

  const handleLike = async () => {
    if (!user) return;
  
    const movieRef = doc(db, 'movies', movieId);
  
    if (!liked) {
      // If the movie isn't liked yet, add the user's ID to the likedUsers array and increment the likes count
      await setDoc(movieRef, {
        likes: increment(1),
        likedUsers: arrayUnion(user.uid)
      }, { merge: true });
    } else {
      // If the movie is already liked, remove the user's ID from the likedUsers array and decrement the likes count
      // Only do this if the document exists
      await setDoc(movieRef, {
        likes: increment(-1),
        likedUsers: arrayRemove(user.uid)
      }, { merge: true });
    }
  
    setLiked(!liked);
  };
  
  
  
  return (
    <div className="relative">
  <div className="absolute top-0 right-0 mt-[-7px] text-xs"> {/* You can adjust this value as needed */}
    <p>{likes}</p>
  </div>
  <ThumbUpIcon
    className={`h-6 w-6 ${liked ? 'text-red-500' : 'text-gray-400'}`}
    onClick={handleLike}
  />
</div>
  )
}

export default LikeButton
