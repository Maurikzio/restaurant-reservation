import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]): number => {
  if(!reviews.length) return 0;

  return reviews.reduce((acc, review) => {
    return acc + review.rating
  }, 0) / reviews.length
}