'use client';

import React, { useState } from 'react';
import { User, Shield, BookOpen, MapPin, Mail, Award, CheckCircle2, Edit2, Save, X } from 'lucide-react';
import { useAuthContext } from '@/contexts/auth-context';
import { useProfile } from '@/hooks/use-profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const { user } = useAuthContext();
  const { profileDetails, updateProfile, isLoaded } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileDetails);

  // Sync formData when profileDetails loads
  React.useEffect(() => {
    if (isLoaded) {
      setFormData(profileDetails);
    }
  }, [isLoaded, profileDetails]);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileDetails);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'VB';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const displayName = user?.fullName || 'Vivek Bhardwaj';
  const displayEmail = user?.email || 'vivek.2023@vitbhopal.ac.in';
  const initials = getInitials(displayName);
  const role = user?.roles?.[0] || 'Student';

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* Profile Banner Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#27272A] relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Edit Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCancel} className="text-muted-foreground">
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="bg-[#6C63FF] hover:bg-[#5b54d6] text-white">
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-4 sm:pt-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#A78BFA] flex items-center justify-center text-3xl font-black shadow-xl shadow-[#6C63FF]/30 text-white shrink-0">
            {initials}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {role}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#6C63FF]" />
                {displayEmail}
              </span>
              
              {isEditing ? (
                <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <Input 
                    value={formData.registrationNumber} 
                    onChange={e => setFormData({...formData, registrationNumber: e.target.value})}
                    className="h-7 text-xs w-32"
                    placeholder="Reg No."
                  />
                  
                  <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-2" />
                  <Input 
                    value={formData.degree} 
                    onChange={e => setFormData({...formData, degree: e.target.value})}
                    className="h-7 text-xs w-40"
                    placeholder="Degree"
                  />
                </div>
              ) : (
                <>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Reg: {profileDetails.registrationNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    {profileDetails.degree}
                  </span>
                </>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Verified VIT Bhopal Student Account
            </div>
          </div>
        </div>
      </div>

      {/* Details & Saved Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-border flex flex-col">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-[#6C63FF]" />
            Academic Info
          </h2>
          <div className="space-y-3 text-xs flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border gap-2">
              <span className="text-muted-foreground w-32 shrink-0">Current Semester:</span>
              {isEditing ? (
                <Input 
                  value={formData.currentSemester} 
                  onChange={e => setFormData({...formData, currentSemester: e.target.value})}
                  className="h-8 text-xs"
                />
              ) : (
                <span className="font-semibold text-foreground text-right">{profileDetails.currentSemester}</span>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border gap-2">
              <span className="text-muted-foreground w-32 shrink-0">Hostel Block:</span>
              {isEditing ? (
                <Input 
                  value={formData.hostelBlock} 
                  onChange={e => setFormData({...formData, hostelBlock: e.target.value})}
                  className="h-8 text-xs"
                />
              ) : (
                <span className="font-semibold text-foreground text-right">{profileDetails.hostelBlock}</span>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border gap-2">
              <span className="text-muted-foreground w-32 shrink-0">Library Card:</span>
              {isEditing ? (
                <Input 
                  value={formData.libraryCard} 
                  onChange={e => setFormData({...formData, libraryCard: e.target.value})}
                  className="h-8 text-xs text-emerald-400"
                />
              ) : (
                <span className="font-semibold text-emerald-400 text-right">{profileDetails.libraryCard}</span>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2">
              <span className="text-muted-foreground w-32 shrink-0">Shuttle Pass:</span>
              {isEditing ? (
                <Input 
                  value={formData.shuttlePass} 
                  onChange={e => setFormData({...formData, shuttlePass: e.target.value})}
                  className="h-8 text-xs text-indigo-400"
                />
              ) : (
                <span className="font-semibold text-indigo-400 text-right">{profileDetails.shuttlePass}</span>
              )}
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#6C63FF]" />
            Favorite Campus Spots
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between transition-colors hover:bg-muted/80 cursor-pointer">
              <div>
                <div className="font-semibold text-foreground">Lab 304 (AB-1)</div>
                <div className="text-[10px] text-muted-foreground">Advanced AI & ML Lab</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#6C63FF]/20 text-primary">3rd Floor</span>
            </div>

            <div className="p-2.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between transition-colors hover:bg-muted/80 cursor-pointer">
              <div>
                <div className="font-semibold text-foreground">Central Library Silent Pod 4</div>
                <div className="text-[10px] text-muted-foreground">2nd Floor Silent Zone</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">2nd Floor</span>
            </div>

            <div className="p-2.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between transition-colors hover:bg-muted/80 cursor-pointer">
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
