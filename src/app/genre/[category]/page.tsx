'use client';

import Filters from '@/app/components/FilmsFilterContainer';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { allFilms } from '@/app/data/films-data';
import IteratingFilmsPageArrays from '@/app/helpers/FilmsIteratingFilterArrays';

interface params {
	params: {
		category: string | string[];
	};
}

const Genre: React.FC<params> = ({ params }) => {
	const categoryArray = Array.isArray(params.category) ? params.category : [params.category];
	useDocumentTitle(`${categoryArray.join(', ')} - vvaciej.app`);

	const filteredByGenre = IteratingFilmsPageArrays(allFilms, 'categoryArr', categoryArray);

    const isGap = filteredByGenre.length === 0;

	return (
		<Filters
			headingTitlePage={`${!isGap ? categoryArray
				.join(', ')
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1)) : 'restricted'} movies and series`}
			mappingBy={filteredByGenre}
		/>
	);
};

export default Genre;
