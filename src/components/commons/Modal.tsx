import { useEffect, useState, type FC, type ReactNode } from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "md",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible && !isOpen) return null;

  const getWidthClass = () => {
    switch (width) {
      case "sm":
        return "max-w-sm";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "3xl":
        return "max-w-3xl";
      case "4xl":
        return "max-w-4xl";
      case "5xl":
        return "max-w-5xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-md";
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className={clsx(
          "fixed inset-0 bg-black transition-opacity duration-300",
          isOpen ? "opacity-70" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className={clsx(
            "w-full p-5 bg-primary-6 shadow-xl rounded-md z-10 relative transition-all duration-300",
            getWidthClass(),
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-medium leading-6 text-white">
              {title}
            </h3>
          </div>
          <div className="mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
