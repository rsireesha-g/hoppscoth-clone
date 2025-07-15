import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useClickOutside } from '../hooks/modalHooks';

export type DropdownItem = {
    label: string;
    icon?: any;
    kbd?: string;
    onClick?: (x?: string) => void;
    color?: string
};

type DropdownPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'header' | 'header-right' | 'middle';

type DropdownMenuProps = {
    button: any;
    items?: DropdownItem[];
    position?: DropdownPosition;
    children?: any;
    childrenPosition?: 'top' | 'bottom',
    extraClass?: string
};


const DropdownMenu = ({ button, items = [], position, extraClass = '', children, childrenPosition = 'bottom' }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<any>(null);

    const getPositionClasses = (position: DropdownPosition = 'bottom-right') => {
        switch (position) {
            case 'top-left':
                return 'bottom-full -left-1/2 mb-2';
            case 'top-right':
                return 'bottom-full right-1/2 mb-2';
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
                    className={`py-4 px-2 visible absolute z-[9999]  flex flex-col gap-2 w-fit min-w-40 bg-popoverColor !max-w-[45vw] border text-secondary
                        border-dividerDark rounded-md shadow-lg max-h-[40vh]  overflow-y-scroll 
                        ${getPositionClasses(position)} 
                        ${extraClass}`}
                >
                    {childrenPosition === 'top' ?
                        typeof children === 'function'
                            ? children({ closeDropdown: () => setIsOpen(false) })
                            : children : ''
                    }

                    {items?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setIsOpen(false);
                                setTimeout(() => { item.onClick?.(); }, 10)
                            }}
                            className="flex items-center text-xs gap-2 px-4 py-1 text-secondary hover:bg-primaryDark  hover:text-secondaryDark cursor-pointer"
                        >
                            {item.icon && <span>{item.icon}</span>}
                            <span className={`flex-grow truncate max-w-[16rem] text-${item.color}-500`} style={{ color: item.color }}>{item.label}</span>
                            {item?.kbd && <kbd className='kbd'>{item?.kbd}</kbd>}
                        </div>
                    ))}
                    {childrenPosition === 'bottom' ?
                        typeof children === 'function'
                            ? children({ closeDropdown: () => setIsOpen(false) })
                            : children : ''
                    }
                </div>

            )}
        </div>
    );
};

export default DropdownMenu;
