"use client";

import { COUNTRIES, type CountryCode } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FLAG_EMOJI: Record<CountryCode, string> = {
  CA: "🇨🇦",
  IN: "🇮🇳",
};

interface CountrySelectorProps {
  value: CountryCode;
  onChange: (country: CountryCode) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(Object.entries(COUNTRIES) as [CountryCode, (typeof COUNTRIES)[CountryCode]][]).map(
        ([code, country]) => (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={cn(
              "relative flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all",
              value === code
                ? "border-primary bg-primary/5"
                : "border-muted hover:border-muted-foreground/30",
            )}
          >
            <span className="text-3xl">{FLAG_EMOJI[code]}</span>
            <div>
              <p className="font-semibold">{country.name}</p>
              <p className="text-muted-foreground text-sm">
                {country.symbol} {country.currency}
              </p>
            </div>
            {value === code && (
              <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs font-medium">
                Active
              </span>
            )}
          </button>
        ),
      )}
    </div>
  );
}
