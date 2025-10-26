import Newsletter from '@components/Newsletter'
import CtaPosts from '@components/CTA/CtaPosts'
import RecentPosts from '@components/Articles/RecentPosts'
import HeroSection from '@components/HeroSection'
import React from 'react'

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen text-akimbo-dark-900">
      <HeroSection />
      <div className="flex flex-col flex-grow gap-10 p-5 mx-auto md:w-10/12" >
        <CtaPosts />
        <RecentPosts />
        <div className="flex flex-col gap-6 justify-start items-start my-4 w-full lg:flex-row">
          <section className="flex flex-col items-start w-full lg:w-3/6">
            <h2 className="mb-4 text-2xl font-medium">community</h2>
            <p className="mb-2 lg:text-start">
              Akimbo is more than just an online publishing platform, it’s a vibrant community. Passionate readers, writers, critics, practitioners and artists, mostly based in Brussels, wanted to create an unpretentious, open space for young creatives to meet and exchange ideas.
            </p>
            <h3 className="mb-2 text-lg font-medium">want to join?</h3>
            <p className="mb-2 lg:text-start">
              We would love to meet other young, like-minded writers or practitioners.
              Send us an email with your idea or even a simple introduction. Hope to hear from you!
            </p>
            <a className="px-3 py-2 font-sans bg-akimbo-dark-900 text-akimbo-light" href="mailto:akimbo-mag@outlook.com">
              contact us
            </a>
          </section>
          <section className="flex flex-col items-start w-full lg:w-3/6">
            <h2 className="mb-4 text-2xl font-medium">about akimbo</h2>
            <p>
              Akimbo is an online magazine and platform aiming to bring together <b>A</b>rt, <b>B</b>ooks, and <b>C</b>ulture.
              We focus on contemporary complexities, riveting essays, aesthetic inspirations, the internal turmoil of 20-year-olds and other stories waiting to be told.
            </p>
            <h3 className="my-2 text-lg font-medium">our mission</h3>
            <p>
              Through an interdisciplinary and transhistorical approach we are committed to open up conversations on literature, contemporary art and popular culture, which should remain accessible to everybody regardless of their education and background.
            </p>
          </section>
        </div>
        <Newsletter />
      </div>
    </div>
  )
}

export default HomePage