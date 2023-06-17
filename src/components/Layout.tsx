import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="noise min-h-screen w-full relative overflow-x-hidden bg-surface">

      {/* Warm ambient glow — single source, top center */}
      <div className="fixed inset-0 z-0 pointer-events-none ambient-glow" />

      {/* Subtle vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0c0a09 100%)'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full"
        >
          {children}
        </motion.main>

        <footer className="mt-24 pt-8 border-t border-white/[0.04] flex items-center justify-between text-xs text-stone-600 font-mono">
          <span>
            &copy; {new Date().getFullYear()} Matan Ryngler
            {' · '}
            <a
              href="https://github.com/matanryngler/landing-page"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-400 transition-colors"
            >
              Source
            </a>
          </span>
          <span>Tel Aviv, IL</span>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
