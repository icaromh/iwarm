// https://developers.notion.com/docs/create-a-notion-integration#additional-resources
// https://developers.notion.com/reference/database

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Notion from "./services/notion";
import { transformReqToPlace } from "./transformers/place";

const NotionClient = new Notion();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const place = transformReqToPlace(req.body);

  NotionClient.checkIn(place)
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
}
