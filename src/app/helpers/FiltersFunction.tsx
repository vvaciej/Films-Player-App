const FilterFncs = (whatClicked: any, whatChoosed: any, inputValSrc: any, mappingBy: any, iterateBy: string) => {
	if (whatClicked) {
		switch (whatChoosed) {
			case 'dokladnie':
				return mappingBy.filter((item: any) => item[iterateBy] === inputValSrc);
			case 'mniej lub rowno':
				return mappingBy.filter((item: any) => item[iterateBy] <= inputValSrc);
			case 'wiecej lub rowno':
				return mappingBy.filter((item: any) => item[iterateBy] >= inputValSrc);
			default:
				return mappingBy;
		}
	}
	return mappingBy;
};

export default FilterFncs;
