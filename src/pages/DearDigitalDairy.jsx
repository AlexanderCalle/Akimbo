import React from 'react'
import MainLayout from '../layouts/MainLayout'
import ImageArticle from '../assets/HeroImage.png';
import DairyList from '../components/Dairy/DairyList';

const DearDigitalDairy = () => {
  return (
    <MainLayout>
        <div className='flex md:flex-col lg:flex-row w-full h-[500px]'>
            <div className='absolute mt-24 ml-10 md:ml-20 w-48 md:w-64 lg:w-80 h-fit bg-akimbo-dark-200'>
                <img
                className='w-80 object-cover' 
                src="https://firebasestorage.googleapis.com/v0/b/akimbo-20159.appspot.com/o/profilePics%2Femmavranken%20kopie.png?alt=media&token=cc99fa2f-8cc0-4f39-9417-ed3c47c0d8b0" alt="Emma Vranken" />
                <p>Bio:</p>
            </div>
            <img className='w-full lg:w-5/6 ml-auto object-cover bg-center mr-0 justify-self-end' src={ImageArticle} alt="Dairy mood board" />
        </div>

        <div className='w-full mt-14 lg:mt-5 p-5 flex flex-col lg:flex-row gap-5'>
            <section className='w-5/6 mx-auto lg:w-1/6 flex flex-col md:flex-row lg:flex-col gap-5 h-fit justify-evenly'>
                <div className='bg-akimbo-dark-200 h-40'>fqsdf</div>
                <div className='bg-akimbo-dark-200 h-40'>qdf</div>
            </section>
            {/* Dairy items section */}
            <DairyList />
        </div>

    </MainLayout>
  )
}

export default DearDigitalDairy