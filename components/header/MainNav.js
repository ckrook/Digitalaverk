import React from 'react'

function MainNav() {
  return (
    <div>
      <div className="mx-auto flex items-center justify-between border-b py-3 px-4 md:w-11/12">
        <div className="flex items-center justify-around space-x-16">
          <h1 className=" flex-1 text-2xl ">Krooks</h1>
          <nav className="flex-1">
            <ol className="flex space-x-24 text-sm font-medium uppercase tracking-widest">
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
          className="rounded-md border border-gray-300 bg-[#fafaf9] p-1"
          type="text"
          placeholder="Hello world"
        />
      </div>
    </div>
  )
}

export default MainNav
