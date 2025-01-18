import React from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return <div className={cn("rounded-lg border bg-card text-card-foreground", className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-base leading-normal text-gray-600", className)} {...props} />
}