'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularActionFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popular action films`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularaction');

	return <Filters headingTitlePage='Popular action films' mappingBy={filteredMovies} />;
};

export default PopularActionFilms;
