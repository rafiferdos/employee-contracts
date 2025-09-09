import React, { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface GlassyButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const GlassyButton: React.FC<GlassyButtonProps> = ({
    children,
    className,
    onClick,
    disabled = false,
    loading = false,
    variant = "primary",
    size = "md",
}) => {
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loading || disabled) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { id: Date.now(), x, y };
        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    };
   const isDisabled = disabled || loading;

   return (
      <motion.button
         className={clsx(
            "glass-button px-3 md:px-4 py-2 md:py-3 text-foreground relative overflow-hidden",
            {
               "text-sm": size === "sm",
               "text-base": size === "md",
               "text-lg": size === "lg",
               "opacity-50 cursor-not-allowed": isDisabled,
            },
            className
         )}
         style={{
            backgroundColor: variant === "primary" ? "rgba(255,255,255,0.1)" :
                            variant === "secondary" ? "rgba(0,123,255,0.1)" :
                            "transparent"
         }}
         onClick={handleClick}
         disabled={isDisabled}
         whileHover={!isDisabled ? {
            scale: 1.05,
            backgroundColor: variant === "primary" ? "rgba(0,123,255,0.1)" :
                            variant === "secondary" ? "rgba(255,255,255,0.1)" :
                            "rgba(255,255,255,0.1)"
         } : {}}
         whileTap={!isDisabled ? { scale: 0.95 } : {}}
         transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
         {ripples.map(ripple => (
            <motion.span
               key={ripple.id}
               className="absolute bg-white/30 rounded-full pointer-events-none"
               initial={{ width: 0, height: 0, x: ripple.x - 10, y: ripple.y - 10, opacity: 0.6 }}
               animate={{ width: 100, height: 100, opacity: 0 }}
               transition={{ duration: 0.6 }}
            />
         ))}
         {loading && (
            <motion.div
               className="absolute inset-0 flex items-center justify-center"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
            >
               <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               />
            </motion.div>
         )}
         <span className={loading ? "opacity-0" : ""}>{children}</span>
      </motion.button>
   );
};