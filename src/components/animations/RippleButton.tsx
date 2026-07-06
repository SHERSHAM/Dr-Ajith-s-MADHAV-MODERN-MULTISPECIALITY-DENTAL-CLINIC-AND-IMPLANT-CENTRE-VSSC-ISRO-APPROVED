"use client";

import { ReactNode, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
}

export default function RippleButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  icon,
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple-effect 0.6s ease-out forwards";
    ripple.style.pointerEvents = "none";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.();
  };

  const baseStyles =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2";

  const variants = {
    primary:
      "text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-primary-50 text-primary-700 hover:bg-primary-100 hover:-translate-y-0.5",
    outline:
      "border-2 border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-400 hover:-translate-y-0.5",
    ghost:
      "text-primary-700 hover:bg-primary-50 hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "text-sm px-5 py-2.5",
    md: "text-[0.95rem] px-7 py-3",
    lg: "text-base px-9 py-4",
  };

  const gradientStyle =
    variant === "primary"
      ? {
          background:
            "linear-gradient(135deg, #1e2a8a 0%, #3b63f7 50%, #20c9ad 100%)",
        }
      : {};

  const Component = href ? "a" : "button";

  return (
    <>
      <style jsx global>{`
        @keyframes ripple-effect {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Component
          ref={buttonRef as any}
          href={href}
          type={href ? undefined : type}
          disabled={disabled}
          onClick={handleClick}
          className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${className}`}
          style={gradientStyle}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </Component>
      </motion.div>
    </>
  );
}
