// src/components/AdmissionOpenTicker.jsx
export default function AdmissionOpenTicker() {
  return (
    <>
      <style>{`
        @keyframes marquee-x {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="w-full overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="flex whitespace-nowrap text-white font-bold py-2 text-base sm:text-lg tracking-wide"
            style={{
              minWidth: "200%",
              animation: "marquee-x 12s linear infinite",
            }}
          >
            {/* repeat text twice for seamless loop */}
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
            <span className="mr-12">🎓 ADMISSION OPEN</span>
          </div>
        </div>
      </div>
    </>
  );
}
