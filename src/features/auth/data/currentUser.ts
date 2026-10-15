export type Team = "SRE" | "DevOps" | "Backend" | "Frontend";
export type Level = "Junior" | "Mid" | "Senior" | "Lead";

export interface CurrentUser {
    name: string;
    team: Team;
    level: Level;
}

export const currentUser: CurrentUser = {
    name: "Carlos M.",
    team: "SRE",
    level: "Lead",
};