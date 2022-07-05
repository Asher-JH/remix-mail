import { Outlet, LiveReload, Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/tailwind.css";

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
        <title>{title || "Remix Blog"}</title>
        {/* Need to manual add, using Remix linksFunction not working */}
        <link rel="stylesheet" href={styles} />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
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
      </nav>

      <div className="">{children}</div>
    </>
  );
}

// Not working
export const links: LinksFunction = () => {
  console.log(styles);
  return [{ rel: "stylesheet", href: styles }];
};
