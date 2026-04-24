import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─── Text tags that can receive the water effect ──────────────
// Only triggers inside #projects section
const TEXT_TAGS = ['H1','H2','H3','H4','H5','H6','P','SPAN','A','LI','LABEL','BUTTON']

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  driftX: number
  driftY: number
}

const CustomCursor = () => {
  // ── Cursor position values ────────────────────────────────
  // useMotionValue = no re-renders, just direct DOM updates
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Ring lags behind the dot with spring physics
  const springX = useSpring(mouseX, { stiffness: 400, damping: 35 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 35 })

  // Refs for direct DOM manipulation (faster than state)
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // The last text element that received the water class
  const lastTextEl = useRef<Element | null>(null)

  // SVG turbulence element — we animate its baseFrequency
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)

  // Animation frame for the water loop
  const waterFrameRef = useRef<number>(0)

  // Phase counter — increments each frame to animate the water
  const waterPhase = useRef<number>(0)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const sparkleId = useRef(0)
  const lastPoint = useRef({ x: -200, y: -200 })
  const insideProjectsRef = useRef(false)
  const [insideAbout, setInsideAbout] = useState(false)

  // ── Water animation loop ──────────────────────────────────
  // Shifts turbulence baseFrequency smoothly using a sine wave
  // This creates the flowing, liquid distortion on the text
  const startWaterAnimation = () => {
    const animate = () => {
      waterPhase.current += 0.012
      if (turbulenceRef.current) {
        const freq = 0.013 + Math.sin(waterPhase.current) * 0.006
        turbulenceRef.current.setAttribute(
          'baseFrequency',
          `${freq} ${freq * 0.6}`
        )
      }
      waterFrameRef.current = requestAnimationFrame(animate)
    }
    waterFrameRef.current = requestAnimationFrame(animate)
  }

  const stopWaterAnimation = () => {
    cancelAnimationFrame(waterFrameRef.current)
  }

  // ── Apply water filter to a specific text element ─────────
  // Adds the CSS class that references the SVG filter
  const applyWaterToText = (el: Element) => {
    // Skip if already applied to this element
    if (lastTextEl.current === el) return
    removeWaterFromText()
    lastTextEl.current = el
    el.classList.add('water-text-active')
    startWaterAnimation()
  }

  // ── Remove water filter from the last text element ────────
  const removeWaterFromText = () => {
    if (lastTextEl.current) {
      lastTextEl.current.classList.remove('water-text-active')
      lastTextEl.current = null
    }
    stopWaterAnimation()
  }

  // ── Reset cursor to its default mustard appearance ────────
  const resetCursor = () => {
    if (ringRef.current) {
      ringRef.current.style.width           = '36px'
      ringRef.current.style.height          = '36px'
      ringRef.current.style.borderColor     = '#D97706'
      ringRef.current.style.backgroundColor = 'transparent'
      ringRef.current.style.zIndex          = '9998'
      ringRef.current.style.filter          = 'none'
    }
    if (dotRef.current) {
      dotRef.current.style.backgroundColor = '#D97706'
      dotRef.current.style.transform       = 'translate(-50%,-50%) scale(1)'
    }
  }

  useEffect(() => {
    // ── Mouse move: update raw position values ────────────
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const insideProjects = !!target?.closest('#projects')
      const nowInsideAbout = !!target?.closest('#about')
      insideProjectsRef.current = insideProjects
      setInsideAbout(nowInsideAbout)

      const dx = e.clientX - lastPoint.current.x
      const dy = e.clientY - lastPoint.current.y
      const distance = Math.hypot(dx, dy)
      lastPoint.current = { x: e.clientX, y: e.clientY }

      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Glitter tail appears only when moving inside #projects.
      if (insideProjects && distance > 6) {
        const burstCount = distance > 18 ? 3 : 2
        const created: number[] = []

        for (let i = 0; i < burstCount; i += 1) {
          const id = sparkleId.current++
          created.push(id)

          const sparkle: Sparkle = {
            id,
            x: e.clientX - dx * (0.35 + i * 0.07) + (Math.random() - 0.5) * 16,
            y: e.clientY - dy * (0.35 + i * 0.07) + (Math.random() - 0.5) * 16,
            size: 4 + Math.random() * 6,
            driftX: (Math.random() - 0.5) * 26,
            driftY: -12 - Math.random() * 16,
          }

          setSparkles(prev => [...prev.slice(-34), sparkle])
        }

        window.setTimeout(() => {
          setSparkles(prev => prev.filter(item => !created.includes(item.id)))
        }, 560)
      }
    }

    // ── Mouse over: decide which cursor state to apply ────
    const handleMouseOver = (e: MouseEvent) => {
      const target  = e.target as HTMLElement
      const tagName = target.tagName

      // Check if we're inside the Projects section
      // Water effect is ONLY active inside #projects
      const insideProjects = !!target.closest('#projects')
      const inAbout = !!target.closest('#about')
      setInsideAbout(inAbout)

      // ── 1. Clickable element (link or button) ─────────────
      // Expand ring, hide dot — works everywhere
      const isClickable = target.closest('a, button, [data-cursor-hover]')
      if (isClickable) {
        removeWaterFromText()
        if (ringRef.current) {
          ringRef.current.style.width           = '50px'
          ringRef.current.style.height          = '50px'
          ringRef.current.style.borderColor     = '#D97706'
          ringRef.current.style.backgroundColor = 'rgba(217,119,6,0.08)'
          ringRef.current.style.zIndex          = '9998'
          ringRef.current.style.filter          = 'none'
        }
        if (dotRef.current) {
          dotRef.current.style.transform = 'translate(-50%,-50%) scale(0)'
        }
        return
      }

      // ── 2. Text element inside #projects ─────────────────
      // Cursor goes "under" the text — ring becomes a large
      // warm blob sitting behind the letters
      // The text receives a water/ripple SVG filter
      if (
        insideProjects &&
        TEXT_TAGS.includes(tagName) &&
        target.textContent?.trim()
      ) {
        applyWaterToText(target)

        if (ringRef.current) {
          ringRef.current.style.width           = '90px'
          ringRef.current.style.height          = '90px'
          ringRef.current.style.borderColor     = 'transparent'
          // Semi-transparent blob visible under the text
          ringRef.current.style.backgroundColor = 'rgba(217,119,6,0.12)'
          // z-index 0 = behind text (text has z-index 1 via water-text-active)
          ringRef.current.style.zIndex          = '0'
          // Soft blur makes it feel like a water surface
          ringRef.current.style.filter          = 'blur(4px)'
        }

        if (dotRef.current) {
          dotRef.current.style.backgroundColor = 'rgba(217,119,6,0.5)'
          dotRef.current.style.transform       = 'translate(-50%,-50%) scale(1.5)'
        }
        return
      }

      const insideAboutText =
        !!target.closest('[data-about-under-text="true"]') &&
        TEXT_TAGS.includes(tagName) &&
        !!target.textContent?.trim()

      if (insideAboutText) {
        removeWaterFromText()
        if (ringRef.current) {
          ringRef.current.style.width = '82px'
          ringRef.current.style.height = '82px'
          ringRef.current.style.borderColor = 'transparent'
          ringRef.current.style.backgroundColor = 'rgba(245,185,85,0.14)'
          ringRef.current.style.zIndex = '0'
          ringRef.current.style.filter = 'blur(4px)'
        }
        if (dotRef.current) {
          dotRef.current.style.backgroundColor = 'rgba(245,185,85,0.55)'
          dotRef.current.style.transform = 'translate(-50%,-50%) scale(1.35)'
        }
        return
      }

      // ── 3. Outside #projects — remove water, reset cursor ─
      if (!insideProjects) {
        removeWaterFromText()
        setSparkles([])
      }

      if (inAbout) {
        if (ringRef.current) {
          ringRef.current.style.width = '44px'
          ringRef.current.style.height = '44px'
          ringRef.current.style.borderColor = 'rgba(245,185,85,0.85)'
          ringRef.current.style.backgroundColor = 'rgba(245,185,85,0.06)'
        }
        if (dotRef.current) {
          dotRef.current.style.backgroundColor = '#F5B955'
          dotRef.current.style.transform = 'translate(-50%,-50%) scale(1.15)'
        }
        return
      }

      resetCursor()
    }

    // ── Mouse out: clean up water + cursor state ──────────
    const handleMouseOut = (e: MouseEvent) => {
      const target        = e.target as HTMLElement
      const relatedTarget = e.relatedTarget as HTMLElement | null

      // Only remove water if leaving a text element
      // and not entering another text child of the same parent
      const isText    = TEXT_TAGS.includes(target.tagName)
      const isToChild = relatedTarget?.closest?.(
        TEXT_TAGS.map(t => t.toLowerCase()).join(',')
      )

      if (isText && !isToChild) {
        removeWaterFromText()
        resetCursor()
      }

      const isClickable = target.closest('a, button, [data-cursor-hover]')
      if (isClickable) resetCursor()
    }

    // ── Mouse leaves the window entirely ─────────────────
    const handleMouseLeave = () => {
      mouseX.set(-200)
      mouseY.set(-200)
      removeWaterFromText()
      setSparkles([])
      setInsideAbout(false)
      resetCursor()
    }

    window.addEventListener('mousemove',    handleMouseMove)
    window.addEventListener('mouseover',    handleMouseOver)
    window.addEventListener('mouseout',     handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup all listeners on component unmount
    return () => {
      window.removeEventListener('mousemove',    handleMouseMove)
      window.removeEventListener('mouseover',    handleMouseOver)
      window.removeEventListener('mouseout',     handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      stopWaterAnimation()
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* ── Hidden SVG filter definition ─────────────────────── */}
      {/* Lives in the DOM but takes up zero visible space       */}
      {/* feTurbulence → generates organic noise                 */}
      {/* feDisplacementMap → warps the text using that noise    */}
      <svg
        style={{
          position: 'fixed',
          width: 0, height: 0,
          overflow: 'hidden',
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="water-ripple"
            x="-20%" y="-20%"
            width="140%" height="140%"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="turbulence"
              baseFrequency="0.013 0.008"
              numOctaves="4"
              result="noise"
              seed="5"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"          // how strong the warp is
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Small dot — snappy, follows cursor exactly ────────── */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width:           8,
          height:          8,
          borderRadius:    '50%',
          backgroundColor: '#D97706',
          zIndex:          9999,
          transition: 'transform 0.15s ease, background-color 0.2s ease',
        }}
      />

      {/* ── Outer ring — springs behind with elastic lag ────────── */}
      {/* On text hover inside #projects: becomes a warm blob     */}
      {/* behind the letters with z-index 0                       */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width:        36,
          height:       36,
          borderRadius: '50%',
          border:       '1.5px solid #D97706',
          zIndex:       9998,
          // Smooth transitions for all property changes
          transition: [
            'width 0.3s ease',
            'height 0.3s ease',
            'border-color 0.3s ease',
            'background-color 0.3s ease',
            'filter 0.3s ease',
            'z-index 0s',           // z-index switches instantly
          ].join(', '),
        }}
      />

      {insideAbout && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none rounded-full"
          style={{
            x: springX,
            y: springY,
            width: 70,
            height: 70,
            translateX: '-50%',
            translateY: '-50%',
            border: '1px solid rgba(245,185,85,0.35)',
            zIndex: 9996,
          }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.15, 0.45] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="fixed top-0 left-0 pointer-events-none rounded-full"
          style={{
            x: sparkle.x,
            y: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            translateX: '-50%',
            translateY: '-50%',
            zIndex: 9997,
            background:
              'radial-gradient(circle, rgba(255,240,180,1) 0%, rgba(245,185,85,0.9) 35%, rgba(217,119,6,0.35) 68%, rgba(217,119,6,0) 100%)',
            boxShadow: '0 0 14px rgba(255,214,102,0.95), 0 0 24px rgba(245,185,85,0.65)',
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0.2,
            x: sparkle.x + sparkle.driftX,
            y: sparkle.y + sparkle.driftY,
          }}
          transition={{ duration: 0.56, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

export default CustomCursor