"use client" // Thêm directive này cho Client Component

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional custom class name
   */
  className?: string
  /**
   * Optional ref for the input element
   */
  ref?: React.Ref<HTMLInputElement>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
      setIsMounted(true)
    }, [])

    if (!isMounted) {
      // Return a placeholder during SSR to avoid hydration mismatch
      return (
        <div 
          className={cn(
            "h-10 w-full rounded-md bg-gray-100 animate-pulse",
            className
          )}
        />
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200 ease-in-out",
          className
        )}
        ref={ref}
        suppressHydrationWarning // Tránh hydration warnings
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }