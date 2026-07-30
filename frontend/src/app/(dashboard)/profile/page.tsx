'use client';

import React from 'react';
import { User, Shield, BookOpen, MapPin, Mail, Award, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* Profile Banner Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#27272A] relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/10 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#A78BFA] flex items-center justify-center text-3xl font-black shadow-xl shadow-[#6C63FF]/30 text-white">
            VB
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <h1 className="text-2xl font-bold text-foreground">Vivek Bhardwaj</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Student
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#6C63FF]" />
                vivek.2023@vitbhopal.ac.in
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Reg: 23BCE10482
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                B.Tech CSE (AI & ML)
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background border border-border text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Verified VIT Bhopal Student Account
            </div>
          </div>
        </div>
      </div>

      {/* Details & Saved Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-border">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#6C63FF]" />
            Academic Info
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Current Semester:</span>
              <span className="font-semibold text-foreground">Semester V (Fall 2026)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Hostel Block:</span>
              <span className="font-semibold text-foreground">Boys Hostel Block A (Room 412)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Library Card:</span>
              <span className="font-semibold text-emerald-400">Active (0 Overdue)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Shuttle Pass:</span>
              <span className="font-semibold text-indigo-400">Campus Express Unlimited</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#6C63FF]" />
            Favorite Campus Spots
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">Lab 304 (AB-1)</div>
                <div className="text-[10px] text-muted-foreground">Advanced AI & ML Lab</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#6C63FF]/20 text-primary">3rd Floor</span>
            </div>

            <div className="p-2.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">Central Library Silent Pod 4</div>
                <div className="text-[10px] text-muted-foreground">2nd Floor Silent Zone</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">2nd Floor</span>
            </div>

            <div className="p-2.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">Nescafe Outdoor Lounge</div>
                <div className="text-[10px] text-muted-foreground">Student Activity Plaza</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-500">Ground</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
