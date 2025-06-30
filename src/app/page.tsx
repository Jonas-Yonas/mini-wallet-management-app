import Link from "next/link";
import {
  FiArrowRight,
  FiDollarSign,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-white scroll-smooth">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/** Hero section */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            <span className="text-green-600">FarmWallet</span> – Financial Tools
            for Agri-Business
          </h1>

          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Track farm expenses, manage harvest income, and grow your
            agricultural business with simple financial tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              title="Start using FarmWallet"
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              Get Started
              <FiArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="#features"
              title="Learn about our features"
              className="border-2 border-green-600 text-green-600 hover:bg-green-100 active:bg-green-200 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              Our Features
            </Link>
          </div>
        </div>

        {/** Feature cards */}
        <div
          id="features"
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Crop Expense Tracking",
              description: "Record inputs, labor costs, and equipment expenses",
              icon: <FiDollarSign className="text-green-600 text-3xl" />,
              href: "/transactions/transaction-form",
            },
            {
              title: "Transaction History",
              description:
                "View all past income and expense records in one place",
              icon: <FiTrendingUp className="text-green-600 text-3xl" />,
              href: "/transactions/history",
            },
            {
              title: "Farm Budgeting",
              description:
                "Plan seasons ahead with visual summaries and analytics",
              icon: <FiShield className="text-green-600 text-3xl" />,
              href: "/login",
            },
          ].map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-full bg-green-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-700">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/** Testimonial */}
        <div className="mt-20 max-w-4xl mx-auto bg-green-100 rounded-xl p-8 border border-green-200 shadow-inner">
          <blockquote className="text-center">
            <p className="text-lg italic text-gray-800 mb-5">
              &quot;FarmWallet helped me understand my coffee farm&apos;s
              finances better than ever. Now I can plan for next season&apos;s
              seedlings with confidence.&quot;
            </p>
            <footer className="text-green-600 font-semibold">
              — Maria Rodriguez, Smallholder Farmer
            </footer>
          </blockquote>
        </div>

        {/** CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-7">
            Ready to grow your farm&apos;s financial health?
          </h2>
          <Link
            href="/login"
            className="inline-block bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-10 py-3 rounded-lg text-lg font-semibold shadow-lg transition-colors"
          >
            Start For Free
          </Link>
        </div>
      </div>
    </main>
  );
}
