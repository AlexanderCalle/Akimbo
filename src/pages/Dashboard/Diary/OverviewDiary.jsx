import React from 'react'
import OverviewDiaryItems from '../../../components/Dairy/OverviewDairyItems'
import { Link } from 'react-router-dom'

const OverviewDiary = () => {
  return (
    <div>
      <div className='flex justify-between mb-6'>
        <h2 className="underline text-2xl font-medium">Dear Digital Diary overview</h2>
        <Link to={"/dashboard/diary/create"} className='px-3 py-1 bg-akimbo-dark-900 text-akimbo-light hover:bg-akimbo-dark-500'>New Post</Link>
      </div>
      <OverviewDiaryItems />
    </div>
  )
}

export default OverviewDiary