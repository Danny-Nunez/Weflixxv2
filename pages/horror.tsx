import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import HorrorBanner from '../components/HorrorBanner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import HorrorGrid from '../components/HorrorGrid'
import useSubscription from '../hooks/useSubscription'
import { Movie } from '../typings'
import requests from '../utils/requests'
import { Product } from '@stripe/firestore-stripe-payments';

interface Props {
  netflixOriginals: Movie[];
  products: Product[];
  title: string;
}

const HorrorList = ({ netflixOriginals, products }: Props) => {
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
        <title>Horror Genre- WeFlixx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <main className="backgroundMaster relative pl-4 lg:space-y-24 lg:pl-16">
        <HorrorBanner />
        <section className="md:space-y-24">
          <HorrorGrid title="Horror" />
        </section>
       {/* <div className="  items-end justify-center"><Footer /></div> */}
      </main>
      {showModal && <Modal openModal={() => {}} closeModal={() => {}} />}
    </div>
  )
}

export default HorrorList

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

