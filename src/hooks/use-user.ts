import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { UpdateProfileInput } from "@/lib/validators";

interface UserProfile {
  id: string;
  userId: string;
  // Auth user fields (joined from user table)
  name: string;
  email: string;
  image: string | null;
  // Profile fields
  username: string | null;
  profession: string | null;
  company: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  socialLinks: Record<string, string> | null;
  profileEnabled: boolean;
  paymentEnabled: boolean;
  paymentType: "fixed" | "flexible" | null;
  fixedAmount: number | null;
  interacEmail: string | null;
  theme: string | null;
  country: string | null;
  currency: string | null;
  profileImage: string | null;
  cardBackgroundImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export const userKeys = {
  all: ["user"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
};

export function useUserProfile() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => apiClient<UserProfile>("/api/user/profile"),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileInput) =>
      apiClient<UserProfile>("/api/user/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.profile(), data);
    },
  });
}
