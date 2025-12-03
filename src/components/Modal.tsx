import { useEffect, useState } from "react";

export interface IModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}

const Modal = ({ isOpen, children, onClose, className }: IModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200); // Match duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.key === "Escape" || event.key === "Esc") && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 p-8 w-full z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`shadow-lg relative max-w-3/4 max-h-full overflow-y-auto transition-all duration-200 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    } ${className || ''}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
