import { Badge } from "../ui/Badge";
import { navigationItems } from "../../config/navigation";
import { teamVariants, levelVariants } from "../../config/badgeVariants";
import { currentUser } from "../../features/auth/data/currentUser";
import { Avatar } from "../ui/Avatar";

export function Navbar() {
    return (
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-3 shadow-sm">
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                        &gt;_
                    </div>
                    <span className="text-xl font-bold text-slate-900">DevDesk</span>
                </div>

                <nav>
                    <ul className="flex items-center gap-6">
                        {navigationItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.path}
                                    className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-slate-900">
                        {currentUser.name}
                    </span>
                    <div className="flex gap-1">
                        <Badge variant={teamVariants[currentUser.team]}>
                            {currentUser.team}
                        </Badge>
                        <Badge variant={levelVariants[currentUser.level]}>
                            {currentUser.level}
                        </Badge>
                    </div>
                </div>

                <Avatar name={currentUser.name} />
            </div>
        </header>
    );
}