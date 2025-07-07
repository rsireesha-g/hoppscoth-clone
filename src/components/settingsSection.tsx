import React, { ReactNode } from 'react'
import { Link } from 'react-router'

interface settingSectionProps {
    children?: ReactNode,
    description?: string,
    heading: string,
    linkTo?: string,
    linkText?: string
}
export const SettingsSection = ({ children, description, heading, linkText, linkTo = "#" }: settingSectionProps) => {
    return (
        <section key={heading}>
            <h4 className="font-semibold text-secondaryDark">{heading}</h4>
            {description && <div className="my-1 text-secondaryLight">{description}
                {linkText && <Link to={linkTo}>{linkText}</Link>}
            </div>}
            <div className="mt-4">
                <div className="flex flex-col">
                    {children}
                </div>
            </div>
        </section>
    )
}
