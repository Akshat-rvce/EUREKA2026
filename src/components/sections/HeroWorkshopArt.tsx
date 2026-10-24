/** Small, code-drawn workshop scene for the EUREKA hero. */
export function HeroWorkshopArt() {
  return (
    <svg className="hero-workshop-art" viewBox="0 0 1440 410" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="workshop-fade" x1="720" y1="0" x2="720" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#090B0D" stopOpacity="0" />
          <stop offset="1" stopColor="#090B0D" />
        </linearGradient>
        <linearGradient id="workshop-gold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4D79F" />
          <stop offset="1" stopColor="#B98237" />
        </linearGradient>
      </defs>
      <path d="M0 308C182 260 255 329 411 306c168-25 253-88 416-42 180 51 310 20 613-31v177H0V308Z" fill="#26131B" />
      <path d="M0 335c200-58 319 26 489-7 185-36 260-93 414-47 179 54 352 21 537-28" stroke="#8F542A" strokeOpacity=".45" strokeWidth="2" />
      <g stroke="#D4AE6C" strokeOpacity=".4" strokeWidth="2">
        <path d="M100 320V123m0 0-66 197m66-197 69 197M49 268h104M63 228h76M78 185h45" />
        <path d="M1318 321V143m0 0-55 178m55-178 57 178m-94-51h75m-65-42h54m-44-41h34" />
        <path d="M100 123v-28m0 0-17 27m17-27 17 27M1318 143v-30m0 0-18 29m18-29 18 29" />
      </g>
      <g stroke="#C99548" strokeOpacity=".72" strokeWidth="2">
        <path d="M1037 320 1108 217l71 103m-117-63h92m-72-29h54m-39-26h24" />
        <path d="M1108 217v-44m0 0-24 42m24-42 24 42M1068 320l40-103 40 103" />
      </g>
      <g transform="translate(160 211)">
        <path d="M35 158h315l-25 19H49l-14-19Z" fill="#6B341F" />
        <path d="M80 142h210l-17 16H96l-16-16Z" fill="#D5A354" />
        <path d="M130 68h135v75H130z" fill="#101923" stroke="#D7B879" strokeWidth="3" />
        <path d="M141 80h113v51H141z" fill="#182430" />
        <path d="M153 95h66m-66 9h84m-84 9h49" stroke="#D7B879" strokeOpacity=".72" strokeWidth="2" />
        <path d="m112 143 18-75h12l-12 75m140 0-15-75h-12l13 75" fill="#30202A" stroke="#D7B879" strokeWidth="2" />
        <path d="M50 111c1-31 20-55 49-56 30-1 46 23 50 52l18 35H74l-24-31Z" fill="#451B2B" stroke="#BB8143" strokeWidth="2" />
        <path d="M82 72c9-23 40-27 53-7 7 11 4 28-6 37l-18 15-29-8-11-15 11-22Z" fill="#E8B874" />
        <path d="M78 82c6-25 25-39 48-32 9 3 17 9 21 18-12-6-23-6-32 0-10 6-20 8-37 14Z" fill="#211521" />
        <path d="m132 103 9 17m-9-1-24 22m24-22 19 22" stroke="#E8B874" strokeWidth="8" strokeLinecap="round" />
        <path d="m97 143 17-22 20 4 17 18" fill="#8F4D35" />
        <path d="m277 142 14-35 22 35m-27-12h22m-34 12h47" stroke="url(#workshop-gold)" strokeWidth="3" />
      </g>
      <g transform="translate(814 232)" stroke="url(#workshop-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 72h150l-9 38H12L0 72Z" fill="#11171B" />
        <path d="m13 80 28 0-3 22-28 0 3-22Zm37 0 28 0-3 22-28 0 3-22Zm37 0 28 0-3 22-28 0 3-22Z" fill="#25252A" />
        <path d="M33 72 62 24h58l30 48M62 24l30 48m28-48L91 72" />
        <path d="M93 16V4m-7 7 7-7 7 7" />
      </g>
      <g fill="#E9BE72">
        <circle cx="272" cy="129" r="3" /><circle cx="1174" cy="106" r="2.5" /><circle cx="1238" cy="180" r="2" />
      </g>
      <g transform="translate(1260 65)" fill="#F0D59F">
        <path d="M0 0c2 21 8 27 29 29C8 31 2 37 0 58-2 37-8 31-29 29-8 27-2 21 0 0Z" />
      </g>
      <rect width="1440" height="250" fill="url(#workshop-fade)" />
    </svg>
  );
}
