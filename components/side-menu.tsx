"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@heroui/link";
import { useState, useEffect } from "react";
import { useNavigation } from "./navigation-context";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/about", label: "About", icon: "ℹ️" },
  { href: "/services", label: "Services", icon: "⚙️" },
  { href: "/contact", label: "Contact", icon: "📧" },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { currentPage, setCurrentPage } = useNavigation();

  const handleLinkClick = (href: string) => {
    setCurrentPage(href as any);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus trap: focus the first focusable element
      const firstFocusable = document.querySelector('[role="dialog"] [tabindex], [role="dialog"] button, [role="dialog"] a') as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Side Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 z-50 h-full w-80 glass backdrop-blur-glass backdrop-saturate-glass border-r border-white/20 shadow-glass"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">Navigation</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <button
                        onClick={() => handleLinkClick(item.href)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                          currentPage === item.href
                            ? "bg-primary/20 text-primary"
                            : "hover:bg-white/10"
                        }`}
                        aria-current={currentPage === item.href ? "page" : undefined}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-white/20">
                <p className="text-sm text-muted-foreground">
                  Mitarbeiterverträge
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}