import type { SVGProps } from "react";

/** Hand-drawn vector accents inspired by the EUREKA '26 expo banner. */
export function EngineeringIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 720 720" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="expo-gold" x1="70" y1="80" x2="650" y2="640" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1D5A0" />
          <stop offset="1" stopColor="#A97737" />
        </linearGradient>
        <linearGradient id="expo-plum" x1="100" y1="150" x2="610" y2="650" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9D3654" />
          <stop offset="1" stopColor="#421528" />
        </linearGradient>
      </defs>

      {/* Fine orbital paths echo the mark without competing with it. */}
      <circle cx="360" cy="360" r="326" stroke="url(#expo-gold)" strokeOpacity=".38" />
      <circle cx="360" cy="360" r="292" stroke="#F3E7CE" strokeOpacity=".13" strokeDasharray="1 11" />
      <path d="M64 438C155 570 537 601 652 306" stroke="url(#expo-gold)" strokeWidth="1.4" strokeOpacity=".52" />
      <path d="M96 280C203 109 514 96 626 249" stroke="#F3E7CE" strokeOpacity=".3" />

      {/* Wind generator and a compact solar array, drawn as technical line art. */}
      <g stroke="#E8C98F" strokeLinecap="round" strokeLinejoin="round">
        <path d="M118 241V143M118 143 85 111M118 143l41-28M118 143l5 47" strokeWidth="2" />
        <circle cx="118" cy="143" r="4" fill="#E8C98F" />
        <path d="m45 271 92-22 53 25-93 23-52-26Z" fill="#F4E6C7" fillOpacity=".07" />
        <path d="m137 249 12 54m-58-48 12 57m37-63-93 22m109-10-93 23" strokeWidth="1.2" />
        <path d="m72 311 86-21m-95 32 84-20" strokeOpacity=".55" />
      </g>

      {/* A maker at a workbench: simplified, purposeful silhouettes. */}
      <g stroke="#E8C98F" strokeLinecap="round" strokeLinejoin="round">
        <path d="M59 536h150m-132 0v67m114-67v67m-126-1h139" strokeWidth="2" />
        <path d="M103 457c0-17 12-29 28-29s29 12 29 29v34h-57v-34Z" fill="url(#expo-plum)" strokeWidth="1.5" />
        <circle cx="131" cy="415" r="18" fill="#C78759" stroke="#F1D5A0" strokeWidth="1.5" />
        <path d="M111 410c4-18 31-25 43-8l-3 13-11-6-14 9-15-2Z" fill="#251524" stroke="#251524" />
        <path d="m117 490-26 34 30 12m43-46 23 28-22 18" strokeWidth="3" />
        <path d="M178 515h55l-7 28h-52l4-28Z" fill="#16191B" strokeWidth="1.5" />
        <path d="M187 523h35m-31 7h24" strokeWidth="1" />
        <circle cx="249" cy="514" r="5" fill="#E8C98F" />
        <path d="M249 509v-21l-14-9m14 9 15-9" strokeWidth="1.5" />
      </g>

      {/* Opposite-side prototype bench and a student checking a schematic. */}
      <g stroke="#E8C98F" strokeLinecap="round" strokeLinejoin="round">
        <path d="M511 535h151m-130 0v69m109-69v69m-122 0h135" strokeWidth="2" />
        <circle cx="584" cy="422" r="18" fill="#C78759" stroke="#F1D5A0" strokeWidth="1.5" />
        <path d="M566 417c5-20 31-23 43-7l-4 13-10-6-14 8-15-1Z" fill="#291525" stroke="#291525" />
        <path d="M555 464c0-17 13-28 29-28s29 11 29 28v34h-58v-34Z" fill="url(#expo-plum)" strokeWidth="1.5" />
        <path d="m566 492-31 28 13 16 38-26m23-17 23 22-25 21" strokeWidth="3" />
        <path d="M539 506h-54v-53h54v53Z" fill="#17191A" strokeWidth="1.5" />
        <path d="M493 467h37m-37 8h24m-24 8h31" strokeWidth="1" />
        <path d="M620 520h26v15h-26z" fill="#F1D5A0" fillOpacity=".16" />
        <circle cx="627" cy="524" r="2" fill="#E8C98F" />
        <circle cx="635" cy="524" r="2" fill="#E8C98F" />
        <circle cx="643" cy="524" r="2" fill="#E8C98F" />
      </g>

      {/* Small circuit markers and four-point discovery sparks. */}
      <g stroke="#E8C98F" strokeOpacity=".75" strokeWidth="1.2">
        <path d="M247 119h35v24h31m114 0h33v-22h29" />
        <circle cx="247" cy="119" r="3" fill="#E8C98F" />
        <circle cx="489" cy="121" r="3" fill="#E8C98F" />
        <path d="M354 82v20m-10-10h20M360 620v18m-9-9h18" />
        <path d="M672 380c-17 2-23 8-25 25-2-17-8-23-25-25 17-2 23-8 25-25 2 17 8 23 25 25Z" fill="#F1D5A0" fillOpacity=".75" />
        <path d="M112 354c-11 1-15 5-16 16-1-11-5-15-16-16 11-1 15-5 16-16 1 11 5 15 16 16Z" fill="#F1D5A0" fillOpacity=".6" />
      </g>
    </svg>
  );
}
