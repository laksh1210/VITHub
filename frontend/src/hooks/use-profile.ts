import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/auth-context";

export interface UserProfileDetails {
  registrationNumber: string;
  degree: string;
  currentSemester: string;
  hostelBlock: string;
  libraryCard: string;
  shuttlePass: string;
}

const DEFAULT_PROFILE: UserProfileDetails = {
  registrationNumber: "23BCE10482",
  degree: "B.Tech CSE (AI & ML)",
  currentSemester: "Semester V (Fall 2026)",
  hostelBlock: "Boys Hostel Block A (Room 412)",
  libraryCard: "Active (0 Overdue)",
  shuttlePass: "Campus Express Unlimited",
};

export function useProfile() {
  const { user } = useAuthContext();
  const [profileDetails, setProfileDetails] = useState<UserProfileDetails>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`vithub_profile_${user.id}`);
      if (stored) {
        try {
          setProfileDetails(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse profile details");
        }
      }
    }
    setIsLoaded(true);
  }, [user?.id]);

  const updateProfile = (newDetails: Partial<UserProfileDetails>) => {
    const updated = { ...profileDetails, ...newDetails };
    setProfileDetails(updated);
    if (user?.id) {
      localStorage.setItem(`vithub_profile_${user.id}`, JSON.stringify(updated));
    }
  };

  return {
    profileDetails,
    updateProfile,
    isLoaded,
  };
}
