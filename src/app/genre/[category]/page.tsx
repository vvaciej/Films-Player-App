'use client';

import Filters from '@/app/components/FilmsFilterContainer';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { allFilms } from '@/app/data/films-data';

interface params {
	params: {
		category: string | string[];
	};
}

const Genre: React.FC<params> = ({ params }) => {
	const categoryArray = Array.isArray(params.category) ? params.category : [params.category];
	useDocumentTitle(`${categoryArray.join(', ')} - vvaciej.app`);

	const filteredByGenre = allFilms.filter((movie: any) => {
		const filmCategories = movie['categoryArr'].map((category: any) => category.toLowerCase());

		return filmCategories.some((category: any) => categoryArray.includes(category));
	});

	return (
		<Filters
			headingTitlePage={`${categoryArray
				.join(', ')
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))} movies and series`}
			mappingBy={filteredByGenre}
		/>
	);
};

export default Genre;
