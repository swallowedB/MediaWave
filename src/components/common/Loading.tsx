import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

export default function Loading() {
  const sphereRef = useRef(null)
  const textRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sphereRef.current, {
        scale: 1.25,
        filter: 'blur(8px)',
        boxShadow: '0 0 80px rgba(160,130,255,0.8)',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(textRef.current, {
        text: 'Loading...',
        duration: 3,
        delay: 0.3,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 1.2,
        yoyo: true,
      })
    }, bgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={bgRef}
      className="w-dvw h-screen flex flex-col items-center justify-center bg-[#0b0d26] overflow-hidden relative"
    >
      <div className="absolute w-full h-full">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/30 rounded-full blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i} 6s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div
        ref={sphereRef}
        className="w-40 h-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(200,160,255,0.9),rgba(90,70,200,0.4))] shadow-[0_0_60px_rgba(150,100,255,0.5)] relative z-10"
      />

      <p
        ref={textRef}
        className="absolute bottom-50 font-sans mt-12 text-purple-200/80 text-sm tracking-[0.15em] font-bold z-20"
      ></p>
    </div>
  )
}
