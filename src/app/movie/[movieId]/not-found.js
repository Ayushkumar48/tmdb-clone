import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Movie Not Found</h2>
      <p className="text-gray-700 mb-6">
        The movie you are looking for does not exist or could not be loaded.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  );
}
