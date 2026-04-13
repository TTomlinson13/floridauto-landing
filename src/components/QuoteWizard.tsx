import React, { useState, useEffect } from 'react';

export const QuoteWizard = () => {
  const [mode, setMode] = useState<'select' | 'wizard'>('select');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.usecanopy.com/v1/canopy-connect.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleCanopySync = () => {
    // @ts-ignore
    if (window.CanopyConnect) {
      // @ts-ignore
      window.CanopyConnect.open({
        client_id: import.meta.env.VITE_CANOPY_CLIENT_ID,
        onSuccess: (data: any) => alert("Policy synced successfully!"),
      });
    } else {
      alert("Canopy SDK loading...");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">FloridAuto Insurance</h2>

      {mode === 'select' && (
        <div className="space-y-3">
          <button onClick={handleCanopySync} className="w-full p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-left transition">
            <div className="font-bold text-blue-800">⚡ Sync My Policy (Fastest)</div>
          </button>
          <button onClick={() => setMode('wizard')} className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-left transition">
            <div className="font-bold text-gray-800">📝 Start Manual Quote</div>
          </button>
          <button onClick={() => alert("Calling Henry...")} className="w-full p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-left transition">
            <div className="font-bold text-green-800">📞 Talk to Henry (Agent)</div>
          </button>
        </div>
      )}
      
      {mode === 'wizard' && (
        <div className="text-center">
          <p className="text-gray-600">Manual Wizard UI coming soon...</p>
          <button onClick={() => setMode('select')} className="text-sm text-blue-600 underline mt-4">Back</button>
        </div>
      )}
    </div>
  );
};
