import React from "react";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

const partners: Partner[] = [
  // Existing Partners
  { name: "SBI", logo: "/assets/logos/sbi.svg", alt: "SBI Logo" },
  { name: "HDFC Bank", logo: "/assets/logos/hdfc.svg", alt: "HDFC Bank Logo" },
  { name: "ICICI Bank", logo: "/assets/logos/icici.svg", alt: "ICICI Bank Logo" },
  { name: "Axis Bank", logo: "/assets/logos/axis.svg", alt: "Axis Bank Logo" },
  { name: "Kotak Bank", logo: "/assets/logos/kotak.svg", alt: "Kotak Bank Logo" },
  { name: "Tata Capital", logo: "/assets/logos/tata-capital.svg", alt: "Tata Capital Logo" },
  { name: "Bajaj Finserv", logo: "/assets/logos/bajaj-finserv.svg", alt: "Bajaj Finserv Logo" },
  { name: "Hero FinCorp", logo: "/assets/logos/hero-fincorp.svg", alt: "Hero FinCorp Logo" },
  { name: "L&T Finance", logo: "/assets/logos/lt-finance.svg", alt: "L&T Finance Logo" },
  { name: "IDFC First", logo: "/assets/logos/idfc-first.svg", alt: "IDFC First Logo" },

  // New Partners
  { name: "Bandhan Bank", logo: "/assets/logos/bandhan.svg", alt: "Bandhan Bank Logo" },
  { name: "IndusInd Bank", logo: "/assets/logos/indusind.svg", alt: "IndusInd Bank Logo" },
  { name: "Piramal Finance", logo: "/assets/logos/piramal.svg", alt: "Piramal Finance Logo" },
  { name: "InCred Finance", logo: "/assets/logos/incred.svg", alt: "InCred Finance Logo" },
  { name: "Fibe", logo: "/assets/logos/fibe.svg", alt: "Fibe Logo" },
  { name: "Finanable", logo: "/assets/logos/finnable.svg", alt: "Finanable Logo" },
  { name: "Aditya Birla Finance", logo: "/assets/logos/aditya-birla.svg", alt: "Aditya Birla Finance Logo" },
  { name: "Utkarsh Small Finance Bank", logo: "/assets/logos/utkarsh.svg", alt: "Utkarsh Small Finance Bank Logo" },
  { name: "Bank of Baroda", logo: "/assets/logos/bank-of-baroda.svg", alt: "Bank of Baroda Logo" },
  { name: "SMFG India Credit", logo: "/assets/logos/smfg.svg", alt: "SMFG India Credit Logo" },
  { name: "Yes Bank", logo: "/assets/logos/yes-bank.svg", alt: "Yes Bank Logo" },
];

export default function LendingPartners() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-10">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary/20 hover:scale-[1.02] transition-all duration-300 group h-[88px]"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={partner.logo}
              alt={partner.alt}
              fill
              className="object-contain group-hover:brightness-105 transition-all duration-300"
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
