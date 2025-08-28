"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { incrementViews } from "@/app/actions/incrementViews";
import Ping from "./Ping";

export default function View({ id }: { id: string }) {
  const [totalViews, setTotalViews] = useState<number>(0);

  useEffect(() => {
    async function fetchAndUpdateViews() {
      const { views } = await client.withConfig({ useCdn: false }).fetch(
        STARTUPS_VIEWS_QUERY,
        { id }
      );
      setTotalViews(views);
      await incrementViews(id, views); // server action
    }

    fetchAndUpdateViews();
  }, [id]);

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-pink-100 px-4 py-2 rounded-lg capitalize">
        <span className="font-black">views: {totalViews}</span>
      </p>
    </div>
  );
}
