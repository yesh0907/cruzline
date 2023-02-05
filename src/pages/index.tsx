import { type Route } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Map } from "../components/Map";
import { Menu } from "../components/Menu";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const [routes, setRoutes] = useState<Route[] | undefined>(undefined);
  api.route.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setRoutes(data);
    }
  });

  return (
    <>
      <Head>
        <title>CruzLine - Hop on the Santa Cruz Metro!</title>
        <meta name="description" content="Cruzline - Santa Cruz Metro" />
        <link rel="icon" href="/favicon.co" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Map routes={routes} />
        <Menu routes={routes} />
      </main>
    </>
  );
};


export default Home;
