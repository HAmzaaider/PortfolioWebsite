import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─── Text element tags that trigger the water effect ──────────
const TEXT_TAGS = ['H1','H2','H3','H4','H5','H6','P','SPAN','A','LI','LABEL','BUTTON']

const CustomCursor = () => {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Smooth spring follow for the ring (lags behind dot)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 35 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 35 })

  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Track the last text element we applied the water effect to
  const lastTextEl = useRef<Element | null>(null)

  // SVG turbulence ref — we animate its baseFrequency to create water motion
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)

  // Animation frame ref for water animation loop
  const waterFrameRef = useRef<number>(0)
  const waterPhase    = useRef<number>(0)

  // ── Water animation loop ──────────────────────────────────
  // Continuously shifts the turbulence seed to create flowing water motion
  const startWaterAnimation = () => {
    const animate = () => {
      waterPhase.current += 0.012
      if (turbulenceRef.current) {
        const freq = 0.013 + Math.sin(waterPhase.current) * 0.006
        turbulenceRef.current.setAttribute(
          'baseFrequency', `${freq} ${freq * 0.6}`
        )
      }
      waterFrameRef.current = requestAnimationFrame(animate)
    }
    waterFrameRef.current = requestAnimationFrame(animate)
  }

  const stopWaterAnimation = () => {
    cancelAnimationFrame(waterFrameRef.current)
  }

  // ── Apply water filter to a text element ──────────────────
  const applyWaterToText = (el: Element) => {
    if (lastTextEl.current === el) return
    removeWaterFromText()
    lastTextEl.current = el
    el.classList.add('water-text-active')
    startWaterAnimation()
  }

  // ── Remove water filter from last text element ────────────
  const removeWaterFromText = () => {
    if (lastTextEl.current) {
      lastTextEl.current.classList.remove('water-text-active')
      lastTextEl.current = null
    }
    stopWaterAnimation()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target  = e.target as HTMLElement
      const tagName = target.tagName

      // ── Clickable element (link / button) ─────────────────
      const isClickable = target.closest('a, button, [data-cursor-hover]')
      if (isClickable) {
        removeWaterFromText()
        if (ringRef.current) {
          ringRef.current.style.width            = '50px'
          ringRef.current.style.height           = '50px'
          ringRef.current.style.borderColor      = '#D97706'
          ringRef.current.style.backgroundColor  = 'rgba(217,119,6,0.08)'
        }
        if (dotRef.current) {
          dotRef.current.style.transform = 'translate(-50%,-50%) scale(0)'
        }
        return
      }

      // ── Text element ──────────────────────────────────────
      // Cursor goes "under" the text — ring expands into a large
      // warm blob visible behind the letters
      if (TEXT_TAGS.includes(tagName) && target.textContent?.trim()) {
        applyWaterToText(target)

        if (ringRef.current) {
          // Large blob — goes behind the text via z-index
          ringRef.current.style.width            = '90px'
          ringRef.current.style.height           = '90px'
          ringRef.current.style.borderColor      = 'transparent'
          ringRef.current.style.backgroundColor  = 'rgba(217,119,6,0.12)'
          ringRef.current.style.zIndex           = '0' // behind text (text is z-index 1)
          ringRef.current.style.filter           = 'blur(4px)'
        }
        if (dotRef.current) {
          // Dot also goes behind
          dotRef.current.style.backgroundColor = 'rgba(217,119,6,0.5)'
          dotRef.current.style.transform       = 'translate(-50%,-50%) scale(1.5)'
        }
        return
      }

      // ── Default state ─────────────────────────────────────
      resetCursor()
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target    = e.target as HTMLElement
      const isText    = TEXT_TAGS.includes(target.tagName)
      const isToChild = (e.relatedTarget as HTMLElement)?.closest?.(
        TEXT_TAGS.map(t => t.toLowerCase()).join(',')
      )

      if (isText && !isToChild) {
        removeWaterFromText()
        resetCursor()
      }

      const isClickable = target.closest('a, button, [data-cursor-hover]')
      if (isClickable) resetCursor()
    }

    const handleMouseLeave = () => {
      mouseX.set(-200)
      mouseY.set(-200)
      removeWaterFromText()
      resetCursor()
    }

    window.addEventListener('mousemove',    handleMouseMove)
    window.addEventListener('mouseover',    handleMouseOver)
    window.addEventListener('mouseout',     handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove',    handleMouseMove)
      window.removeEventListener('mouseover',    handleMouseOver)
      window.removeEventListener('mouseout',     handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      stopWaterAnimation()
    }
  }, [mouseX, mouseY])

  // Reset cursor to default mustard style
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

  return (
    <>
      {/* ── Hidden SVG — defines the water ripple filter ───── */}
      {/* feTurbulence generates the noise field              */}
      {/* feDisplacementMap warps the text using that noise   */}
      <svg
        style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="water-ripple" x="-20%" y="-20%" width="140%" height="140%">
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
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Dot — snappy, follows cursor precisely ──────────── */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: mouseX, y: mouseY,
          translateX: '-50%', translateY: '-50%',
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: '#D97706',
          zIndex: 9999,
          transition: 'transform 0.15s ease, background-color 0.2s ease',
        }}
      />

      {/* ── Ring — lags behind for elastic trail feel ───────── */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid #D97706',
          zIndex: 9998,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, filter 0.3s ease, z-index 0s',
        }}
      />
    </>
  )
}

export default CustomCursor