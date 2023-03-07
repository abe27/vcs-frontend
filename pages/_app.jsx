import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Noto_Sans_Thai } from "@next/font/google";
const fonts = Noto_Sans_Thai({ subsets: ["thai"] });

const MicroApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <section className={fonts.className}>
      <SessionProvider session={session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </section>
  );
};

export default MicroApp;
