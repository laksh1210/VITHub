"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/contexts/auth-context";
import { saveTokens, saveUser, clearSession } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { LoginInput, RegisterInput } from "@/validators/auth";

export function useAuth() {
  const { setUser, setIsAuthenticating, setIsLoggingOut, user, isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onMutate: () => setIsAuthenticating(true),
    onSuccess: (data) => {
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.user);
      setUser(data.user);
      router.push(ROUTES.DASHBOARD);
    },
    onSettled: () => setIsAuthenticating(false),
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterInput) => {
      // Send only the fields expected by the backend
      const { registrationNumber, degree, currentSemester, hostelBlock, ...authData } = data;
      return authService.register(authData as any);
    },
    onMutate: () => setIsAuthenticating(true),
    onSuccess: (data, variables) => {
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.user);
      setUser(data.user);
      
      // Save the extra academic fields into the profile mock storage
      const profileData = {
        registrationNumber: variables.registrationNumber,
        degree: variables.degree,
        currentSemester: variables.currentSemester,
        hostelBlock: variables.hostelBlock,
        libraryCard: "Active (0 Overdue)",
        shuttlePass: "Not Enrolled",
      };
      localStorage.setItem(`vithub_profile_${data.user.id}`, JSON.stringify(profileData));
      
      router.push(ROUTES.DASHBOARD);
    },
    onSettled: () => setIsAuthenticating(false),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onMutate: () => setIsLoggingOut(true),
    onSuccess: () => {
      clearSession();
      setUser(null);
      queryClient.clear();
      router.push(ROUTES.LOGIN);
    },
    onSettled: () => setIsLoggingOut(false),
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
