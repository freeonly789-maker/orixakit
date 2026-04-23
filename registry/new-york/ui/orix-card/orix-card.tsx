/**
 * OrixCard
 * Card with header slot, body, and optional footer. Supports hover elevation.
 * @orixakit/orix-card
 */
"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface OrixCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  hover?: boolean
  footer?: React.ReactNode
}

export function OrixCard({
  title,
  description,
  hover = false,
  footer,
  children,
  className,
  ...props
}: OrixCardProps) {
  return (
    <Card
      className={cn(
        hover && "transition-shadow hover:shadow-lg cursor-pointer",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="px-6 py-4 border-b">
          {title && <h3 className="font-semibold text-sm">{title}</h3>}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-4 border-t bg-muted/50">{footer}</div>}
    </Card>
  )
}
