import { IReview } from "@src/types/review";

type RatingBreakdown = {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
};

const calculateRatingBreakdown = (reviews: IReview[]): RatingBreakdown => {
  return reviews.reduce(
    (acc, cur) => {
      switch (cur.ratting) {
        case 1:
          acc.one += 1;
          break;
        case 2:
          acc.two += 1;
          break;
        case 3:
          acc.three += 1;
          break;
        case 4:
          acc.four += 1;
          break;
        case 5:
          acc.five += 1;
          break;
      }
      return acc;
    },
    {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
    }
  );
};

const calculateAverageRating = (reviews: IReview[]): number => {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((acc, cur) => acc + cur.ratting, 0);
  const average = total / reviews.length;

  return Number(average.toFixed(1));
};

export { calculateRatingBreakdown, calculateAverageRating };
