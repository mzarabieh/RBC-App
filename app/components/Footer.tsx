import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YorkULogo_Ver_rgb_square.jpg-ZvlzMucJQlqSWHvkONm0gb14k7RAvC.jpeg"
                alt="York University Logo"
                width={60}
                height={60}
                className="h-12 w-auto"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rbc%20logo-ligYgsycijbeKDLJmcCXjrVXwhjqtA.webp"
                alt="RBC Logo"
                width={60}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p>Empowering newcomers with financial knowledge and skills.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="hover:text-york-red">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/banking" className="hover:text-york-red">
                  Banking
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-york-red">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-york-red">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/game" className="hover:text-york-red">
                  Game
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-york-red">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-york-red">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-york-red">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-york-red">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="space-y-2">
              <p>Email: support@yorku-rbc.ca</p>
              <p>Phone: (416) 123-4567</p>
              <div className="mt-4">
                <p className="text-sm">Download our app:</p>
                <div className="flex space-x-2 mt-2">
                  <Link href="#" className="text-york-red hover:underline">
                    iOS
                  </Link>
                  <Link href="#" className="text-york-red hover:underline">
                    Android
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>&copy; 2025 YorkU RBC Financial Literacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

