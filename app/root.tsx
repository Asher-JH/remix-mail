import {
  Outlet,
  LiveReload,
  Link,
  Links,
  Meta,
  useLoaderData,
} from "@remix-run/react";
import type {
  LinksFunction,
  MetaFunction,
  ErrorBoundaryComponent,
  LoaderFunction,
} from "@remix-run/node";

import { getUser } from "./utils/session.server";
import styles from "~/styles/tailwind.css";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const data = {
    user,
  };

  return data;
};

export default function App() {
  return (
    <Document title="My Remix Blog">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <title>{title || "Remix Blog"}</title>
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData();

  return (
    <>
      <nav>
        <Link to="/" className="text-3xl text-orange-50">
          Remix
        </Link>

        <ul className="">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        {user ? (
          <li>
            <form action="/auth/logout" method="POST">
              <button type="submit">Logout</button>
            </form>
          </li>
        ) : (
          <div />
        )}
      </nav>

      <div className="">{children}</div>
    </>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.log(error);
  return (
    <Document>
      <div>Error - {error.message}</div>;
    </Document>
  );
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  const description = "A cool app";
  const keywords = "remix, react, javascript";

  return {
    description,
    keywords,
  };
};
