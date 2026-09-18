// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 p-4 mt-8">
      <div className="max-w-4xl mx-auto text-center text-sm">
        © {new Date().getFullYear()} Kumasi Ward — Sacrament Meeting Planner
      </div>
    </footer>
  );
}
