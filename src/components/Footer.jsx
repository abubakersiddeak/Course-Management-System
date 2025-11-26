import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LearnHub</span>
            </Link>

            <p className="text-sm text-gray-400 mb-4">
              Empowering learners worldwide with quality online education.
            </p>

            {/* Social Static */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm hover:text-primary-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-sm hover:text-primary-400"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm hover:text-primary-400"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm hover:text-primary-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-sm hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#careers"
                  className="text-sm hover:text-primary-400"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-sm hover:text-primary-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-sm hover:text-primary-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#docs" className="text-sm hover:text-primary-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#help" className="text-sm hover:text-primary-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#community"
                  className="text-sm hover:text-primary-400"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link href="#status" className="text-sm hover:text-primary-400">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#privacy"
                  className="text-sm hover:text-primary-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-sm hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#cookies"
                  className="text-sm hover:text-primary-400"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#licenses"
                  className="text-sm hover:text-primary-400"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest courses and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white placeholder-gray-500"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © 2025 LearnHub. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <Link
              href="#privacy"
              className="text-sm text-gray-400 hover:text-primary-400"
            >
              Privacy
            </Link>
            <Link
              href="#terms"
              className="text-sm text-gray-400 hover:text-primary-400"
            >
              Terms
            </Link>
            <Link
              href="#cookies"
              className="text-sm text-gray-400 hover:text-primary-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
