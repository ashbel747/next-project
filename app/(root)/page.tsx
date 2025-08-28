import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: 'Yesterday',
    views: 55,
    author: { _id:1, name: 'Ashbel' },
    _id: 1,
    description: "This is a description",
    image: "https://th.bing.com/th/id/R.29ca60c0a4eb7227b6588190a3857ca4?rik=xCcSE2Ac4OTbGw&pid=ImgRaw&r=0",
    category: "Robots",
    title: "We Robots"
  },
];

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
    </>
  );
}
