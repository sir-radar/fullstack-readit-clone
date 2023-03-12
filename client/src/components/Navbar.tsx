import Link from 'next/link'

import RedditLogo from '../images/reddit.svg';

const Navbar: React.FC = () => {
    return (
           <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
          <Link href="/">
            <a>
              <RedditLogo className="w-20 h-12 mr-2"/>
            </a>
          </Link>

          <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
            <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
            <input placeholder="Search" type="text" className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"/>
          </div>

          <div className="flex">
            <Link href="/login">
              <a className="w-32 py-1 mr-4 leading-5 hollow blue button">
                Log in
              </a>
            </Link>
            <Link href="/register">
              <a className="w-32 py-1 leading-5 blue button">
                Sign up
              </a>
            </Link>
          </div>
      </div>
    )
}

export default Navbar