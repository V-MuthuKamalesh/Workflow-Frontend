import FooterLinks from "./FooterLinks";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white rounded-t-3xl min-h-60 mt-2 p-12">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-bold text-purple-400">WorkFlow</h1>
          <p className="mt-4 text-lg text-gray-400">
            Simplify your workflow management with our intuitive tools. We
            provide solutions tailored to your business needs to help you work
            smarter and faster.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-between text-gray-400 space-x-6 space-y-6 md:space-y-0">
          <FooterLinks links={["About Us", "Contact", "Careers", "Pricing"]} />
          <FooterLinks links={["Work Management", "Dev", "CRM", "Service"]} />
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-gray-300">Stay Connected</h3>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-purple-500 transition duration-300"
          >
            <Facebook fontSize="large" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-500 transition duration-300"
          >
            <Twitter fontSize="large" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-500 transition duration-300"
          >
            <LinkedIn fontSize="large" />
          </a>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-gray-300">
          Subscribe to Our Newsletter
        </h3>
        <form className="mt-4 flex justify-center items-center space-x-4">
          <input
            type="email"
            placeholder="Your email address"
            className="p-2 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-purple-600 px-6 py-2 rounded-lg text-white hover:bg-purple-700"
          >
            Subscribe
          </button>
        </form>
      </div>

      <p className="mt-12 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} WorkFlow. All rights reserved.
      </p>
    </footer>
  );
}
