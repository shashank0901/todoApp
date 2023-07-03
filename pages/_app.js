import { AuthUserProvider } from "@/firebase/auth";
import "@/styles/globals.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
      {/* and now we have wrapped this <Component {...pageProps} /> inside the Context component AuthUser Provider, due to this, whenever the user will login, its data will get stored in the context. */}
    </>
  );
}
