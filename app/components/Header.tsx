"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  // Prevent scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/loans", label: "Loan Products" },
    { href: "/emi-calculator", label: "EMI Calculator" },
    { href: "/faq", label: "FAQs" },
    { href: "/contact", label: "Contact" },
  ];

  // Helper to determine active state
  function isActive(href: string) {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 transition-all duration-300 z-[102] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={closeMenu}
      />

      <header className="sticky top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-border-color z-[100]">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2.5 font-heading text-2xl font-extrabold text-primary" onClick={closeMenu}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-extrabold">K</div>
            <span>Khushi Finance</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex gap-8 list-none p-0 m-0">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`font-semibold text-sm transition-all duration-200 ${isActive(link.href) ? "text-primary" : "text-text-medium hover:text-primary"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+918999979539" 
              className="inline-flex items-center gap-2 font-semibold text-text-medium bg-white border border-border-color hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 89999 79539
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center font-semibold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg transition-all duration-200 text-sm">Apply Now</Link>
          </div>

          {/* Hamburger Icon */}
          <button 
            className="flex lg:hidden flex-col justify-between w-6 h-[18px] bg-transparent border-none cursor-pointer z-[110]" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className={`block w-full h-[2px] bg-text-dark rounded transition-all duration-200 ${isOpen ? "translate-y-[8px] rotate-45" : ""}`}></span>
            <span className={`block w-full h-[2px] bg-text-dark rounded transition-all duration-200 ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-full h-[2px] bg-text-dark rounded transition-all duration-200 ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <aside className={`fixed top-0 bottom-0 w-[300px] h-screen bg-white shadow-2xl p-8 pt-24 flex flex-col gap-10 transition-all duration-300 z-[105] ${isOpen ? "right-0" : "-right-[300px]"}`}>
        <ul className="flex flex-col gap-6 list-none p-0">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`text-lg font-semibold block ${isActive(link.href) ? "text-primary" : "text-text-dark hover:text-primary"}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center font-semibold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg transition-all duration-200 text-base mt-auto w-full"
          onClick={closeMenu}
        >
          Apply Now
        </Link>
      </aside>
    </>
  );
}
