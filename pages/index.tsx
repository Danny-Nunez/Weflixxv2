import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import BannerWeflixx from '../components/BannerWeflixx'
// import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Plans from '../components/Plans'
import Row from '../components/Row'
import TrendSlide from '../components/TrendSlide'
import LatestSlide from '../components/LatestSlide'
import FantasySlide from '../components/FantasySlide'
import RealitySlide from '../components/RealitySlide'
import AnimationSlide from '../components/AnimationSlide'
import ScienceFictionSlide from '../components/ScienceFictionSlide'
import HorrorSlide from '../components/HorrorSlide'
import ActionSlide from '../components/ActionSlide'
import DocumentarySlide from '../components/DocumentarySlide'
import ComedySlide from '../components/ComedySlide'
import LatestTvSlide from '../components/LatestTvSlide'
import ComingSoonSlide from '../components/ComingSoonSlide'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import useSubscription from '../hooks/useSubscription'
import payments from '../lib/stripe'
import { Movie } from '../typings'
import requests from '../utils/requests'

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

const Home = ({
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

      <Header />
      <main className="backgroundMaster relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* <Banner netflixOriginals={netflixOriginals} /> */}
        <BannerWeflixx />
        <section className="md:space-y-24">
        <div className="pt-20 lg:pt-20"><TrendSlide title="Trending Now" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><LatestSlide title="Latest Movies" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><LatestTvSlide title="Latest TvShows" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><RealitySlide title="Exciting Reality Tv" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><FantasySlide title="Fantasies" /></div>
         
          <div className="pt-40 lg:pt-20 md:pt-20"><ComedySlide title="Comedies" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><DocumentarySlide title="Documentaries" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><HorrorSlide title="Horror" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><ScienceFictionSlide title="Science Fiction" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><ActionSlide title="Action" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><AnimationSlide title="Animation" /></div>
          <div className="pt-40 lg:pt-20 md:pt-20"><ComingSoonSlide title="Trending on IMDB" /></div>
          {/* <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} /> */}
          {/* My List Component */}
          <div className="pt-40 lg:pt-20 md:pt-20">{list.length > 0 && <Row title="My List" movies={list} />}</div>
          {/* <Row title="Comedies" movies={comedyMovies} /> */}
          {/* <Row title="Scary Movies" movies={horrorMovies} /> */}
          {/* <Row title="Romance Movies" movies={romanceMovies} /> */}
          {/* <Row title="Documentaries" movies={documentaries} /> */}
        </section>
       <div className="mt-20"><Footer /></div> 
      </main>
      
      {showModal && <Modal openModal={() => {}} closeModal={() => {}} />}
    </div>
  )
}

export default Home

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
