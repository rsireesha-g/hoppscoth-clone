import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useClickOutside } from '../hooks/modalHooks';

type DropdownItem = {
    label: string;
    icon?: React.ReactNode;
    kbd?: string;
    onClick?: () => void;
};

type DropdownPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'header' | 'header-right';

type DropdownMenuProps = {
    button: React.ReactNode;
    items?: DropdownItem[];
    position?: DropdownPosition;
    children?: ReactNode;
    childrenPosition?: 'top' | 'bottom'
};


const DropdownMenu = ({ button, items, position, children, childrenPosition = 'bottom' }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<any>(null);

    const getPositionClasses = (position: DropdownPosition = 'bottom-right') => {
        switch (position) {
            case 'top-left':
                return 'bottom-full -left-1/2 mb-2';
            case 'top-right':
                return 'bottom-full right-0 mb-2';
            case 'bottom-left':
                return 'top-full left-0 mt-2';
            case 'bottom-right':
                return 'top-full right-0 mt-2';
            case 'header':
                return 'top-full mt-2 -left-1/2 w-fit';
            case 'header-right':
                return 'top-full right-1 mt-2 w-fit';
            default:
                return 'top-full right-0 mt-2';
        }
    };

    useClickOutside(menuRef, () => setIsOpen(!isOpen), isOpen)

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {button}
            </div>

            {isOpen && (
                <div
                    className={`py-4 px-2 absolute z-50  flex flex-col gap-2 w-56 bg-popoverColor !max-w-[45vw] border text-secondaryLight border-dividerDark rounded-md shadow-lg ${getPositionClasses(position)}`}
                >
                    {childrenPosition === 'top' && children}

                    {items?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                item.onClick?.();
                                setIsOpen(false);
                            }}
                            className="flex items-center text-xs gap-2 px-4 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
                        >
                            {item.icon && <span>{item.icon}</span>}
                            <span className='flex-grow truncate max-w-[16rem]'>{item.label}</span>
                            {item?.kbd && <kbd className='kbd'>{item?.kbd}</kbd>}
                        </div>
                    ))}
                    {childrenPosition === 'bottom' && children}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
