import { Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import Navbar from "~/components/nav-bar";
import { getUser } from "~/utils/session.server";

const Auth: React.FC = () => {
  const { user } = useLoaderData();

  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  return {
    user,
  };
};

export default Auth;
