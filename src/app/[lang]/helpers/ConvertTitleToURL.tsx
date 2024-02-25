import normalizePolishCharacters from "./NormalizePolishSymbols";

const convertTitleToUrl = (title: string) => {
	return normalizePolishCharacters(
		title
			.toLowerCase()
			.replace(/ /g, '_')
			.replace(/[^a-zA-Z0-9_ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, '')
	);
};

export default convertTitleToUrl;