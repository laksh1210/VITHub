import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-card p-10 rounded-3xl max-w-[448px] w-full border border-[#27272A] relative overflow-hidden shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/30 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold mb-3">
          404 — Location Not Found
        </div>

        <h1 className="text-2xl font-black text-white mb-2">Off-Grid Campus Location</h1>

        <p className="text-xs text-[#A1A1AA] leading-relaxed mb-6">
          The requested room, building, or page route does not exist within the VIT Bhopal digital twin network.
        </p>

        <Link
          href="/"
          className="w-full py-3 rounded-xl bg-[#6C63FF] hover:bg-[#5b52e0] text-white text-xs font-bold transition-all shadow-lg shadow-[#6C63FF]/30 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Campus Map
        </Link>
      </div>
    </div>
  );
}
