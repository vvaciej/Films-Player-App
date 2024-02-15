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

const PopularFilms: React.FC = () => {
	useDocumentTitle('Popularne filmy - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilmsData, 'category', 'popular');

	return <Filters headingTitlePage='Popularne filmy' mappingBy={filteredMovies} />;
};

export default PopularFilms;
