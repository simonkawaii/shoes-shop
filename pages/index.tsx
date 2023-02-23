import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Content from '../components/content'
import Header from '../components/header'
import Sidebar from '../components/sidebar'


const Home: NextPage = () => {
  const [mobileWidth, setMoblieWidth] = useState<number>(0)
  
  useEffect(() => {
    setMoblieWidth(window.innerWidth)
    // handle width change to present correct view mobile or desktop
    const handleWindowWidthChange = () => {
      setMoblieWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowWidthChange);
    return () => window.removeEventListener("resize", handleWindowWidthChange);
  }, []);

  return (
    

    <div className="flex min-h-screen flex-col" >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*header*/}
      
      <Header />
      <div className='flex flex-column'>
      {/*shopping-cart-sidebar*/}
      { mobileWidth > 768 && <Sidebar />}
      {/*content-list*/}
      <Content /> 
      </div>

      {/* mobile cart */}

    </div>
  )
}

export default Home
