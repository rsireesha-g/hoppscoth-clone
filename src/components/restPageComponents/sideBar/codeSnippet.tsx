import React, { useState } from 'react'
import DropdownMenu from '../../dropdownMenu';
import { Button } from '../../button';
import { MdFileDownload, MdOutlineWrapText } from 'react-icons/md';
import { Tooltip } from '../../tooltip';
import { BsCopy } from 'react-icons/bs';

type listInterface = {
    label: string
}

const list = [
    { label: "C - cURL" },
    { label: "Clojure - clj-http" },
    { label: "C# - HttpClient" },
    { label: "C++ - RestSharp" },
    { label: "Go" },
    { label: "HTTP - HTTP 1.1 Request String" },
    { label: "Java - AsyncHttpClient" },
    { label: "Java - Java.net.http" },
    { label: "Java - OkHttp" },
    { label: "Java - Unirest" },
    { label: "JavaScript - Axios" },
    { label: "JavaScript - Fetch" },
    { label: "JavaScript - jQuery" },
    { label: "JavaScript - XMLHttpRequest" },
    { label: "Kotlin - OkHttp" },
    { label: "Objective-C - NSURLSession" },
    { label: "Ocaml - cohttp" },
    { label: "PHP - cURL" },
    { label: "PowerShell - Invoke-RestMethod" },
    { label: "PowerShell - WebRequest" },
    { label: "Python - Python 3 Native" },
    { label: "Python - Requests" },
    { label: "R - httr" },
    { label: "Ruby - Ruby Native" },
    { label: "Rust - Reqwest" },
    { label: "Shell - cURL" },
    { label: "Shell - HTTPie" },
    { label: "Shell - Wget" },
    { label: "Swift - NSURLSession" }
];

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
};

export const downloadCodeAsText = (filename: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element);
};


export const CodeSnippet = () => {
    const [search, setSearch] = useState('');
    const [searchedResults, setSearchResults] = useState<Array<listInterface>>(list);

    const handleSearch = (value: string) => {
        let filtered = list?.filter((item) => item?.label?.toLocaleLowerCase().includes(value?.toLocaleLowerCase()));
        setSearchResults(filtered)
    }



    return (
        <div className='w-full h-full flex flex-col gap-1 '>
            <DropdownMenu position="bottom-right" button={
                <Button text='shell-CURL' type='secondary' extraClass='w-full !flex-row' chevronExists={true} />
            }>
                <div className="flex flex-col gap-2">
                    <input type='search' placeholder='Search'
                        className='w-full p-1'
                        value={search}
                        onChange={(el) => { setSearch(el.target.value); handleSearch(el.target.value) }}
                    />
                    <div className="flex border-t border-t-dividerDark flex-col gap-2">
                        {searchedResults?.map((item, ind) => (
                            <p key={ind}>{item?.label}</p>
                        ))}
                    </div>
                </div>
            </DropdownMenu>
            <div className='flex border border-dividerDark gap-2 align-middle items-center justify-between mt-2 p-2'>
                <p className="text-secondaryLight">Generated Code</p>
                <div className="flex gap-2">
                    <Tooltip position='top-right' text='Wrap Lines'>
                        <MdOutlineWrapText size={16} className='cursor-pointer' />
                    </Tooltip>
                    <Tooltip position='top-right' text='File Download'>
                        <MdFileDownload size={16} className='cursor-pointer'
                            onClick={() =>
                                downloadCodeAsText(
                                    "code snippet.txt",
                                    "curl --request POST \
                --url https://echo.hoppscotch.io/ \
                --header 'Content - Type: '"
                                )
                            } />
                    </Tooltip>
                    <Tooltip position='top-right' text='Copy code'>
                        <BsCopy size={16} className='cursor-pointer'
                            onClick={() => copyToClipboard("curl --request POST \
                --url https://echo.hoppscotch.io/ \
                --header 'Content - Type: '")}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className='border border-dividerDark border-t-0 p-2 pb-4'>
                curl --request POST \
                --url https://echo.hoppscotch.io/ \
                --header 'Content-Type: '
            </div>

        </div>
    )
}

