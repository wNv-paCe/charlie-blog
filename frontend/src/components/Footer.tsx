import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-border p-6">
      <div className="mx-auto flex flex-col items-center max-w-6xl gap-3 px-4 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Charlie. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/wNv-paCe"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            <FaGithub className="size-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/kun-zheng-998a22303/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            <FaLinkedin className="size-5" />
          </a>

          <a
            href="mailto:kun.zheng@fastmail.com"
            className="transition-colors hover:text-foreground"
          >
            <FaEnvelope className="size-5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
