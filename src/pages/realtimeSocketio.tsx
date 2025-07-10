import React from 'react'
import { Layout } from '../components/layout'
import { TopNavigation } from '../components/realtimeComponents/topNavigation'

export const RealtimeSocketio = () => {
    return (
        <Layout page='realtime'>
            <TopNavigation currPage='socket' />
        </Layout>
    )
}
