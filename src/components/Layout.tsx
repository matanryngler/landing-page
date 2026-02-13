import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-term-bg overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-term-surface border border-term-border rounded-xl overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-term-chrome border-b border-term-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="flex-1 text-center text-xs text-term-muted font-mono">matan@platform:~</span>
            <div className="w-[52px]" /> {/* Balance the dots */}
          </div>

          {/* Terminal content */}
          <div className="p-6 sm:p-8 md:p-10">
            {children}
          </div>
        </motion.div>

        {/* Footer — outside terminal */}
        <footer className="mt-6 flex items-center justify-between text-[11px] text-term-dim font-mono px-2">
          <span>
            &copy; {new Date().getFullYear()} Matan Ryngler
            {' · '}
            <a
              href="https://github.com/matanryngler/landing-page"
              target="_blank"
              rel="noopener noreferrer"
              className="text-term-muted hover:text-term-green transition-colors"
            >
              source
            </a>
          </span>
          <span>Tel Aviv, IL</span>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
