import useSWR from "swr";
import Head from "next/head";

import PlacesList from "../components/placesList";
import AppLayout, {
  AppLayoutContent,
  AppLayoutHeader,
} from "../components/layout/app";
import LoadingMessage from "../components/loading";
import EmptyWidget from "../components/empyWidget";
import useGeoLocation from "../hooks/useGeoLocation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/places", fetcher);
  const { hasLocation } = useGeoLocation()

  const isEmpty = !isLoading && data?.length === 0
  const hasPlaces = !isLoading && data

  return (
    <>
      <Head>
        <title>Places</title>
      </Head>
      <AppLayout>
        <AppLayoutHeader title="You have been here"></AppLayoutHeader>
        <AppLayoutContent>
          {isLoading && <LoadingMessage />}
          {isEmpty && <EmptyWidget />}
          {hasPlaces && <PlacesList places={data} />}
        </AppLayoutContent>
      </AppLayout>
    </>
  );
}
