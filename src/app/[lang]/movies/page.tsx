'use client';

import useDocumentTitle from '../../../helpers/PageTitle';
import Filters from '../../../components/FilmsFilterContainer';
import { allFilms } from '../data/films-data';

import { useTranslation } from 'react-i18next';

const Movies: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Search engine`)} - vvaciej.app`);

	const filteredMovies = allFilms.filter(movie => {
		const filmTypeLowerCase = movie.type.toLowerCase();

		return filmTypeLowerCase === 'film';
	});

	return <Filters headingTitlePage={t('Films')} mappingBy={filteredMovies as any} />;
};

export default Movies;
