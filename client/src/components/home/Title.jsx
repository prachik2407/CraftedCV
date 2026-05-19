import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className='text-center mt-6'>
      <h2 className='text-3xl sm:text-5xl text-rose-950 tracking-tight' style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{title}</h2>
      <p className='max-w-2xl mt-4 text-rose-900/70 mx-auto'>{description}</p>
    </div>
  )
}

export default Title