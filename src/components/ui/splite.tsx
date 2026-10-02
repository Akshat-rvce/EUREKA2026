'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const appRef = useRef<unknown>(null)

  useEffect(() => {
    let cancelled = false

    async function loadSpline() {
      if (!canvasRef.current) return
      try {
        // Dynamically import the runtime to keep it client-only
        const { Application } = await import('@splinetool/runtime')
        if (cancelled || !canvasRef.current) return
        const app = new Application(canvasRef.current)
        appRef.current = app
        await app.load(scene)
        if (!cancelled) setLoading(false)
      } catch (err) {
        console.error('Spline failed to load:', err)
        if (!cancelled) setLoading(false)
      }
    }

    loadSpline()

    return () => {
      cancelled = true
      // Clean up the Spline application
      if (appRef.current && typeof (appRef.current as { dispose?: () => void }).dispose === 'function') {
        ;(appRef.current as { dispose: () => void }).dispose()
      }
      appRef.current = null
    }
  }, [scene])

  return (
    <div className={`relative ${className || 'w-full h-full'}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-amber-300 animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  )
}

