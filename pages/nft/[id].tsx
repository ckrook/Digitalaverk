import React, { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Link from 'next/link'
import { BigNumber, ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import '@fontsource/noto-sans/300.css'
import '@fontsource/playfair-display/400.css'
import Head from 'next/head'

interface Props {
  collection: Collection
}

function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [loading, setLoading] = useState<boolean>(true)
  const [priceInEth, setPriceInEth] = useState<string>()
  const nftDrop = useNFTDrop(collection.address)

  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  //--

  useEffect(() => {
    if (!nftDrop) return
    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()
      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setLoading(false)
    }
    fetchNFTDropData()
  }, [nftDrop])

  const mintNft = () => {
    if (!nftDrop || !address) return
    const quantity = 1
    setLoading(true)

    const notification = toast.loading('Minting...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt
        const claimedTokenId = tx[0].id
        const claimedNFT = await tx[0].data()
        toast('HOORAY... You Successfully minted!', {
          duration: 8000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
        console.log(receipt)
        console.log(claimedTokenId)
        console.log(claimedNFT)
      })
      .catch((err) => {
        console.log(err)
        toast('Whoops... Something went wrong', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" />
      {/* Left */}
      <div className="bg-gradient-to-tr from-gray-700 via-gray-900 to-black lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-8 py-2 lg:min-h-screen">
          <div className="rounded-2xl bg-gradient-to-r from-rose-100 to-teal-100 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection.mainImage).url()}
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h2>
            <p className="text-2xl font-light text-white">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <Link href={`/`}>
            <h1 className="w-52 cursor-pointer text-xl font-bold sm:w-80">
              Brand
            </h1>
          </Link>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign out' : 'Sign in'}
          </button>
        </header>
        <hr className="my-2 border" />
        {address && (
          <p className="text-right text-sm text-gray-500">
            Your logged in with wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        {/* Content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.previewImage).url()}
            alt=""
          />
          <h1 className="text-3xl font-bold text-gray-800 lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          {loading ? (
            <p className=" pt-2 text-lg text-green-500">
              Loading Supply Count....
            </p>
          ) : (
            <p className="pt-2 text-lg text-green-500">
              {claimedSupply} / {totalSupply?.toString()} NFTs claimed
            </p>
          )}
          {loading && (
            <img
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt=""
            />
          )}
        </div>
        {/* Mint Button */}
        <button
          onClick={mintNft}
          disabled={
            loading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className="h-16 w-full rounded-full bg-rose-500 font-bold text-white disabled:bg-gray-400"
        >
          {loading ? (
            <>Loading</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
          ) : !address ? (
            <>Sign in to Mint</>
          ) : (
            <span className="font-bold">Mint NFT for ({priceInEth} ETH)</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
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

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      collection,
    },
  }
}
