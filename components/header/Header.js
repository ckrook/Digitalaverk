import React from 'react'
import TopNav from './TopNav'
import MainNav from './MainNav'

function Header() {
  return (
    <header>
      <div className="w-full bg-red-500 text-center text-sm font-semibold text-white">
        This is only a conceptual website. All the collections are currently
        launched on Rinkeby testnet.
      </div>
      <TopNav />
      <MainNav />
    </header>
  )
}

export default Header
