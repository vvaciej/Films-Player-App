'use client';

import useDocumentTitle from '../../../helpers/PageTitle';
import Filters from '../components/FilmsFilterContainer';
import { allFilms } from '../data/films-data';

import { useTranslation } from 'react-i18next';

const Movies: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Wyszukiwarka filmów`)} - vvaciej.app`);

	const filteredMovies = allFilms.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();

		return filmTypeLowerCase === 'film';
	});

	return <Filters headingTitlePage={t('Filmy')} mappingBy={filteredMovies} />;
};

export default Movies;
