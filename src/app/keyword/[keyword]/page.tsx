'use client';

import Filters from '@/app/components/FilmsFilterContainer';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { allFilms } from '@/app/data/films-data';
import IteratingFilmsPageArrays from '@/app/helpers/FilmsIteratingFilterArrays';

interface params {
	params: {
		keyword: string | string[];
	};
}

const Keywords: React.FC<params> = ({ params }) => {
	const keywordArray = Array.isArray(params.keyword) ? params.keyword : [params.keyword];
	useDocumentTitle(`${keywordArray.join(', ')} - vvaciej.app`);

	const filteredByKeyword = IteratingFilmsPageArrays(allFilms, 'keywords', keywordArray);

  const isGap = filteredByKeyword.length === 0;

	return (
		<Filters
			headingTitlePage={`Titles with "${!isGap ? keywordArray
				.join(', ')
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, ' ')) : 'restricted'}" keyword`}
			mappingBy={filteredByKeyword}
		/>
	);
};

export default Keywords;
