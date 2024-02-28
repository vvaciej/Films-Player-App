'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularPolishFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popular polish films`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularpolish');

	return <Filters headingTitlePage='Popular polish films' mappingBy={filteredMovies} />;
};

export default PopularPolishFilms;
