// https://developers.notion.com/docs/create-a-notion-integration#additional-resources
// https://developers.notion.com/reference/database

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Notion from "./services/notion";
import transformPlace, { PlaceResponse } from "./transformers/place";

const NotionClient = new Notion();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlaceResponse[]>
) {
  NotionClient.getPlaces().then((response: any) => {
    res.status(200).json(transformPlace(response.results));
  });
}
