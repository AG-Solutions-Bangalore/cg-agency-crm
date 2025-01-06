import React from 'react'
import Layout from '../../layout/Layout'
import PageManagement from './PageManagement'
import UserManagement from './UserManagement'
import { Tabs } from "@mantine/core";
const TabIndex = () => {
  return (
  <Layout>
     <div className="container mx-auto p-6">
           {/* Tabs Component */}
           <Tabs defaultValue="pages" className="w-full">
             {/* Tab List */}
             <Tabs.List>
               <Tabs.Tab value="pages">Pages</Tabs.Tab>
               <Tabs.Tab value="buttons">Buttons</Tabs.Tab>
             </Tabs.List>
   
             {/* Tab Panels */}
             <Tabs.Panel value="pages" pt="sm">
               <PageManagement />
             </Tabs.Panel>
   
             <Tabs.Panel value="buttons" pt="sm">
               <UserManagement />
             </Tabs.Panel>
           </Tabs>
         </div>
  </Layout>
  )
}

export default TabIndex