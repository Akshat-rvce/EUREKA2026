'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Use the /next subpath — this is the official Next.js-compatible build
// that avoids the ESM export map resolution failure on Vercel
const Spline = dynamic(
  () => import('@splinetool/react-spline/next').then((mod) => mod.default || mod),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-amber-300 animate-spin" />
      </div>
    ),
  }
)

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={`relative ${className || 'w-full h-full'}`}>
      <Spline scene={scene} className="w-full h-full" />
    </div>
  )
}
