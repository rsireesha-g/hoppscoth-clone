import React from 'react'
import { QueryParams } from './queryParams'
import { RequestScriptTab } from './requestScript'
import { AuthorizationTab } from './authorizationTab'

export const GetMethodComponent = ({
    selectedTab,
    selectedAuthMethod,
    setSelectedAuthMethod
}: any) => {

    const renderBodyComponent = () => {
        switch (selectedTab) {
            case 'parameters': return <QueryParams />;
            case 'body': return '';
            case 'headers': return <QueryParams />;
            case 'authorization': return <AuthorizationTab {...{ selectedAuthMethod, setSelectedAuthMethod }} />;
            case 'pre-request script': return <RequestScriptTab {...{ selectedTab }} />;
            case 'post-request script': return <RequestScriptTab {...{ selectedTab }} />;
            default: return '';
        }
    }
    return (
        <div>
            {renderBodyComponent()}
        </div>
    )
}
