import React from 'react'

function TopNav() {
  return (
    <div>
      <div className="mx-auto flex items-center justify-end border-b py-2 px-4 md:w-11/12">
        <nav>
          <ol className="flex justify-end space-x-16">
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
