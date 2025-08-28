"use server";

import { writeClient } from "@/sanity/lib/write-client";

export async function incrementViews(id: string, currentViews: number) {
  await writeClient
    .patch(id)
    .set({ views: currentViews + 1 })
    .commit();
}
