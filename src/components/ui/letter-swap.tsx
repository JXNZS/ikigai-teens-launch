'use client'

import { type CSSProperties } from "react"
import { type AnimationOptions } from "framer-motion"

interface TextProps {
  label: string
  reverse?: boolean
  transition?: AnimationOptions
  staggerDuration?: number
  staggerFrom?: "first" | "last" | "center" | number
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export function LetterSwapForward({
  label,
  reverse: _reverse = true,
  transition: _transition = {
    type: "spring",
    duration: 0.7,
  },
  staggerDuration: _staggerDuration = 0.03,
  staggerFrom: _staggerFrom = "first",
  className,
  onClick,
  ...props
}: TextProps) {
  return (
    <span
      className={`flex justify-center items-center relative leading-none ${className ?? ""}`}
      onClick={onClick}
      {...props}
    >
      <span className="max-w-full whitespace-normal break-words text-center leading-none md:whitespace-pre">
        {label}
      </span>
    </span>
  )
}

export function LetterSwapPingPong({
  label,
  reverse: _reverse = true,
  transition: _transition = {
    type: "spring",
    duration: 0.7,
  },
  staggerDuration: _staggerDuration = 0.03,
  staggerFrom: _staggerFrom = "first",
  className,
  onClick,
  ...props
}: TextProps) {
  return (
    <span
      className={`flex justify-center items-center relative leading-none ${className ?? ""}`}
      onClick={onClick}
      {...props}
    >
      <span className="max-w-full whitespace-normal break-words text-center leading-none md:whitespace-pre">
        {label}
      </span>
    </span>
  )
}
