/**
 * OrixButton
 * Extends shadcn Button with: loading spinner, left/right icon slots, full-width option.
 * @orixakit/orix-button
 */
"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface OrixButtonProps extends ButtonProps {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export function OrixButton({
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}: OrixButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn(fullWidth && "w-full", className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Button>
  )
}
