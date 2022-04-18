import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import '@fontsource/noto-sans/100.css'
import '@fontsource/playfair-display/400.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'

import Header from '../components/header/Header'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col 2xl:px-0">
      <Head>
        <title>Digitalverket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">
        <section className="bg-gradient-to-r from-cyan-500 to-blue-500 py-[95px] px-4 text-center">
          <h2 className="text-5xl text-white">
            Samlarföremål för den digitala åldern
          </h2>
        </section>

        <section>
          <div className="my-14 flex flex-col px-8 md:my-[111px] md:flex-row md:space-x-8 lg:px-24">
            <div className="flex-1">
              <h3 className="mb-8 text-4xl lg:text-6xl">
                Samlarföremål <br />
                för den digitala åldern
              </h3>
            </div>
            <div className="flex-1">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                excepturi iure incidunt quidem fugit ipsa eligendi aspernatur
                facilis, earum dolorem, repellat, officiis ab suscipit adipisci?
                Consequatur perspiciatis provident quas voluptatum. excepturi
                iure incidunt quidem fugit ipsa eligendi
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="my-14 flex flex-col space-y-8 space-x-0 px-8 md:my-24 md:flex-row md:space-x-8 md:space-y-0 lg:px-24">
            <div className="flex-1 rounded-xl bg-orange-700 p-10">
              <h2 className="mb-4 text-4xl text-white">
                Vårt miljöavtryck spelar roll
              </h2>
              <p className="text-gray-50">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-slate-700 p-10">
              <h2 className="mb-4 text-4xl text-white">
                En ny era av konstnärer
              </h2>
              <p className="text-gray-50">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
          </div>
        </section>
        <section className="bg-slate-100 p-10 px-8 py-14 shadow-xl shadow-slate-200/20 md:py-24 lg:px-24">
          <h2 className="mb-8 text-4xl md:text-5xl">
            Hitta din favorit kollektion
          </h2>
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
          <div className="flex flex-col bg-stone-100 py-14 px-8 md:flex-row md:py-24 lg:px-24">
            <div className="flex-1">
              <h2 className="mb-4 text-3xl lg:text-7xl">
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
