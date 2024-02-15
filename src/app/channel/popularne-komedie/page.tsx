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

const PopularComedyFilms: React.FC = () => {
	useDocumentTitle('Popularne komedie - vvaciej.app');

	const filteredMovies = IteratingFilmsPage(allFilmsData, 'category', 'popularcomedia');

	return <Filters headingTitlePage='Popularne komedie' mappingBy={filteredMovies} />;
};

export default PopularComedyFilms;
