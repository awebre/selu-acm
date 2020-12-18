import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { useState } from "react";
import classNames from "classnames";
import Button from "./Button";

function MainLayout({ children }) {
  const [session, loading] = useSession();

  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center items-center">
      <Head>
        <title>SELU ACM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}

function Main({ className, children, justify = "center" }) {
  return (
    <main
      className={classNames(
        className,
        `px-20 py-5 flex flex-1 flex-col justify-${justify} items-center`
      )}
    >
      {children}
    </main>
  );
}

function Banner({ bubbleText, onClick, children }) {
  return (
    <div className="w-full bg-green-900 text-center py-4 lg:px-4">
      <div
        className="p-2 bg-green-800 items-center text-green-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        {bubbleText && (
          <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            {bubbleText}
          </span>
        )}

        <span className="font-semibold mr-2 text-left flex-auto">
          {children}
        </span>
        <button className="hover:text-green-300" onClick={onClick}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

function Drawer() {
  const [isSigningOut, setSigningOut] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [session] = useSession();

  return isDrawerOpen ? (
    <footer
      className={classNames(
        "w-full h-20 transition-all border border-b-0 flex justify-center items-center bg-gray-100 shadow-inner sticky bottom-0"
      )}
    >
      <Button
        color="gray"
        margin="m-0"
        className="absolute -top-10 right-3 rounded-b-none bg-gray-100 shadow-inner"
        onClick={() => setDrawerOpen(!isDrawerOpen)}
      >
        <i className="fas fa-chevron-down"></i>
      </Button>
      {!session && (
        <>
          <Button onClick={signIn}>Officer Sign In</Button>
        </>
      )}
      {session && (
        <>
          <p className="mr-5">Signed in as {session.user.email}</p>
          <Button
            className="rounded"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing Out..." : "Sign out"}
          </Button>
        </>
      )}
    </footer>
  ) : (
    <div className="sticky w-full bottom-0">
      <Button
        color="gray"
        margin="m-0"
        className="absolute bottom-0 right-3 rounded-b-none bg-gray-100 shadow-inner"
        onClick={() => setDrawerOpen(!isDrawerOpen)}
      >
        <i className="fas fa-chevron-up"></i>
      </Button>
    </div>
  );

  function handleSignOut() {
    setSigningOut(true);
    signOut();
  }
}

MainLayout.Main = Main;
MainLayout.Banner = Banner;
MainLayout.Drawer = Drawer;

export default MainLayout;
