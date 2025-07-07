import React, { useRef } from 'react'
import { useClickOutside } from '../hooks/modalHooks';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
    isOpen: boolean
}


export const Modal = ({ children, onClose, className, isOpen }: ModalProps) => {
    const modalRef = useRef<any>(null);

    useClickOutside(modalRef, onClose, isOpen);

    return (
        <div className={`modal ${className}`}>
            <div ref={modalRef}>
                {children}
            </div>
        </div>
    )
}
