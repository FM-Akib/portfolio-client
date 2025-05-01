import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="py-10 border-t bg-muted/20">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-primary">
              Portfolio
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              A passionate software engineer building exceptional digital experiences and solving complex problems.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/#achievements"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-primary p-0">
              Privacy Policy
            </Button>
            <span className="text-muted-foreground mx-2">•</span>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-primary p-0">
              Terms of Service
            </Button>
            <span className="text-muted-foreground mx-2">•</span>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-primary p-0" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
