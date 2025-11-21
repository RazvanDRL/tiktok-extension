import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
export interface IModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}

const Modal = ({ isOpen, children, onClose, className }: IModalProps) => {
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

    const handleClose = () => {
        onClose();
    };

    return (
        <AnimatePresence mode='wait'>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className='fixed inset-0 p-8 w-full z-50 flex items-center justify-center bg-black bg-opacity-50'
                >
                    <motion.div
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                            x: 0,
                            y: 0,
                        }}
                        exit={{
                            scale: 0,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className={`shadow-lg relative max-w-3/4 max-h-full overflow-y-auto ${className || ''}`}
                        style={{ backgroundColor: 'transparent' }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
