const MAX_STARS = 5;

export interface StarRatingViewModel {
  stars: number[]; // [0, 1, 2, 3, 4] para iterar
  fillWidth: string; // porcentaje de relleno, ej. "51.2%"
  label: string; // valor numérico, ej. "2.6"
}

export const StartRatingPresenter = (rating: number): StarRatingViewModel => {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const clamped = Math.max(0, Math.min(MAX_STARS, safeRating));

  return {
    stars: Array.from({ length: MAX_STARS }, (_, i) => i),
    fillWidth: `${(clamped / MAX_STARS) * 100}%`,
    label: clamped.toFixed(1),
  };
};
