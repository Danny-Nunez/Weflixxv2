import { useEffect, useRef, useState } from 'react';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Membership from '../components/Membership';
import useAuth from '../hooks/useAuth';
import useSubscription from '../hooks/useSubscription';
import payments from '../lib/stripe';
import Footer from '../components/Footer';
import { updateProfile } from 'firebase/auth';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase'; // Add this line

import { goToBillingPortal } from '../lib/stripe';

interface Props {
  products: Product[];
}

function Account({ products }: Props) {
  console.log(products);
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);
  const storage = getStorage();


  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (image && user) { // Add null check for user object
      try {
        // Create a reference to the storage location
        const storageRef = ref(storage, `profile-images/${user.uid}`);
    
        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, image);
    
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
    
        // Update the user's profile with the new photoURL
        await updateProfile(user, {
          photoURL: downloadURL,
        });
    
        // Reset the image state
        setImage(null);
    
        // Refresh the page to show the updated profile image
        window.location.reload();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  
  
  

  useEffect(() => {
    // Clear the file input value on page load
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const manageSubscription = () => {
    if (subscription) {
      goToBillingPortal();
    }
  };

  return (
    <div>
      <Head>
        <title>Account Settings - WeFlixx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`bg-[#000]`}>
        
        <Link href="/">
          <img
            src="/weflixxlogo.svg"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
            <div className="relative rounded-full w-12 h-12 overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile Image"
                  className="cursor-pointer object-cover w-full h-full"
                />
              ) : (
                <img
                  src="/adulticon.jpg"
                  alt=""
                  className="cursor-pointer object-cover w-full h-full"
                />
              )}
            </div>
          </Link>
       
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />

        <div className=" mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0 ">
  <h4 className="text-lg text-[gray]">Profile Image</h4>
  <div className="relative rounded-full w-12 h-12 overflow-hidden">
    {image ? (
      <img
        src={URL.createObjectURL(image)}
        alt="Selected Image"
        className="cursor-pointer object-cover w-full h-full"
      />
    ) : (
      <img
        src={user?.photoURL || "/adulticon.jpg"}
        alt="Profile Image"
        className="object-cover w-full h-full"
      />
    )}
  </div>
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    onChange={handleImageChange}
  />
  <button
    className="cursor-pointer text-blue-500 hover:underline"
    onClick={() => fileInputRef.current?.click()}
  >
    Change Profile Image
  </button>
  {image && (
    <button
      className="bg-red-700 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
      onClick={handleImageUpload}
    >
      Confirm
    </button>
  )}
</div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
          <a onClick={manageSubscription}>Change plan</a>
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
        <div className="relative lg:absolute bottom-0 left-0 w-full flex items-end justify-center"><Footer /></div>
      </main>
     
    </div>
    
  )
}

export default Account

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
}
