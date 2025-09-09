import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface GlassyInputProps {
   placeholder?: string;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   className?: string;
   type?: "text" | "email" | "password";
   disabled?: boolean;
   size?: "sm" | "md" | "lg";
}

export const GlassyInput: React.FC<GlassyInputProps> = ({
   placeholder,
   value,
   onChange,
   className,
   type = "text",
   disabled = false,
   size = "md",
}) => {
   return (
      <motion.input
         type={type}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         disabled={disabled}
         className={clsx(
            "glass-input px-3 md:px-4 text-foreground placeholder:text-muted-foreground",
            {
               "py-2 md:py-3 text-sm": size === "sm",
               "py-3 md:py-4 text-base": size === "md",
               "py-4 md:py-5 text-lg": size === "lg",
               "opacity-50 cursor-not-allowed": disabled,
            },
            className
         )}
         whileFocus={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }}
         transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
   );
};