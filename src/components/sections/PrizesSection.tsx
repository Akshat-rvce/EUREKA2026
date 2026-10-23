import React from "react";
import { Award, BriefcaseBusiness, Gift, Users } from "lucide-react";

const INCENTIVES = [
  { title: "Mentorship", description: "Guidance for participating project teams.", icon: BriefcaseBusiness },
  { title: "Industry connect", description: "Opportunities to connect with industry professionals.", icon: Users },
  { title: "Certificates", description: "Certificates for participants.", icon: Award },
  { title: "Goodies", description: "Event goodies for participants.", icon: Gift },
];

export function PrizesSection() {
  return (
    <section id="prizes" className="w-full border-t border-white/10 bg-[#10100f] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-amber-300">Recognition &amp; opportunity</p>
          <h2 className="font-display text-3xl font-semibold sm:text-5xl">A platform for promising projects</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
            EUREKA ’26 lists a total prize pool of ₹15,000, alongside mentorship, industry connect, certificates, and goodies.
          </p>
        </div>
        <div className="rounded-3xl border border-amber-200/20 bg-amber-100/[0.04] p-7 text-center sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Total event prize pool</p>
          <p className="mt-2 font-display text-5xl font-semibold text-amber-200 sm:text-6xl">₹15,000</p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCENTIVES.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <Icon aria-hidden="true" className="mb-4 h-5 w-5 text-amber-200" />
              <h3 className="font-display text-lg font-medium">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
