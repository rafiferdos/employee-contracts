import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface GlassyCardProps {
   children: React.ReactNode;
   className?: string;
   isBlurred?: boolean;
   shadow?: "subtle" | "glass" | "hover";
}

export const GlassyCard: React.FC<GlassyCardProps> = ({
   children,
   className,
   isBlurred = true,
   shadow = "glass",
}) => {
   return (
      <motion.div
         className={clsx(
            "glass-card p-4 md:p-6",
            {
               "backdrop-blur-glass": isBlurred,
               "shadow-glass-subtle": shadow === "subtle",
               "shadow-glass": shadow === "glass",
               "shadow-glass-hover": shadow === "hover",
            },
            className
         )}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, ease: "easeOut" }}
      >
         {children}
      </motion.div>
   );
};