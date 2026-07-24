import { ReviewUser } from "@/types/review-user";

export function getReviewerName(user: ReviewUser | string | undefined | null): string {
  if (typeof user === 'object' && user !== null) {
    if (user.name) return user.name;
    if (user.firstName || user.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
  }
  return 'Verified Buyer';
}

export function getReviewerInitials(user: ReviewUser | string | undefined | null): string {
  if (typeof user === 'object' && user !== null) {
    if (user.name) {
      const parts = user.name.trim().split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return user.name.slice(0, 2).toUpperCase();
    }
    if (user.firstName || user.lastName) {
      return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    }
  }
  return 'VB';
}
