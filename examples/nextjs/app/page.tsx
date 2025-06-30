import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p className="mb-8">
        The email generation tool has been moved.
      </p>
      <Link href="/multi-agent-workflow" className="px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
        Go to AI Email Generator
      </Link>
    </div>
  );
} 