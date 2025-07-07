import React from 'react'
import { Layout } from '../components/layout'
import { InputWithDropdown } from '../components/inputWithDropdown'

export const Rest = () => {
    return (
        <Layout page='home'>
            <button>Change Theme</button>
            <InputWithDropdown />

        </Layout>
    )
}
