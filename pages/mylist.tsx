import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import BannerWeflixx from '../components/BannerWeflixx'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import useSubscription from '../hooks/useSubscription'
import { Movie } from '../typings'
import requests from '../utils/requests'
import { Product } from '@stripe/firestore-stripe-payments';

interface Props {
  netflixOriginals: Movie[]
  products: Product[]
}

const MyList = ({ netflixOriginals, products }: Props) => {
  const { loading, user } = useAuth()
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

  if (loading) return null

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>My List - WeFlixx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <main className="backgroundMaster relative pl-4 lg:space-y-24 lg:pl-16">
        <BannerWeflixx />
        <section className="md:space-y-24">
          {/* My List Component */}
          {list.length > 0 && <Row title="My List" movies={list} />}
        </section>
       <div className="fixed lg:absolute bottom-0 left-0 w-full flex items-end justify-center"><Footer /></div>
      </main>
      {showModal && <Modal openModal={() => {}} closeModal={() => {}} />}
    </div>
  )
}

export default MyList

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
    },
  }
}

