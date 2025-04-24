import React from 'react'

const Newsletter = () => {
  return (
    <section className="w-full my-20 flex flex-col gap-4 items-center">
      <h2 className="text-2xl font-medium">Akimbo newletter</h2>
      <iframe 
        title="newsletter"
        src="https://akimbomagazine.substack.com/embed" 
        className="w-full h-fit bg-akimbo-dark-900"
        frameborder="0" 
        scrolling="no" 
      />
    </section>
  )
}

export default Newsletter