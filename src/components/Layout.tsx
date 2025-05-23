"use client";

import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock user auth context (replace with NextAuth or similar)
const useAuth = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const login = () => setUser({ name: 'John Doe' });
  const logout = () => setUser(null);
  return { user, login, logout };
};

// Mock search data for GATE topics
const searchData = [
  'Data Structures', 'Algorithms', 'Operating Systems', 'Database Management',
  'Computer Networks', 'Compiler Design', 'Theory of Computation', 'Digital Logic',
];

// Dropdown menu items
const dropdownItems = {
  testSeries: [
    { label: 'Create Test', href: '/tests/create' },
    { label: 'View Tests', href: '/tests' },
    { label: 'Mock GATE', href: '/tests/mock' },
  ],
  analytics: [
    { label: 'Performance Dashboard', href: '/analytics/dashboard' },
    { label: 'Topic Insights', href: '/analytics/topics' },
    { label: 'Progress Report', href: '/analytics/report' },
  ],
};

// Animation variants
const leftFlipVariants = {
  hidden: { opacity: 0, x: -100, rotateY: 90 },
  visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: -100, rotateY: 90, transition: { duration: 0.3, ease: 'easeIn' } },
};

const rightFlipVariants = {
  hidden: { opacity: 0, x: 100, rotateY: -90 },
  visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: 100, rotateY: -90, transition: { duration: 0.3, ease: 'easeIn' } },
};

const upFlipVariants = {
  hidden: { opacity: 0, y: 20, rotateX: 90 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: 20, rotateX: 90, transition: { duration: 0.3, ease: 'easeIn' } },
};

const downFlipVariants = {
  initial: { y: 0, rotateX: 0 },
  hover: { y: 5, rotateX: -10, transition: { duration: 0.3, ease: 'easeOut' } },
};

