import type { ReactNode } from "react";

export type BadgeVariant = "neutral" | "info" | "success" | "warning";

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
    neutral: "bg-gray-100 text-gray-700",
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
    return (
        <span
            className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${variantClasses[variant]}`}
        >
            {children}
        </span>
    );
}