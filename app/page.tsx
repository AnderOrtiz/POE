/* Importamos nuestro componente Flower */
import Flower from "./components/Flower";

export default function Home() {
  return (
    <main>
      <h1>🌻 Flores Amarillas 🌻</h1>
      <p>Una pequeña sorpresa hecha con Next.js 💛</p>

      {/* Contenedor que tendrá todas nuestras flores */}
      <div className="garden">
        <Flower />
        <Flower />
        <Flower />
        <Flower />
        <Flower />
      </div>
    </main>
  );
}