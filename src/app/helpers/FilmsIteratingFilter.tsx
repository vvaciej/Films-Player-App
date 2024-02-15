const IteratingFilmsPage = (allFilmsData: any, iterateBy: string, lookingFor: string) => {
  const uniqueMovieTitles = new Set<string>();

  const filteredMovies = allFilmsData.filter((movie: any) => {
    const filmToLowerCase = movie[iterateBy].toLowerCase();
    const filteredArr = filmToLowerCase === lookingFor;

    if (filteredArr && !uniqueMovieTitles.has(movie.title)) {
			return uniqueMovieTitles.add(movie.title);
		}
  });

  return filteredMovies;
}

export default IteratingFilmsPage;