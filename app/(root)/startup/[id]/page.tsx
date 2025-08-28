import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/app/components/ui/skeleton";
import View from "@/app/components/View";

const md = markdownit()

export const experimental_ppr = true

const Page = async ({ params }: {params: Promise<{id:string}>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});

    console.log(JSON.stringify(post));

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");

    return(
        <>
            <section className="w-full bg-pink-600 min-h-[230px] flex justify-center items-center flex-col py-10 px-6">
                <p className="bg-yellow-400 px-6 py-3 font-work-sans font-bold rounded-sm uppercase ">
                    {new Date(post._createdAt).toLocaleDateString()}
                </p>
                <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">{post.title}</h1>
                <p className="font-medium text-[20px] text-white max-w-5xl text-center break-words">{post.description}</p>
            </section>
            <section className="px-6 py-10 max-w-7xl mx-auto">
                <img 
                    src={post.author?.image} 
                    alt="thumbnail" 
                    className="w-full h-auto rounded-xl" 
                />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author?._id}`}>
                            <img
                                src={post.imageUrl}
                                alt="placeholder"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />

                            <div>
                                <p className="font-medium text-[20px] text-black">{post.author.name}</p>
                                <p className="font-medium text-[16px] text-black">{post.author.username}</p>
                            </div>
                        </Link>

                        <p className="font-medium text-[16px] bg-gray-100 px-4 py-2 rounded-full">{post.category}</p>
                    </div>

                    <h3 className="text-[30px] font-bold text-black">
                        Pitch Details
                    </h3>
                    {parsedContent ? (
                        <article
                        className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ):(
                        <p className="text-black text-sm font-normal">
                            No details provided.
                        </p>
                    )}
                </div>

                <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

                <Suspense fallback={<Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3"/>}>
                    <View id={id} />
                </Suspense>
            </section>
        </>

    ) 
};

export default Page;