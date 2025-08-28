import SearchForm from "../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;

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
    </>
  );
}