const Layout = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Dark mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results
  const searchResults = searchQuery
    ? searchData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle search navigation
  const handleSearchSelect = (item: string) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    router.push(`/topics/${item.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Toggle dropdown
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 bg-blue-600/80 backdrop-blur-md shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
                variants={downFlipVariants}
                whileHover="hover"
              >
                GATEPro AI
              </motion.span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <motion.div variants={downFlipVariants} whileHover="hover">
                <Link
                  href="/"
                  className="text-white font-medium text-lg hover:text-green-300 transition-colors duration-300"
                >
                  Home
                </Link>
              </motion.div>
              <div className="relative group">
                <motion.button
                  onClick={() => toggleDropdown('testSeries')}
                  className="flex items-center gap-1 text-white font-medium text-lg hover:text-green-300 transition-colors duration-300"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'testSeries'}
                  variants={downFlipVariants}
                  whileHover="hover"
                >
                  Test Series
                  <motion.span
                    animate={{ rotate: activeDropdown === 'testSeries' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {activeDropdown === 'testSeries' && (
                    <motion.div
                      variants={upFlipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-3 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                      role="menu"
                    >
                      {dropdownItems.testSeries.map((item) => (
                        <motion.div
                          key={item.href}
                          variants={downFlipVariants}
                          whileHover="hover"
                        >
                          <Link
                            href={item.href}
                            className="block px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 rounded-lg mx-2 my-1"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative group">
                <motion.button
                  onClick={() => toggleDropdown('analytics')}
                  className="flex items-center gap-1 text-white font-medium text-lg hover:text-green-300 transition-colors duration-300"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'analytics'}
                  variants={downFlipVariants}
                  whileHover="hover"
                >
                  Analytics
                  <motion.span
                    animate={{ rotate: activeDropdown === 'analytics' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {activeDropdown === 'analytics' && (
                    <motion.div
                      variants={upFlipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-3 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                      role="menu"
                    >
                      {dropdownItems.analytics.map((item) => (
                        <motion.div
                          key={item.href}
                          variants={downFlipVariants}
                          whileHover="hover"
                        >
                          <Link
                            href={item.href}
                            className="block px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 rounded-lg mx-2 my-1"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <motion.button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-white hover:bg-blue-500/50 rounded-full transition-colors duration-200"
                  aria-label="Toggle search"
                  variants={downFlipVariants}
                  whileHover="hover"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      variants={rightFlipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full right-0 mt-3 w-72 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-xl p-4 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <Input
                        type="text"
                        placeholder="Search GATE topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-0 focus:ring-0 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        autoFocus
                      />
                      {searchResults.length > 0 && (
                        <ul className="mt-2 max-h-48 overflow-auto">
                          {searchResults.map((item) => (
                            <motion.li
                              key={item}
                              variants={downFlipVariants}
                              whileHover="hover"
                              className="px-3 py-2 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 cursor-pointer text-gray-800 dark:text-gray-100 rounded-lg transition-colors duration-200"
                              onClick={() => handleSearchSelect(item)}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-white hover:bg-blue-500/50 rounded-full transition-colors duration-200"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                variants={downFlipVariants}
                whileHover="hover"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <motion.button
                    onClick={() => toggleDropdown('user')}
                    className="flex items-center gap-2 text-white font-medium text-lg hover:text-green-300 transition-colors duration-300"
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === 'user'}
                    variants={downFlipVariants}
                    whileHover="hover"
                  >
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                    <motion.span
                      animate={{ rotate: activeDropdown === 'user' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                  <AnimatePresence>
                    {activeDropdown === 'user' && (
                      <motion.div
                        variants={upFlipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full right-0 mt-3 w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                        role="menu"
                      >
                        <motion.div variants={downFlipVariants} whileHover="hover">
                          <Link
                            href="/profile"
                            className="block px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 rounded-lg mx-2 my-1"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Profile
                          </Link>
                        </motion.div>
                        <motion.button
                          variants={downFlipVariants}
                          whileHover="hover"
                          onClick={() => {
                            logout();
                            setActiveDropdown(null);
                            router.push('/');
                          }}
                          className="w-full text-left px-4 py-3 text-gray-800 dark:text-gray-100 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 rounded-lg mx-2 my-1 flex items-center gap-2"
                          role="menuitem"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <motion.div variants={downFlipVariants} whileHover="hover">
                    <Link
                      href="/login"
                      className="text-white font-medium text-lg hover:text-green-300 transition-colors duration-300"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div variants={downFlipVariants} whileHover="hover">
                    <Link
                      href="/signup"
                      className="text-white font-medium text-lg hover:text-green-300 transition-colors duration-300"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden p-2 text-white hover:bg-blue-500/50 rounded-full transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              variants={downFlipVariants}
              whileHover="hover"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={leftFlipVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="md:hidden bg-blue-700/90 backdrop-blur-lg mt-2 rounded-xl overflow-hidden shadow-lg"
                role="menu"
              >
                <motion.div variants={downFlipVariants} whileHover="hover">
                  <Link
                    href="/"
                    className="block px-4 py-3 text-white hover:bg-blue-600/80 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                  >
                    Home
                  </Link>
                </motion.div>
                <div>
                  <motion.button
                    className="w-full text-left px-4 py-3 text-white hover:bg-blue-600/80 flex justify-between items-center transition-colors duration-200"
                    onClick={() => toggleDropdown('testSeries')}
                    aria-expanded={activeDropdown === 'testSeries'}
                    variants={downFlipVariants}
                    whileHover="hover"
                  >
                    Test Series
                    <motion.span
                      animate={{ rotate: activeDropdown === 'testSeries' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                  {activeDropdown === 'testSeries' && (
                    <motion.div
                      variants={upFlipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="pl-4"
                    >
                      {dropdownItems.testSeries.map((item) => (
                        <motion.div
                          key={item.href}
                          variants={downFlipVariants}
                          whileHover="hover"
                        >
                          <Link
                            href={item.href}
                            className="block px-4 py-3 text-white hover:bg-blue-600/80 transition-colors duration-200"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
                <div>
                  <motion.button
                    className="w-full text-left px-4 py-3 text-white hover:bg-blue-600/80 flex justify-between items-center transition-colors duration-200"
                    onClick={() => toggleDropdown('analytics')}
                    aria-expanded={activeDropdown === 'analytics'}
                    variants={downFlipVariants}
                    whileHover="hover"
                  >
                    Analytics
                    <motion.span
                      animate={{ rotate: activeDropdown === 'analytics' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                  {activeDropdown === 'analytics' && (
                    <motion.div
                      variants={upFlipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="pl-4"
                    >
                      {dropdownItems.analytics.map((item) => (
                        <motion.div
                          key={item.href}
                          variants={downFlipVariants}
                          whileHover="hover"
                        >
                          <Link
                            href={item.href}
                            className="block px-4 py-3 text-white hover:bg-blue-600/80 transition-colors duration-200"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
                <motion.div
                  className="px-4 py-3"
                  variants={downFlipVariants}
                  whileHover="hover"
                >
                  <Input
                    type="text"
                    placeholder="Search GATE topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-blue-800/50 text-white placeholder-gray-400 border-0 focus:ring-0"
                  />
                  {searchResults.length > 0 && (
                    <ul className="mt-2 max-h-48 overflow-auto bg-blue-800/80 rounded-lg">
                      {searchResults.map((item) => (
                        <motion.li
                          key={item}
                          variants={downFlipVariants}
                          whileHover="hover"
                          className="px-3 py-2 hover:bg-blue-700/80 cursor-pointer text-white rounded-lg"
                          onClick={() => {
                            handleSearchSelect(item);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
                <motion.button
                  className="w-full text-left px-4 py-3 text-white hover:bg-blue-600/80 flex items-center gap-2 transition-colors duration-200"
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    setIsMobileMenuOpen(false);
                  }}
                  variants={downFlipVariants}
                  whileHover="hover"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </motion.button>
                {user ? (
                  <>
                    <motion.div variants={downFlipVariants} whileHover="hover">
                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-white hover:bg-blue-600/80 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                        role="menuitem"
                      >
                        Profile
                      </Link>
                    </motion.div>
                    <motion.button
                      className="w-full text-left px-4 py-3 text-white hover:bg-blue-600/80 flex items-center gap-2 transition-colors duration-200"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                        router.push('/');
                      }}
                      variants={downFlipVariants}
                      whileHover="hover"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.div variants={downFlipVariants} whileHover="hover">
                      <Link
                        href="/login"
                        className="block px-4 py-3 text-white hover:bg-blue-600/80 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                        role="menuitem"
                      >
                        Login
                      </Link>
                    </motion.div>
                    <motion.div variants={downFlipVariants} whileHover="hover">
                      <Link
                        href="/signup"
                        className="block px-4 py-3 text-white hover:bg-blue-600/80 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                        role="menuitem"
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-800 text-white p-6 text-center">
        <motion.p
          variants={downFlipVariants}
          whileHover="hover"
          className="text-sm"
        >
          © 2025 GATEPro AI. All rights reserved.
        </motion.p>
        <div className="mt-3 flex justify-center gap-6">
          <motion.div variants={downFlipVariants} whileHover="hover">
            <Link href="/about" className="text-gray-300 hover:text-green-300 transition-colors duration-200">
              About
            </Link>
          </motion.div>
          <motion.div variants={downFlipVariants} whileHover="hover">
            <Link href="/contact" className="text-gray-300 hover:text-green-300 transition-colors duration-200">
              Contact
            </Link>
          </motion.div>
          <motion.div variants={downFlipVariants} whileHover="hover">
            <Link href="/privacy" className="text-gray-300 hover:text-green-300 transition-colors duration-200">
              Privacy Policy
            </Link>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;