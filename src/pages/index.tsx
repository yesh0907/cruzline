import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "Cruzhacks!" });

  return (
    <>
      <Head>
        <title>Cruzline - Hop on the Santa Cruz Metro!</title>
        <meta name="description" content="Cruzline - Santa Cruz Metro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-l from-[#ffb88e] to-[#ea5753]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Cruz <span className="text-[#e83636]">Line</span>
          </h1>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
