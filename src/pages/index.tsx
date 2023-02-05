import { type NextPage } from "next";
import Head from "next/head";
import { Map } from "../components/Map";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CruzLine - Hop on the Santa Cruz Metro!</title>
        <meta name="description" content="Cruzline - Santa Cruz Metro" />
        <link rel="icon" href="/favicon.co" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Map />
      </main>
    </>
  );
};


export default Home;
