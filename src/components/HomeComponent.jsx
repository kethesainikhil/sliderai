'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'

const HomeComponent = () => {
    const router = useRouter();
    const {data :  session} = useSession();
    if(session){
        router.push('/getEmail')
    }

  return (
    <div className='text-xl text-center '>
        Classify Emails
    </div>
  )
}

export default HomeComponent