import React, { Suspense } from 'react'
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton'
import RenderPage from './_components/RenderPage'
import { onAuthenticateUser } from '@/actions/user'

const page = async() => {
 const checkUser = await onAuthenticateUser()
 
   // For development, skip auth check
   // if (!checkUser.user) {
   //   redirect('/sign-in')
   // }
 
   // For development, assume user has subscription
   // if(!checkUser.user.subscription){
   //    redirect('/dashboard')
   // }

  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton/>}>
       <RenderPage/>
      </Suspense>
    </main>
  )
}

export default page