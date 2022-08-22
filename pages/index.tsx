import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authWithGoogle, selectUser } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { useRouter } from "next/router";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div style={{ position: 'relative' }} >
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: '100vh' }} >

        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>HOMEPAGE</h1>
        <button onClick={() => router.push("/auth/login")}>Button</button>
        <Link href={"auth/login"}> AUTHH</Link>
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span >
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
