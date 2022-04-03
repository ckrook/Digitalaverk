import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import '@fontsource/noto-sans/300.css'
import '@fontsource/playfair-display/400.css'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="mx-auto flex min-h-screen flex-col py-10 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="mx-auto flex w-11/12 justify-between">
          <div>social</div>
          <h1 className="mb-10 text-4xl font-bold">Brand</h1>
          <div>
            <button>Contact</button>
          </div>
        </div>
      </header>

      <main className="">
        <section className="bg-slate-100 p-10 shadow-xl shadow-slate-200/20">
          <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
                  <img
                    className="h-96 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className="p-5">
                    <h3 className="text-3xl">{collection.title}</h3>
                    <p className="mt-2 text-sm text-gray-400">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="my-20 flex">
            <div className="flex-1">
              <h2 className="text-5xl">
                Samlarföremål för den digitala åldern
              </h2>
            </div>
            <div className="flex-1">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                excepturi iure incidunt quidem fugit ipsa eligendi aspernatur
                facilis, earum dolorem, repellat, officiis ab suscipit adipisci?
                Consequatur perspiciatis provident quas voluptatum.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="my-20 flex space-x-4">
            <div className="flex-1 rounded-3xl bg-green-300 p-10">
              <h2 className="mb-4 text-4xl">Vårt miljöavtryck spelar roll</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
            <div className="flex-1 rounded-3xl bg-green-300 p-10">
              <h2 className="mb-4 text-4xl">En ny era av konstnärer</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusamus officia dignissimos, explicabo, a cumque temporibus
              </p>
            </div>
          </div>
        </section>
      </main>
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
