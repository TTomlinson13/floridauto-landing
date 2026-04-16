import { useState, useEffect } from 'react'

declare global {
  interface Window {
    CanopyConnect?: {
      open: (config: { client_id: string; onSuccess: (data: unknown) => void }) => void;
    };
  }
}

function App() {
  const [canopyReady, setCanopyReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.usecanopy.com/v1/canopy-connect.js";
    script.async = true;
    script.onload = () => setCanopyReady(true);
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleCanopySync = () => {
    if (window.CanopyConnect && canopyReady) {
      window.CanopyConnect.open({
        client_id: import.meta.env.VITE_CANOPY_CLIENT_ID || '',
        onSuccess: () => alert("Policy synced successfully! We'll contact you shortly with your quote."),
      });
    } else {
      alert("Loading... please try again in a moment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logos/floridauto/tc-logo-medium.jpg" alt="FloridAuto" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-blue-900">FloridAuto.com</h1>
              <p className="text-sm text-gray-600">Florida Auto Insurance Specialists</p>
            </div>
          </div>
          <a href="tel:800-616-1418" className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition">
            📞 800-616-1418
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FASTEST Auto Insurance Quotes
          </h2>
          <p className="text-2xl text-yellow-300 font-semibold mb-8">
            SAME DAY COVERAGE!
          </p>
          
          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <button 
              onClick={handleCanopySync}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-5 px-6 rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <span className="text-2xl block mb-1">⚡</span>
              <span className="text-lg">Sync My Policy</span>
              <span className="block text-sm font-normal">(Fastest Way)</span>
            </button>
            <a 
              href="https://app.usecanopy.com/c/tomlinson-and-co"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-5 px-6 rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <span className="text-2xl block mb-1">📝</span>
              <span className="text-lg">Start Quote</span>
              <span className="block text-sm font-normal">2 Minutes</span>
            </a>
            <a 
              href="tel:800-616-1418"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-5 px-6 rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <span className="text-2xl block mb-1">📞</span>
              <span className="text-lg">Call Now</span>
              <span className="block text-sm font-normal">Instant Quote</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-4">
            Bundle Your Auto & Homeowners With HUGE Discounts!
          </h3>
          <p className="text-center text-gray-600 mb-10 text-lg">Look at our program highlights and CALL Today:</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50 border-2 border-blue-200">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-bold text-lg text-blue-900 mb-2">Same Day Coverage</h4>
              <p className="text-gray-600">Auto Insurance Policies Can Be Issued the Same Day Quoted.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-green-50 border-2 border-green-200">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="font-bold text-lg text-green-800 mb-2">Save Over 35%</h4>
              <p className="text-gray-600">We Save Many Clients Over 35% On Their Previous Policy.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-yellow-50 border-2 border-yellow-600">
              <div className="text-4xl mb-4">⏱️</div>
              <h4 className="font-bold text-lg text-yellow-700 mb-2">Only 2 Minutes</h4>
              <p className="text-gray-600">Easy Online Application, Only Takes TWO MINUTES!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unlucky Driver Section */}
      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Unlucky Driver */}
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                🍀 Our "Unlucky Driver" Auto Program
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
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                🛡️ Special Florida Auto Insurance for DUI
              </h3>
              <p className="text-gray-300 mb-4">
                Getting a DUI can be a bad experience, but we make the insurance part of it a little easier. 
                We help keep your insurance costs DOWN if you have a DUI.
              </p>
              <ul className="space-y-2 text-gray-200">
                <li>✓ Companies that specialize in DUI situations</li>
                <li>✓ DUI coverage with us is easy and un-embarrassing</li>
                <li>✓ If your license is suspended, we can help get it back</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Fast Phone Quotes: 800-616-1418
          </h3>
          <p className="text-xl text-green-100 mb-8">
            We can give you a phone quote INSTANTLY.
          </p>
          <a 
            href="tel:800-616-1418"
            className="inline-block bg-white text-green-700 font-bold text-xl py-4 px-10 rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            📞 Call 800-616-1418 Now
          </a>
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
          <p className="text-xs mt-4">
            © {new Date().getFullYear()} Tomlinson & Co Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
