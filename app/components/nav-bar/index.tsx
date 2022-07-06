import { Link } from "@remix-run/react";

import type { User } from "@prisma/client";

type Props = {
  user?: User;
};

const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <header className="bg-gray-900">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link to="/">Home</Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-4">
              {!user ? (
                <>
                  <div className="sm:gap-4 sm:flex">
                    <Link
                      className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-md shadow"
                      to="/auth/login"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="sm:gap-4 sm:flex">
                    <Link
                      className="px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-md"
                      to="/auth/register"
                    >
                      Register
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="sm:gap-4 sm:flex">
                    <Link
                      className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-md shadow"
                      to="/auth/logout"
                    >
                      Logout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
