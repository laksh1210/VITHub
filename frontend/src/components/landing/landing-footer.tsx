import Link from "next/link";
import { Code, MessageCircle, Mail } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">V</span>
            </div>
            <span className="font-bold text-lg tracking-tight">VITHub</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            The AI-Powered Campus Digital Twin.
          </p>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <Code className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="mailto:hello@vithub.local" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} VITHub. All rights reserved.
      </div>
    </footer>
  );
}
