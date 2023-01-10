import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
        />
        <Script src="/register-sw.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
