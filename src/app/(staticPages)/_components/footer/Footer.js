import FooterLinks from "./FooterLinks";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white rounded-t-3xl min-h-60 mt-2 p-8 sm:p-12">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-8 sm:space-y-0">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-400">WorkFlow</h1>
          <p className="mt-4 text-base sm:text-lg text-gray-400">Simplify your workflow management with our intuitive tools. We provide solutions tailored to your business needs to help you work smarter and faster.</p>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-between text-gray-400 space-x-6 space-y-6 sm:space-y-0">
          <FooterLinks links={["About Us", "Contact", "Careers", "Pricing"]} />
          <FooterLinks links={["Work Management", "Dev", "CRM", "Service"]} />
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-300">Stay Connected</h3>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
            <Facebook size={28} />
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
            <Twitter size={28} />
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
            <Linkedin size={28} />
          </a>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-300">Subscribe to Our Newsletter</h3>
        <form className="mt-4 flex flex-col sm:flex-row justify-center items-center space-x-4 sm:space-x-6">
          <input type="email" placeholder="Your email address" className="p-2 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none sm:w-72" />
          <button type="submit" className="bg-purple-600 px-6 py-2 rounded-lg text-white hover:bg-purple-700 sm:w-auto mt-4 sm:mt-0">
            Subscribe
          </button>
        </form>
      </div>

      <p className="mt-12 text-sm text-gray-500 text-center">© {new Date().getFullYear()} WorkFlow. All rights reserved.</p>
    </footer>
  );
}
