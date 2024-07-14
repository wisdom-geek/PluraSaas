import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import React from 'react'

const Page = async () => {  
  const agencyId = await verifyAndAcceptInvitation()

  console.log(agencyId)

  // get User details
  const user = await getAuthUserDetails()
  
  return <div>Agency</div>
  
}

export default Page