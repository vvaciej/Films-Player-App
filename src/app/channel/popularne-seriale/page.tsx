'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Filters from '@/app/components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/helpers/FilmsIteratingFilter';

import {
	popularFilms,
	lastAddedFilms,
	popularActionFilms,
	popularComediaFilms,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../../data/main-films';

const allFilmsData = [
	...popularFilms,
	...lastAddedFilms,
	...popularActionFilms,
	...popularComediaFilms,
	...popularHorrorFilms,
	...popularPolishFilms,
	...popularSerials,
];

const PopularSerials: React.FC = () => {
	useDocumentTitle('Popularne seriale - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilmsData, 'category', 'popularserial');

	return <Filters headingTitlePage='Popularne seriale' mappingBy={filteredMovies} />;
};

export default PopularSerials;
