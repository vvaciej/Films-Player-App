import normalizePolishCharacters from './NormalizePolishSymbols';

const IteratingFilmsPageArrays = (allFilmsData: any, iterateBy: string, paramsArray: any) => {
	const filteredMovies = allFilmsData.filter((movie: any) => {
		const dataMappedToLowerCaseNormalized = movie[iterateBy].map((prop: any) => normalizePolishCharacters(prop.toLowerCase()));

		return dataMappedToLowerCaseNormalized.some((prop: any) => paramsArray.includes(String(prop).replace(/ /g, '-')));
	});

	return filteredMovies;
};

export default IteratingFilmsPageArrays;
