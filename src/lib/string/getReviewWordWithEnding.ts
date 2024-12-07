export const getReviewWordWithEnding = (reviewCount: number) => {
  switch (reviewCount) {
		case 1 || 21 || 31:
			return `${reviewCount} отзыв`
    default:
      return `${reviewCount} отзывов`
	}
}