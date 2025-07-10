
import { ReactNode, useState } from "react";

interface TooltipProps {
    text?: string;
    children?: ReactNode;
    position?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "side-left" | "side-right";
    extraClassName?: string,
    kbd?: Array<string>
}

export const Tooltip = ({ text = 'hi hello', kbd = [], position = 'bottom', children, extraClassName }: TooltipProps) => {
    const [show, setShow] = useState(false);

    const getPositionClasses = () => {
        switch (position) {
            case "top":
                return "bottom-full mb-2 flex-col";
            case "bottom":
                return "top-full mt-2 flex-col-reverse";
            case "left":
                return "right-full mr-2 flex-row-reverse";
            case "right":
                return "left-full ml-2 flex-row";
            case "top-left":
                return "left-full -ml-4 bottom-7 flex-row";
            case "top-right":
                return 'right-full flex-row bottom-7 right-1/3';
            case "side-left": return 'left-full';
            case "side-right":
                return 'left-8 ';

            default:
                return "bottom-full mb-2 flex-col";
        }
    };

    const getArrowClasses = () => {
        const base = "w-2 h-2 bg-white rotate-45 absolute";
        switch (position) {
            case "top":
                return `${base} -mt-1`;
            case "bottom":
                return `${base} -mb-1 left-1/2 -top-1`;
            case "left":
                return `${base} -mr-1`;
            case "right":
                return `${base} -ml-1`;
            case "top-left":
                return `${base} -mt-1 left-1`;
            case "top-right":
                return `${base} right-1 -mt-1`;
            case "side-left":
            case "side-right":
                return `${base} top-2 -ml-1`;
            default:
                return `${base} -mt-1`;
        }
    };

    return (
        <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className={`absolute z-50 items-center ${getPositionClasses()} ${extraClassName}`}>
                    <div className="text-[10px] text-secondary hover:text-secondaryDark bg-white text-black px-3 py-1 rounded shadow-md whitespace-nowrap flex flex-wrap gap-1">
                        {text}
                        {kbd && kbd?.map((keys: string) => (
                            <kbd className="kbd bg-transparent" key={keys}>{keys}</kbd>
                        ))}
                    </div>
                    <div className={getArrowClasses()} />
                </div>
            )}
        </div>
    )
};

