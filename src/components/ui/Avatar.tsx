function getInitials(name: string, maxLetters = 2): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, maxLetters)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
}

interface AvatarProps {
    name: string;
}

export function Avatar({ name }: AvatarProps) {
    const initials = getInitials(name) || "?";

    return (
        <div
            className="flex size-10 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white"
            title={name}
            aria-label={name}
        >
            {initials}
        </div>
    );
}