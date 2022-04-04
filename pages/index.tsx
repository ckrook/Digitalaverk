import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import '@fontsource/noto-sans/100.css'
import '@fontsource/playfair-display/400.css'
import { AiOutlinePlus, AiOutlineTwitter } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { SiMonkeytie } from 'react-icons/si'
import { useState } from 'react'
interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col  2xl:px-0">
      <Head>
        <title>Digitalverket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="mx-auto flex w-11/12 items-center justify-between border-b py-10">
          <a href="/" className="flex items-center ">
            {/* <p className="text-blue-500">Follow us!</p> */}
            <AiOutlineTwitter className="h-8 w-8 text-blue-500" />
          </a>
          <div className="flex items-center">
            <SiMonkeytie className="mr-2 text-4xl" />
            <h1 className="text-4xl font-bold">Digitalaverk</h1>
          </div>
          <div>
            <button onClick={() => toggleMenu()}>
              <GiHamburgerMenu className="cursor-pointer text-3xl" />
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav>
            <ul className="flex justify-center space-x-24 py-5">
              <li>Hem</li>
              <li>Konstnärer</li>
              <li>Kollektioner</li>
              <li>Lorem</li>
              <li>Kontakt</li>
              <li>FAQ</li>
            </ul>
          </nav>
        ) : (
          <></>
        )}
      </header>
      <main className="">
        <section className="bg-slate-800 py-40 text-center">
          <h2 className="text-4xl text-white">
            Välkommen till Sveriges största NFT marknadsplats
          </h2>
        </section>

        <section>
          <div className="my-24 flex flex-col px-24 md:flex-row md:space-x-8">
            <div className="flex-1">
              <h2 className="mb-8 text-6xl">
                Samlarföremål <br />
                för den digitala åldern
              </h2>
            </div>
            <div className="flex-1">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                excepturi iure incidunt quidem fugit ipsa eligendi aspernatur
                facilis, earum dolorem, repellat, officiis ab suscipit adipisci?
                Consequatur perspiciatis provident quas voluptatum. excepturi
                iure incidunt quidem fugit ipsa eligendi aspernaturexcepturi
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="my-24 flex flex-col space-y-8 space-x-0 px-24 md:flex-row md:space-x-8 md:space-y-0">
            <div className="flex-1 rounded-3xl bg-orange-100 p-10">
              <h2 className="mb-4 text-4xl text-stone-600">
                Vårt miljöavtryck spelar roll
              </h2>
              <p className="text-stone-500">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
            <div className="flex-1 rounded-3xl bg-stone-400 p-10">
              <h2 className="mb-4 text-4xl text-orange-100">
                En ny era av konstnärer
              </h2>
              <p className="text-orange-200">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
          </div>
        </section>
        <section className="bg-slate-100 p-10 px-24 py-24 shadow-xl shadow-slate-200/20">
          <h2 className="mb-8 text-5xl">Hitta din favorit kollektion</h2>
          <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="flex scale-90 cursor-pointer flex-col items-center rounded-3xl bg-gray-50 p-10 transition-all duration-200 hover:scale-95">
                  <img
                    className="mb-5 h-96 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className=" text-center">
                    <h3 className="mb-4 text-3xl">{collection.title}</h3>
                    <p className="text-gray-400">{collection.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="flex flex-col bg-stone-100 py-24 px-24 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-4 text-7xl">
                Dina frågor,
                <br /> <i>besvarade</i>
              </h2>
            </div>
            <div className="flex-1">
              <ul>
                <li className="flex justify-between border-b py-5">
                  <p>Vad är en NFT?</p>
                  <AiOutlinePlus className="h-10 w-10 text-gray-400" />
                </li>
                <li className="flex justify-between border-b py-5">
                  <p>Vem står bakom Digitalverket?</p>
                  <AiOutlinePlus className="h-10 w-10 text-gray-400" />
                </li>
                <li className="flex justify-between border-b py-5">
                  <p>Vad är Ethereum?</p>
                  <AiOutlinePlus className="h-10 w-10 text-gray-400" />
                </li>
                <li className="flex justify-between border-b py-5">
                  <p>Hur mintar jag en NFT?</p>
                  <AiOutlinePlus className="h-10 w-10 text-gray-400" />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="p-4 text-center text-gray-700">
          © 2021 Copyright:{' '}
          <a className="text-gray-800" href="https://tailwind-elements.com/">
            Charles Krook
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{
    asset
  },
  previewImage{
    asset
  },
  slug{
    current
  },
  creator->{
    _id,
    name,
    address,
    slug{
    current
  },
  },
  }`

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
