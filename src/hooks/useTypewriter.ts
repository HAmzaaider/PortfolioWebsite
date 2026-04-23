import { useState, useEffect } from 'react'

interface UseTypewriterOptions {
  words: string[]        // array of words to cycle through
  typeSpeed?: number     // ms per character when typing
  deleteSpeed?: number   // ms per character when deleting
  pauseDuration?: number // ms to pause after fully typing a word
}

const useTypewriter = ({
  words,
  typeSpeed    = 100,
  deleteSpeed  = 60,
  pauseDuration = 1800,
}: UseTypewriterOptions) => {
  const [displayText, setDisplayText]     = useState<string>('')
  const [wordIndex, setWordIndex]         = useState<number>(0)
  const [isDeleting, setIsDeleting]       = useState<boolean>(false)
  const [isPausing, setIsPausing]         = useState<boolean>(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    // ── Pause phase: word is fully typed, wait before deleting ──
    if (isPausing) {
      const pauseTimer = setTimeout(() => {
        setIsPausing(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }

    // ── Deleting phase: remove one character at a time ───────────
    if (isDeleting) {
      if (displayText.length === 0) {
        // Word fully deleted — move to next word
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }
      const deleteTimer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, deleteSpeed)
      return () => clearTimeout(deleteTimer)
    }

    // ── Typing phase: add one character at a time ────────────────
    if (displayText === currentWord) {
      // Word fully typed — start pause
      setIsPausing(true)
      return
    }

    const typeTimer = setTimeout(() => {
      setDisplayText(currentWord.slice(0, displayText.length + 1))
    }, typeSpeed)

    return () => clearTimeout(typeTimer)
  }, [displayText, wordIndex, isDeleting, isPausing, words, typeSpeed, deleteSpeed, pauseDuration])

  return { displayText, isDeleting }
}

export default useTypewriter