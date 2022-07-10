import { useEffect, useRef, useState } from "react"

export const useSize = () => {
  const ref = useRef();
  const [size, setSize] = useState({ x: 0, y: 0, height: 0, width: 0 });
  useEffect(() => {
    const onResize = () => {
      const { x, y, height, width } = ref.current.getBoundingClientRect()
      setSize({ x, y, height, width })
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => { window.removeEventListener("resize", onResize) }
  }, [])
  return [ref, size]
}