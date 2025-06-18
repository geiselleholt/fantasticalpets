export default function Footer() {
  return (
          <footer className="bg-gradient-to-r from-purple-400 via-sky-500 to-purple-600 p-4 shadow-lg w-full z-50">
      <p className="text-white text-sm">
        &copy; {new Date().getFullYear()} Made by {"  "}
        <a
          href="linkedin.com/in/geiselle-holt"
          className="text-white text-lg font-bold hover:text-blue-300 font-semibold transition-colors duration-200"
        >
          Geiselle Holt
        </a>
      </p>
    </footer>
  );
}
