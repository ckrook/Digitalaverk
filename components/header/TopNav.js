import React from 'react'

function TopNav() {
  return (
    <div>
      <div className="block flex justify-center py-4 sm:hidden">
        <h1 className="block text-2xl sm:hidden">Krooks</h1>
      </div>
      <div className="mx-auto flex items-center justify-center border-b py-2 px-4 sm:justify-end md:w-11/12">
        <nav>
          <ol className="flex justify-end space-x-6 sm:space-x-12 md:space-x-16">
            <li>
              <a className="sm-nav" href="#">
                Logga in
              </a>
            </li>
            <li>
              <a className="sm-nav" href="#">
                Om oss
              </a>
            </li>
            <li>
              <a className="sm-nav" href="#">
                Kontakt
              </a>
            </li>
            <li>
              <a className="sm-nav" href="#">
                Faq
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default TopNav
