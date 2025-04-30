"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        selected: "bg-zinc-700 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  value: string
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, value, ...props }, ref) => {
    return (
      <button
        className={cn(chipVariants({ variant, className }))}
        ref={ref}
        value={value}
        {...props}
      />
    )
  }
)
Chip.displayName = "Chip"

interface ChipGroupProps {
  children: React.ReactNode
  value: string
  onValueChange: (value: string) => void
  className?: string
}

const ChipGroup = ({ children, value, onValueChange, className }: ChipGroupProps) => {
  // Clone children and add selected state
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<ChipProps>(child) && child.type === Chip) {
      const chipValue = child.props.value
      return React.cloneElement(child, {
        variant: value === chipValue ? "selected" : "default",
        onClick: () => onValueChange(chipValue),
      })
    }
    return child
  })

  return (
    <div className={cn("flex gap-2", className)}>
      {childrenWithProps}
    </div>
  )
}

export { Chip, ChipGroup }
