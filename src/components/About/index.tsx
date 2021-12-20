import React from 'react';
import img1 from './images/instructions-1.png';
import img2 from './images/instructions-2.png';
import img3 from './images/instructions-3.png';

export const About = () => {
  return (
    <>
      <h1 className='text-3xl'>About</h1>
      <p className='mt-6'>Tekijä: Joona Rämö</p>
      <p className='mt-4'>Käyttöohjeet:</p>
      <div className='flex flex-wrap mt-4'>
        <img className='w-1/2' src={img1} alt='Ohjekuva 1' />
        <img className='w-1/2' src={img2} alt='Ohjekuva 2' />
        <img className='mt-3 w-1/2' src={img3} alt='Ohjekuva 3' />
      </div>
      <p className='my-4'>
        Sovelluksessa ei ole käytetty mitään lisenssinalaista materiaalia.
      </p>
    </>
  );
};
