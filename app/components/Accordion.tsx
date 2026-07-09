"use client";

import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? "border-primary" : "border-gray-200"}`}>
      <div 
        className="px-6 py-5 flex justify-between items-center cursor-pointer select-none" 
        onClick={toggle}
      >
        <h3 className="text-base md:text-lg font-semibold text-text-dark">{title}</h3>
        <div className={`text-text-muted transition-transform duration-200 shrink-0 ml-4 ${isOpen ? "rotate-180 text-primary" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
      <div 
        className="overflow-hidden transition-all duration-300 bg-gray-50"
        style={{ maxHeight: isOpen ? "250px" : "0px" }}
      >
        <div className="px-6 pb-6 pt-5 text-sm md:text-base text-text-medium border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}
