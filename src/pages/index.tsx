import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Todos from "../components/Todos";
import CreateTodo from "../components/CreateTodo";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Full Stack Todo App</title>
        <meta name="description" content="Full Stack Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            FullStack <span className="text-[hsl(280,100%,70%)]">Todo</span> App
          </h1>
          {sessionData && (
            <div className="grid grid-cols-1 gap-4 md:gap-8 w-10/12">
              <div className="flex flex-col gap-4 rounded-xl bg-white p-4 text-[hsl(280,100%,70%)]">
                <h3 className="text-xl font-bold py-4">Todos</h3>
                <Todos />
                <CreateTodo />
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {sessionData && (
                <span>Logged in as {sessionData.user?.email}</span>
              )}
            </p>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;