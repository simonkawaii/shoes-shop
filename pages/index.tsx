import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*header*/}
      <Header />
      <Sidebar />
        
      {/*shopping-cart-sidebar*/}
      {/*content-list*/}

    </div>
  )
}

export default Home
