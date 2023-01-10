// https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API/Using_the_Permissions_API

/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState } from "react";

import AppLayout, {
  AppLayoutContent,
  AppLayoutHeader,
} from "../components/layout/app";
import Button from "../components/button";

export default function CheckInPage() {
  const [msg, setMsg] = useState<string>("");

  function enableGeolocation() {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result: any) {
          setMsg(JSON.stringify(result.state, null, 2));
          const permission = result.state;

          if (permission === "granted" || permission === "prompt") {
          }
        });
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMsg(JSON.stringify(pos));
      },
      function (err) {
        console.log(err);
      }
    );
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <AppLayout>
        <AppLayoutHeader title={"Settings"} />
        <AppLayoutContent>
          <div>
            <span>Geolocation: </span>
            <Button onClick={enableGeolocation}>Enable Geolocation</Button>

            <pre>{msg}</pre>
          </div>
        </AppLayoutContent>
      </AppLayout>
    </>
  );
}
