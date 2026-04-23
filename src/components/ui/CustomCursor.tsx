import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  // useMotionValue gives us performant values that don't cause re-renders
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // useSpring makes the cursor lag slightly behind the mouse
  // giving it a smooth, elastic feel
  // stiffness = how snappy, damping = how much it oscillates
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 })

  // Track whether cursor is hovering over a clickable element
  const isHovering = useRef<boolean>(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── Mouse move: update cursor position ───────────────
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // ── Hover detection on interactive elements ──────────
    // When hovering a link/button, we scale up the ring
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [data-cursor-hover]')
      if (isClickable && !isHovering.current) {
        isHovering.current = true
        if (ringRef.current) {
          ringRef.current.style.transform = 'translate(-50%, -50%) scale(2)'
          ringRef.current.style.borderColor = '#F5C842' // yellow on hover
          ringRef.current.style.opacity = '0.6'
        }
        if (dotRef.current) {
          dotRef.current.style.transform = 'translate(-50%, -50%) scale(0)'
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [data-cursor-hover]')
      if (isClickable && isHovering.current) {
        isHovering.current = false
        if (ringRef.current) {
          ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
          ringRef.current.style.borderColor = '#00CFAD'
          ringRef.current.style.opacity = '1'
        }
        if (dotRef.current) {
          dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        }
      }
    }

    // ── Hide cursor when it leaves the window ─────────────
    const handleMouseLeave = () => {
      mouseX.set(-100)
      mouseY.set(-100)
    }

    window.addEventListener('mousemove',  handleMouseMove)
    window.addEventListener('mouseover',  handleMouseOver)
    window.addEventListener('mouseout',   handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup all listeners on unmount
    return () => {
      window.removeEventListener('mousemove',  handleMouseMove)
      window.removeEventListener('mouseover',  handleMouseOver)
      window.removeEventListener('mouseout',   handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* ── Small dot — follows cursor precisely ─────────── */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width:           8,
          height:          8,
          borderRadius:    '50%',
          backgroundColor: '#00CFAD',
          transition: 'transform 0.15s ease',
        }}
      />

      {/* ── Outer ring — lags slightly for smooth trail feel ─ */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX:  '-50%',
          translateY:  '-50%',
          width:        36,
          height:       36,
          borderRadius: '50%',
          border:       '1.5px solid #00CFAD',
          transition:   'transform 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
        }}
      />
    </>
  )
}

export default CustomCursor