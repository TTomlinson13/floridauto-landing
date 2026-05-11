import { Link } from 'react-router-dom'

function App() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logos/floridauto/tc-logo-medium.jpg" alt="FloridAuto" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-blue-900">FloridAuto.com</h1>
              <p className="text-sm text-gray-600">Florida Auto Insurance Specialists</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="hidden sm:inline text-blue-700 font-semibold hover:text-blue-900 transition">Blog</Link>
            <a href="tel:800-616-1418" className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition">
              📞 800-616-1418
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Car Background */}
      <section className="relative bg-blue-900 overflow-hidden">
        {/* Ken Burns animated background */}
        <style>{`
          @keyframes kenBurnsAuto {
            0%   { transform: scale(1.0) translate(0%, 0%); }
            25%  { transform: scale(1.08) translate(-1%, -1.5%); }
            50%  { transform: scale(1.12) translate(1.5%, -1%); }
            75%  { transform: scale(1.08) translate(1%, 1.5%); }
            100% { transform: scale(1.0) translate(0%, 0%); }
          }
          .hero-bg-auto {
            animation: kenBurnsAuto 28s ease-in-out infinite;
            will-change: transform;
          }
        `}</style>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="hero-bg-auto absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-florida-cars.jpg')", opacity: 0.45 }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-blue-900/70"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <p className="text-blue-300 font-semibold mb-2 uppercase tracking-wider">Florida Auto Insurance</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              FASTEST Auto Insurance Quotes
            </h2>
            <p className="text-2xl text-yellow-300 font-semibold mb-8">
              SAME DAY COVERAGE!
            </p>
            
            {/* Action Buttons */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <a 
                href="https://app.usecanopy.com/c/tomlinson-and-co"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-xl shadow-lg transition transform hover:scale-105 text-center relative overflow-hidden"
              >
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-bl-lg font-bold">EASY!</span>
                <span className="text-xl block mb-1">⚡</span>
                <span className="text-lg">Quick Quote</span>
                <span className="block text-xs font-normal mt-1">2 mins • Auto-fill</span>
              </a>
              <a 
                href="https://hoinsurance.wufoo.com/forms/r1pjgdx504btju2/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-6 rounded-xl shadow-lg transition text-center"
              >
                <span className="text-xl block mb-1">📝</span>
                <span>Full Quote Form</span>
                <span className="block text-xs font-normal">Detailed application</span>
              </a>
              <a 
                href="tel:800-616-1418"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition text-center"
              >
                <span className="text-xl block mb-1">📞</span>
                <span>Call Us</span>
                <span className="block text-xs font-normal">800-616-1418</span>
              </a>
            </div>
            
            {/* Sync My Policy Callout */}
            <div className="mx-auto max-w-xl bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg text-left">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Tip:</strong> Click <strong>"Sync My Policy"</strong> to securely connect your current insurance — we'll pull your info automatically. No forms to fill out!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-blue-900 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
          <span>✓ Licensed Since 1966</span>
          <span>✓ A-Rated Carriers</span>
          <span>✓ Same-Day Coverage</span>
          <span>✓ All Driver Types Welcome</span>
        </div>
      </section>

      {/* Carriers Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            We Represent Florida's Top Auto Insurance Carriers
          </h3>
          <p className="text-gray-600 mb-4">
            Progressive • Safeco • Travelers • Geico • Mercury • Bristol West • Root • National General • and many more!
          </p>
          <p className="text-sm text-gray-500">
            We shop them all to find YOU the best rate — often saving clients 35% or more.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-4">
            Bundle Your Auto & Homeowners With HUGE Discounts!
          </h3>
          <p className="text-center text-gray-600 mb-12 text-lg">Look at our program highlights and CALL Today:</p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-bold text-lg text-blue-900 mb-2">Same Day Coverage</h4>
              <p className="text-gray-600 text-sm">Policies issued the same day you're quoted.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-bold text-lg text-green-800 mb-2">Save Over 35%</h4>
              <p className="text-gray-600 text-sm">Many clients save 35%+ on their previous policy.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h4 className="font-bold text-lg text-yellow-700 mb-2">Only 2 Minutes</h4>
              <p className="text-gray-600 text-sm">Easy online application — super fast!</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h4 className="font-bold text-lg text-purple-800 mb-2">All Drivers Welcome</h4>
              <p className="text-gray-600 text-sm">Tickets, accidents, DUI — we help everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unlucky Driver Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">We Help Every Driver</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Unlucky Driver */}
            <div className="bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                🍀 Our "Unlucky Driver" Program
              </h3>
              <p className="text-gray-300 mb-4">
                If you've had a string of "Bad Luck", gotten a few tickets, or had an accident, 
                don't pay an arm and a leg for your Insurance. We can Help You Find the BEST!
              </p>
              <ul className="space-y-2 text-gray-200">
                <li>✓ Some drivers pay similar rates to clear drivers</li>
                <li>✓ We can help EVERY driver, in EVERY situation</li>
                <li>✓ Call us for a FAST phone quote & SAME DAY Coverage!</li>
              </ul>
            </div>

            {/* DUI Section */}
            <div className="bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                🛡️ Special Insurance for DUI
              </h3>
              <p className="text-gray-300 mb-4">
                Getting a DUI can be a bad experience, but we make the insurance part easier. 
                We help keep your insurance costs DOWN if you have a DUI.
              </p>
              <ul className="space-y-2 text-gray-200">
                <li>✓ Companies that specialize in DUI situations</li>
                <li>✓ Coverage with us is easy and un-embarrassing</li>
                <li>✓ If your license is suspended, we can help</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Home Section */}
      <section className="py-12 px-4 bg-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            🏠 Need Homeowners or Flood Insurance?
          </h3>
          <p className="text-teal-100 text-lg mb-4">
            Bundle your auto and home for even bigger savings! We cover Florida homes anywhere — even barrier islands.
          </p>
          <a 
            href="https://hoinsurance.com"
            className="inline-block bg-white text-teal-700 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition"
          >
            Get Home Quote at HOInsurance.com →
          </a>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-6">⭐⭐⭐⭐⭐</div>
          <blockquote className="text-2xl text-gray-700 italic mb-6">
            "They saved me over $800 a year and got me covered the same day. Even with my tickets, they found me a great rate!"
          </blockquote>
          <p className="text-gray-600 font-semibold">— Happy Florida Driver</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Save on Auto Insurance?
          </h3>
          <p className="text-xl text-green-100 mb-8">
            Get your free quote in minutes — or call for instant help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://hoinsurance.wufoo.com/forms/r1pjgdx504btju2/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-700 font-bold text-xl py-4 px-10 rounded-xl shadow-lg hover:bg-gray-100 transition"
            >
              Get Free Quote →
            </a>
            <a 
              href="tel:800-616-1418"
              className="bg-green-800 hover:bg-green-900 text-white font-bold text-xl py-4 px-10 rounded-xl shadow-lg transition"
            >
              📞 800-616-1418
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg text-white mb-2">
            Every Policy We Sell Comes With A Satisfied Policyholder!
          </p>
          <p className="text-sm">
            FloridAuto.com • Florida Auto Insurance Specialists<br/>
            A Tomlinson & Co Agency
          </p>

          {/* Sister Sites */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Also from Tomlinson & Co</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a href="https://tomlinsonandco.com" className="text-gray-400 hover:text-white transition">Tomlinson &amp; Co (Parent Agency)</a>
              <a href="https://hoinsurance.com" className="text-gray-400 hover:text-white transition">Florida Home Insurance</a>
              <a href="https://easycommercialauto.com" className="text-gray-400 hover:text-white transition">Commercial Auto Insurance</a>
              <a href="https://easycommercialinsurance.com" className="text-gray-400 hover:text-white transition">Commercial Insurance</a>
            </div>
          </div>

          <p className="text-xs mt-6">
            © {new Date().getFullYear()} Tomlinson & Co Inc. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            <Link to="/blog" className="text-gray-400 hover:text-white underline">Blog</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
