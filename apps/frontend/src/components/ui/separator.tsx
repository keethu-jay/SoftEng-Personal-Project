"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SeparatorProps
    extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical"
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    ({ className, orientation = "horizontal", ...props }, ref) => {
        const classes =
            orientation === "vertical"
                ? "w-[1px] h-full bg-gray-200"
                : "h-[1px] w-full bg-gray-200"

        return (
            <div
                ref={ref}
                className={cn(classes, className)}
                {...props}
            />
        )
    }
)

Separator.displayName = "Separator"

export { Separator }
