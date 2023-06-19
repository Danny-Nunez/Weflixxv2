import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Headerkids from '../components/Headerkids'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import useSubscription from '../hooks/useSubscription'
import payments from '../lib/stripe'
import { Movie } from '../typings'
import requests from '../utils/requestskids'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
}

const Kids = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) => {
  const { loading, user } = useAuth()
  const showModal = useRecoilValue(modalState)
  const subscription = useSubscription(user)
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid)

  if (loading || subscription === null) return null

  if (!subscription) return <Plans products={products} />

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Best Streaming Movies - WeFlixx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Headerkids />
      <main className="backgroundMaster relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Animated" movies={horrorMovies} />
          <Row title="Fantasy" movies={topRated} />
          <Row title="Family" movies={actionMovies} />
          {/* My List Component */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Comedies" movies={comedyMovies} />
          
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Adventure" movies={documentaries} />
        </section>
        <Footer />
      </main>
      {showModal && <Modal openModal={() => {}} closeModal={() => {}} />}
    </div>
  )
}

export default Kids

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  }
}
