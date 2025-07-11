import { getRecentProjects } from '@/actions/project'
import { onAuthenticateUser } from '@/actions/user'
import { AppSidebar } from '@/components/global/app-sidebar'
import UpperInfoBar from '@/components/global/upper-info-bar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

type Props = { children: React.ReactNode }

const Layout = async ({ children }: Props) => {
  const recentProjects = await getRecentProjects()
  const checkUser = await onAuthenticateUser()

  // For development, continue even without proper auth
  // if (!checkUser.user) {
  //   redirect('/sign-in')
  // }

  return (
    <SidebarProvider>
      <AppSidebar
        recentProjects={recentProjects.data || []}
        user={checkUser.user}
      />
      <SidebarInset>
        <UpperInfoBar user={checkUser.user} />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout