import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="border-t border-base-300 bg-base-100">
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-base-content/70">
        <p>© {CURRENT_YEAR} YieldRate. All rights reserved.</p>
        <p>
          Created by{" "}
          <Link
            href="https://amauryvasquez.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary font-medium"
            aria-label="Visit amvasdev website"
          >
            amvasdev
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
