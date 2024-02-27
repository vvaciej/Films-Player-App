const normalizePolishCharacters = (input: string): string => {
	const polishCharactersMap: Record<string, string> = {
		ą: 'a',
		ć: 'c',
		ę: 'e',
		ł: 'l',
		ń: 'n',
		ó: 'o',
		ś: 's',
		ź: 'z',
		ż: 'z',
	};

	return input.replace(/[ąćęłńóśźż]/g, match => polishCharactersMap[match]);
};

export default normalizePolishCharacters;