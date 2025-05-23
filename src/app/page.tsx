"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BookOpen,
  BarChart2,
  Users,
  Star,
  DollarSign,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[90vh] text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 dark:bg-gray-800/10 backdrop-blur-2xl rounded-full scale-150 opacity-60 animate-pulse" />
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 z-10 leading-tight"
        >
          Master GATE with GATEPro AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative text-base sm:text-lg md:text-2xl text-gray-700 dark:text-gray-200 mb-10 max-w-3xl z-10"
        >
          A free, AI-powered platform to help students, teachers, and admins excel in GATE with personalized test series, analytics, and role-based dashboards.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 z-10"
        >
          <Button asChild>
            <Link
              href="/login"
              className="relative px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-blue-700/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="/signup"
              className="relative px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl text-lg font-semibold hover:bg-green-500 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-green-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16"
        >
          Why Choose GATEPro AI?
        </motion.h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="w-12 h-12 text-blue-500" />,
              title: "Personalized Test Series",
              description:
                "Create and take GATE-like tests tailored to your strengths and weaknesses, powered by AI-driven insights.",
            },
            {
              icon: <BarChart2 className="w-12 h-12 text-green-500" />,
              title: "Advanced Analytics",
              description:
                "Monitor your progress with detailed performance analytics and receive AI-powered recommendations.",
            },
            {
              icon: <Users className="w-12 h-12 text-blue-500" />,
              title: "Role-Based Access",
              description:
                "Seamless experience for students, teachers, and admins with dedicated dashboards and tools.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group"
              role="article"
              aria-labelledby={`feature-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-green-100/20 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3
                  id={`feature-${index}`}
                  className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3"
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16"
        >
          What Our Users Say
        </motion.h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Ananya Sharma",
              role: "GATE Aspirant",
              quote:
                "GATEPro AI's personalized tests helped me identify my weak areas and improve my score by 20%!",
              rating: 5,
            },
            {
              name: "Prof. Rajesh Kumar",
              role: "Teacher",
              quote:
                "The analytics dashboard is a game-changer for tracking student progress and tailoring my teaching.",
              rating: 4,
            },
            {
              name: "Vikram Singh",
              role: "Admin",
              quote:
                "Managing test schedules and student data has never been easier. GATEPro AI is intuitive and efficient.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16"
        >
          Pricing Plans
        </motion.h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Free",
              price: "$0",
              description: "Perfect for getting started with GATE preparation.",
              features: [
                "10 Practice Tests",
                "Basic Analytics",
                "Community Support",
              ],
              buttonText: "Get Started",
              buttonLink: "/signup",
            },
            {
              title: "Pro",
              price: "$9.99/mo",
              description: "Advanced tools for serious GATE aspirants.",
              features: [
                "Unlimited Practice Tests",
                "Advanced Analytics",
                "Priority Support",
                "Personalized Recommendations",
              ],
              buttonText: "Go Pro",
              buttonLink: "/signup",
              highlighted: true,
            },
            {
              title: "Institution",
              price: "Contact Us",
              description: "Tailored solutions for educational institutions.",
              features: [
                "Custom Test Creation",
                "Admin Dashboards",
                "Bulk User Management",
                "Dedicated Support",
              ],
              buttonText: "Contact Sales",
              buttonLink: "/contact",
            },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                plan.highlighted ? "border-2 border-blue-500" : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {plan.title}
              </h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {plan.price}
                {plan.price !== "Contact Us" && (
                  <span className="text-sm font-normal">/month</span>
                )}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {plan.description}
              </p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant={plan.highlighted ? "default" : "outline"}>
                <Link
                  href={plan.buttonLink}
                  className="w-full py-3 text-lg font-semibold"
                >
                  {plan.buttonText}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: "What is GATEPro AI?",
              answer:
                "GATEPro AI is a free, AI-powered platform designed to help students, teachers, and admins prepare for GATE with personalized test series, advanced analytics, and role-based dashboards.",
            },
            {
              question: "Is GATEPro AI really free?",
              answer:
                "Yes, GATEPro AI offers a free plan with access to practice tests, basic analytics, and community support. We also offer premium plans for advanced features.",
            },
            {
              question: "Can teachers and admins use GATEPro AI?",
              answer:
                "Absolutely! GATEPro AI provides dedicated dashboards for teachers to create tests and track student progress, and for admins to manage schedules and user data.",
            },
            {
              question: "How does the AI personalization work?",
              answer:
                "Our AI analyzes your performance on practice tests to identify strengths and weaknesses, then tailors future tests and recommendations to improve your preparation.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 flex justify-between items-center text-left text-gray-900 dark:text-gray-100 font-semibold"
              >
                {faq.question}
                <HelpCircle
                  className={`w-6 h-6 transition-transform duration-300 ${
                    faqOpen === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {faqOpen === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 pt-0 text-gray-600 dark:text-gray-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-6"
        >
          Ready to Ace GATE?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
        >
          Join thousands of students, teachers, and admins using GATEPro AI to achieve their GATE goals. Sign up today for free!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button asChild>
            <Link
              href="/signup"
              className="relative px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </span>
              <span className="absolute inset-0 bg-gray-200/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">GATEPro AI</h3>
            <p className="text-sm">
              Empowering GATE aspirants with AI-driven tools for success.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-blue-400 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://twitter.com/gateproai"
                  className="hover:text-blue-400 transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/gateproai"
                  className="hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@gatepro.ai"
                  className="hover:text-blue-400 transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">
          <p>© {new Date().getFullYear()} GATEPro AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}