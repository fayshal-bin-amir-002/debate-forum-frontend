// components/Footer.tsx
import Link from "next/link";
import { Facebook, Linkedin, Mail, Phone } from "lucide-react";
import Container from "./Container";

export function Footer() {
  return (
    <footer className="bg-muted/30 py-10 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Logo & About */}
          <div>
            <h2 className="text-xl font-bold mb-2">Debate Forum</h2>
            <p className="text-muted-foreground">
              A platform to express your opinions, support your stance, and rise
              through respectful debates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <Link href="/debates">Debates</Link>
              </li>
              <li>
                <Link href="/leader-board">Leaderboard</Link>
              </li>
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +8801755288840
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> foyshalbinamir@gmail.com
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <ul className="flex gap-4 text-muted-foreground">
              <li>
                <Link
                  href="https://www.facebook.com/fayshal.bin.amir.02"
                  target="_blank"
                >
                  <Facebook />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/fayshal-bin-amir/"
                  target="_blank"
                >
                  <Linkedin />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 text-muted-foreground text-xs">
          © {new Date().getFullYear()} DebateSphere. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
