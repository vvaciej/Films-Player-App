'use client';

import useDocumentTitle from '../../../helpers/PageTitle';
import Filters from '../components/FilmsFilterContainer';

import { allFilms } from '../data/films-data';
import { useTranslation } from 'react-i18next';

const Series = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t('Search engine')} - vvaciej.app`);

	const filteredMovies = allFilms.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();

		return filmTypeLowerCase === 'serial';
	});

	return <Filters headingTitlePage={t('Serials')} mappingBy={filteredMovies as any} />;
};

export default Series;
