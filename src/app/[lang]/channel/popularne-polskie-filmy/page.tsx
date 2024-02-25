'use client';

import useDocumentTitle from '@/app/[lang]/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/[lang]/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularPolishFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popularne polskie filmy`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularpolish');

	return <Filters headingTitlePage='Popularne polskie filmy' mappingBy={filteredMovies} />;
};

export default PopularPolishFilms;
