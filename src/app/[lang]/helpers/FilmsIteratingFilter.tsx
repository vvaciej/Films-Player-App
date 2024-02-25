const IteratingFilmsPage = (allFilmsData: any, iterateBy: string, lookingFor: string) => {
  const filteredMovies = allFilmsData.filter((movie: any) => {
    const filmToLowerCase = movie[iterateBy].toLowerCase();

    return filmToLowerCase === lookingFor;
  });

  return filteredMovies;
}

export default IteratingFilmsPage;