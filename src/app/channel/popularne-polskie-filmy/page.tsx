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

const PopularPolishFilms: React.FC = () => {
	useDocumentTitle('Popularne polskie filmy - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilmsData, 'category', 'popularpolish');

	return <Filters headingTitlePage='Popularne polskie filmy' mappingBy={filteredMovies} />;
};

export default PopularPolishFilms;
