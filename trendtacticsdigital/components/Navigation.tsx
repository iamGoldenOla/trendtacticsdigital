'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Dark mode logic
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ttDarkMode') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = saved === '1' || (saved === null && prefersDark);
    setDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ttDarkMode', '1');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ttDarkMode', '0');
      }
      return next;
    });
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-[#00FFFF] text-[#0A1E3F] px-4 py-2 rounded z-[100]"
      >
        Skip to main content
      </a>

      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0A1E3F]/95 backdrop-blur-lg shadow-lg border-b border-[#00FFFF]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#00FFFF] rounded-lg flex items-center justify-center shadow-md shadow-cyan-400/30">
              <span className="text-[#0A1E3F] font-bold text-lg sm:text-xl">T</span>
            </div>
            <span
              className={`font-bold text-lg sm:text-xl transition-colors ${
                isScrolled
                  ? 'text-[#0A1E3F] dark:text-white'
                  : 'text-white'
              }`}
            >
              Trendtactics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-11 xl:space-x-16">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm xl:text-base font-medium transition-colors relative group ${
                  isActive(item.href)
                    ? isScrolled
                      ? 'text-[#0047FF] dark:text-[#00FFFF]'
                      : 'text-[#00FFFF]'
                    : isScrolled
                      ? 'text-[#0A1E3F] dark:text-white/90 hover:text-[#0047FF] dark:hover:text-[#00FFFF]'
                      : 'text-white/90 hover:text-[#00FFFF]'
                }`}
              >
                {item.name}
                {/* Active underline indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#00FFFF] transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Dark Mode */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/contact"
              className="px-5 py-2 bg-[#00FFFF] text-[#0A1E3F] font-semibold rounded-full hover:bg-[#40E0D0] transition-all duration-200 shadow-lg hover:shadow-cyan-400/40 text-sm"
            >
              Get Started
            </Link>
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-full border transition-colors ${
                isScrolled
                  ? 'border-[#0A1E3F]/20 dark:border-white/20 text-[#0A1E3F] dark:text-white hover:bg-[#0A1E3F]/10 dark:hover:bg-white/10'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors z-[60]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen
                    ? 'rotate-45 translate-y-[9px] bg-[#0A1E3F]'
                    : isScrolled
                      ? 'bg-[#0A1E3F] dark:bg-white'
                      : 'bg-white'
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isMenuOpen
                    ? 'opacity-0 scale-0'
                    : isScrolled
                      ? 'bg-[#0A1E3F] dark:bg-white'
                      : 'bg-white'
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 origin-center ${
                  isMenuOpen
                    ? '-rotate-45 -translate-y-[9px] bg-[#0A1E3F]'
                    : isScrolled
                      ? 'bg-[#0A1E3F] dark:bg-white'
                      : 'bg-white'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-[320px] h-full bg-white dark:bg-[#0A1E3F] z-[55] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto">
          {/* Nav Links */}
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#00FFFF]/10 text-[#0047FF] dark:text-[#00FFFF] font-semibold border-l-4 border-[#00FFFF]'
                    : 'text-[#0A1E3F] dark:text-white/90 hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200 dark:border-white/10" />

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col space-y-3">
            <Link
              href="/contact"
              className="block w-full px-6 py-3 bg-[#00FFFF] text-[#0A1E3F] font-semibold rounded-full text-center hover:bg-[#40E0D0] transition-colors shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>

          {/* Dark mode toggle for mobile */}
          <div className="mt-6 flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 rounded-lg">
            <span className="text-sm font-medium text-[#0A1E3F] dark:text-white/80">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`relative w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-[#00FFFF]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Mobile Footer Info */}
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
            <p className="text-xs text-gray-500 dark:text-white/50 text-center">
              © {new Date().getFullYear()} Trendtactics Digital
            </p>
          </div>
        </div>
      </div>
    </>
  );
}