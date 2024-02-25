'use client';

import useDocumentTitle from '../helpers/PageTitle';
import Filters from '../components/FilmsFilterContainer';

import { allFilms } from '../data/films-data';
import { useTranslation } from 'react-i18next';

const Series = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t('Wyszukiwarka seriali')} - vvaciej.app`);

	const filteredMovies = allFilms.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();

		return filmTypeLowerCase === 'serial';
	});

	return <Filters headingTitlePage={t('Seriale')} mappingBy={filteredMovies} />;
};

export default Series;
