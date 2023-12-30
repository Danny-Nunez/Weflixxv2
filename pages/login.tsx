import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';

interface Inputs {
  email: string;
  password: string;
  profileImageUrl: string;
}

function Login() {
  const { signIn, signUp } = useAuth();
  const defaultProfileImage = '/adulticon.jpg';
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (isSigningUp) {
      await signUp(email, password, profileImageUrl || defaultProfileImage);
    } else {
      await signIn(email, password);
    }
  };

  const handleToggleForm = () => {
    setIsSigningUp((prevState) => !prevState);
    setProfileImageUrl(null);
  };

  return (
    <div>
      <div className="relative h-full flex w-screen flex-col bg-black md:items-center md:h-screen md:justify-center md:bg-transparent">
        <Head>
          <title>Best Streaming Movies | WeFlixx</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image
          src="/netflixbackdrop.jpeg"
          layout="fill"
          className="-z-10 !hidden opacity-60 sm:!inline"
          objectFit="cover"
        />

        <img
          src="/weflixxlogo.svg"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={150}
          height={150}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative mt-24 space-y-8 rounded bg-black/75 py-20 px-6 md:mt-0 md:max-w-md md:px-14"
        >
          <h1 className="text-4xl font-semibold">{isSigningUp ? 'Sign Up' : 'Sign In'}</h1>
          <Toaster />
          <div className="space-y-4">
            {isSigningUp && (
              <label className="inline-block w-full">
                Profile Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target && typeof event.target.result === 'string') {
                          setProfileImageUrl(event.target.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    } else {
                      // No image selected, set the default profile image
                      setProfileImageUrl(defaultProfileImage);
                    }
                  }}
                />
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    className="rounded-full w-20 h-20 mx-auto mt-4"
                    alt="Profile Image"
                  />
                ) : (
                  <img
                    src={defaultProfileImage}
                    className="rounded-full w-20 h-20 mx-auto mt-4"
                    alt="Default Profile Image"
                  />
                )}
              </label>
            )}

            <label className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className="input"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                type="password"
                placeholder="Password"
                className="input"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Your password must contain between 4 and 60 characters.
                </p>
              )}
            </label>
          </div>

          <button
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
            type="submit"
          >
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </button>

          <div className="text-[gray]">
            {isSigningUp ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-white hover:underline"
                  onClick={handleToggleForm}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                New to Weflixx?{' '}
                <button
                  type="button"
                  className="text-white hover:underline"
                  onClick={handleToggleForm}
                >
                  Sign up now
                </button>
                <p className="pt-5 text-sm">User:Demo@gmail.com Password:12345678</p>
              </>
            )}
            <div className="text-xs text-stone-600 pt-5 text-left">Creating an account is completely free. <p>For testing purposes, we've set Stripe in test mode.</p>  
       
        <p>Card number: 4242 4242 4242 4242</p>
        <p>Expiry date: 10/26</p>
        <p>CVV: 422</p>
        </div>
          </div>
        </form>
        <div className="h-100 pt-20 text-stone-300 text-sm">
       <span>WeFlixx is a Tv-Show & Movie streaming site with zero ads.</span>
      </div>
      </div>
      
    </div>
  );
}

export default Login;



