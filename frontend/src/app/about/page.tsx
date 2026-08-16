export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-3xl font-bold">About Me</h1>

      <section className="mt-8 space-y-6 p-4">
        {/* Introduction */}
        <div className="p-4">
          <h2 className="text-xl font-semibold">Hi, I&apos;m Charlie</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome to my personal blog. I use this space to share my thoughts,
            projects, and things I&apos;ve learned.
          </p>
        </div>

        {/* About This Blog */}
        <div className="p-4">
          <h2 className="text-xl font-semibold">About This Blog</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This blog is where I document my learning journey, technical notes,
            and personal projects.
          </p>
        </div>

        {/* Technologies */}
        <div className="p-4">
          <h2 className="text-xl font-semibold">Technologies</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            I&apos;m currently working with technologies such as Python,
            FastAPI, Next.js, and PostgreSQL.
          </p>
        </div>

        {/* Contact */}
        <div className="p-4">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You can find me on GitHub or contact me by email.
          </p>
        </div>
      </section>
    </div>
  );
}
