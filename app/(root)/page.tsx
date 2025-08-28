import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../components/SearchForm";
import StartupCard, { StartupCardType } from "../components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;

  const session = await auth();

  const params = { search:query || null};
  const { data:posts } = await sanityFetch({query:STARTUPS_QUERY, params})

  return (
    <>

      <section className="w-full bg-pink-600 min-h-[530px] flex justify-center items-center flex-col py-10 px-6">
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white
          sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
            Pitch your Startup, <br /> Connect With Enterprenuers 
        </h1>
        <p className="font-medium text-[20px] text-white text-center break-words max-w-3xl">
          Submit Ideas, Vote on Pitches, Get noticed in Virtual Competitions.
        </p>
        <SearchForm
          query={query}  
        />
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="font-semibold text-[26px] text-black">
          {query? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length> 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ): (
            <p className="text-black-100 text-sm font-normal">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
