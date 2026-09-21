import Link from "next/link";

export default function Header() {
  return (
    <header>
        <h1>TasksApp</h1>
        <nav>
            <Link href='/tasks'>Tareas</Link>
        </nav>
    </header>
  )
}
