const IteratingFilmsPageArrays = (allFilmsData: any, iterateBy: string, paramsArray: any) => {
	const filteredMovies = allFilmsData.filter((movie: any) => {
		const dataMappedToLowerCase = movie[iterateBy].map((prop: any) => prop.toLowerCase());

		return dataMappedToLowerCase.some((prop: any) => paramsArray.includes(String(prop).replace(/ /g, '-')));
	});

	return filteredMovies;
};

export default IteratingFilmsPageArrays;
