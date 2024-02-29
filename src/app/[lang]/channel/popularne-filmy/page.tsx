'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popular films`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popular');

	return <Filters headingTitlePage='Popular films' mappingBy={filteredMovies} />;
};

export default PopularFilms;
