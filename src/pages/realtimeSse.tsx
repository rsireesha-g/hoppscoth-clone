import React from 'react'
import { Layout } from '../components/layout'
import { TopNavigation } from '../components/realtimeComponents/topNavigation'

export const RealtimeSse = () => {
    return (
        <Layout page='realtime'>
            <TopNavigation currPage='sse' />
        </Layout>
    )
}
