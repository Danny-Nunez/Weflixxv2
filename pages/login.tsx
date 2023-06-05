import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState(false)
  const { signIn, signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

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
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
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
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Weflixx?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
      </div>
      <div className="bg-black h-100 grid grid-cols-1 pt-8 md:grid-cols-2">
      {/* <div className="m-auto"><img
        src="/device-pile.png"
        className="m-0"
        width={540}
        height={405}
      />
      </div> */}
          <div className="flex justify-center items-center">
      <div className="relative w-540 h-405">
        <video className="w-6/12 h-full object-cover pb-40 pt-5 pl-4 ml-20 md:w-8/12" autoPlay loop muted>
          <source src="/video-devices.m4v" type="video/mp4" />
        </video>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/device-pile.png"
          alt="Overlay"
        />
      </div>
    </div>

      <div className=" m-auto pt-8 p-5 md:ml-0 md:pl-0">
        <h1 className="font-black text-4xl pb-8 md:text-5xl">Watch everywhere</h1>
        <p>Stream unlimited movies on your phone, tablet, laptop, and TV.</p>
        <p className="font-bold ">The WeFixx you love for just $2.99 a month.</p>
        </div>
      </div>
    </div>
    
   
  )
}

export default Login
