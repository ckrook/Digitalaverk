import React from 'react'

function MainNav() {
  return (
    <div>
      <div className="mx-auto flex items-center justify-between border-b py-3 px-4 md:w-11/12">
        <div className="flex w-full items-center justify-center space-x-0 sm:justify-between md:justify-start md:space-x-16">
          <h1 className="hidden text-2xl sm:block">Krooks</h1>
          <nav>
            <ol className="flex space-x-8 text-sm font-medium uppercase tracking-widest md:space-x-12 md:space-x-24">
              <li>
                <a href="#">Kollektioner</a>
              </li>
              <li>
                <a href="#">Berättelser</a>
              </li>
              <li>
                <a href="#">Sälj</a>
              </li>
            </ol>
          </nav>
        </div>
        <input
          className="hidden rounded-md border border-gray-300 bg-[#fafaf9] p-1 lg:block"
          type="text"
          placeholder="Hello world"
        />
      </div>
    </div>
  )
}

export default MainNav
