import FooterLinks from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border border-gray-100 rounded-t-3xl min-h-60 mt-2 p-10">
      <div className="flex items-center justify-around">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-gray-800">WorkFlow</h1>
          <p className="mt-4 text-gray-500">
            Simplify your workflow management with our intuitive tools. We
            provide solutions tailored to your business needs to help you work
            smarter and faster.
          </p>
        </div>

        <div className="flex justify-between space-x-10 text-gray-600">
          <FooterLinks links={["About Us", "Contact", "Careers", "Pricing"]} />
          <FooterLinks links={["Work Management", "Dev", "CRM", "Service"]} />
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} WorkFlow. All rights reserved.
      </p>
    </footer>
  );
}
