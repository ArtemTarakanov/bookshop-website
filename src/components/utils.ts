function renderStars(rating: number): string {
    const fullStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5 - Math.floor(rating));
    return fullStars + emptyStars;
  }
  
  function truncateDescription(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }
  
  export { renderStars, truncateDescription };

