import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

function NFTDropPage() {
  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  //--
  console.log(address)

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-8 py-2 lg:min-h-screen">
          <div className="rounded-2xl bg-gradient-to-r from-rose-100 to-teal-100 p-4">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://links.papareact.com/8sg"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">
              Antisocial Coding Club
            </h1>
            <h2 className="text-2xl font-light text-white">
              The collection of anti-social coding club is a cool community of
              coders who is very anti social.
            </h2>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            The{' '}
            <span className="font-bold underline decoration-pink-500/50">
              Pixel Lab
            </span>{' '}
            NFT Market Place
          </h1>
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
            src="https://links.papareact.com/bdy"
            alt=""
          />
          <h1 className="text-3xl font-bold text-gray-800 lg:text-5xl lg:font-extrabold">
            The Antisocial Coding Club | NFT
          </h1>
          <p className="pt-2 text-lg text-green-500">13 / 21 NFTs claimed</p>
        </div>
        {/* Mint Button */}
        <button className="h-16 w-full rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 font-bold text-white">
          Mint NFT (0.01ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage
