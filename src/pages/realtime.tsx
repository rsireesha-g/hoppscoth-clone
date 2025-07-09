// import React from 'react'
// import { Layout } from '../components/layout'

// export const Realtime = () => {
//     return (
//         <Layout page='realtime'>
//             <button>realtime</button>
//         </Layout>
//     )
// }

import React, { useState } from 'react';

// Mock components for each section
const ParamsComponent = () => <div className="p-4 bg-gray-100 rounded">🧩 Params UI</div>;
const HeadersComponent = () => <div className="p-4 bg-blue-100 rounded">🧾 Headers UI</div>;
const BodyComponent = () => <div className="p-4 bg-green-100 rounded">📦 Body UI</div>;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type TabType = 'params' | 'headers' | 'body';

export const Realtime: React.FC = () => {
    const [httpMethod, setHttpMethod] = useState<HttpMethod>('GET');
    const [activeTab, setActiveTab] = useState<TabType>('params');

    const renderByTab = () => {
        switch (activeTab) {
            case 'params':
                return <ParamsComponent />;
            case 'headers':
                return <HeadersComponent />;
            case 'body':
                if (httpMethod === 'GET' || httpMethod === 'DELETE') {
                    return <div className="text-red-500">Body not allowed for {httpMethod}</div>;
                }
                return <BodyComponent />;
            default:
                return <div>Select a tab</div>;
        }
    };

    const renderByMethod = () => {
        switch (httpMethod) {
            case 'GET':
            case 'POST':
            case 'PUT':
            case 'DELETE':
                return renderByTab();
            default:
                return <div>Select a method</div>;
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4">
            {/* HTTP Method Selector */}
            <div className="flex gap-2">
                {(['GET', 'POST', 'PUT', 'DELETE'] as HttpMethod[]).map((method) => (
                    <button
                        key={method}
                        onClick={() => setHttpMethod(method)}
                        className={`px-4 py-2 rounded ${httpMethod === method ? 'bg-black text-white' : 'bg-gray-200'
                            }`}
                    >
                        {method}
                    </button>
                ))}
            </div>

            {/* Tabs Selector */}
            <div className="flex gap-2">
                {(['params', 'headers', 'body'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100'
                            }`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Dynamic UI Based on HTTP Method & Tab */}
            <div>{renderByMethod()}</div>
        </div>
    );
};


