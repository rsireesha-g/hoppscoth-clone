import React from 'react'

interface EmptyDataProps {
    imageUrl: string,
    mainText: string,
    description?: string,
    children?: any
}

export const EmptyDataComponent = ({ imageUrl, mainText, description, children }: EmptyDataProps) => {
    return (
        <div className='flex flex-col gap-2 align-middle items-center'>
            <img loading="lazy" alt='empty collections ' width={70} height={70} src={imageUrl} />
            <p className="text-[10px]">{mainText}</p>
            <p className="text-xs text-secondaryLight" >{description}</p>
            {children}
        </div>
    )
}
