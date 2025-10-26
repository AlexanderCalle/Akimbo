
const Newsletter = () => {
  return (
    <section className="flex flex-col gap-4 items-center my-20 w-full">
      <h2 className="text-2xl font-medium">Akimbo newletter</h2>
      <iframe 
        title="newsletter"
        src="https://akimbomagazine.substack.com/embed" 
        className="w-full h-fit bg-akimbo-dark-900"
        frameBorder="0" 
        scrolling="no" 
      />
    </section>
  )
}

export default Newsletter