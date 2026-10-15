import type { BadgeVariant } from "../components/ui/Badge";
import type { Level, Team } from "../features/auth/data/currentUser";

export const teamVariants: Record<Team, BadgeVariant> = {
    SRE: "info",
    DevOps: "success",
    Backend: "neutral",
    Frontend: "warning",
};

export const levelVariants: Record<Level, BadgeVariant> = {
    Junior: "neutral",
    Mid: "info",
    Senior: "success",
    Lead: "warning",
};