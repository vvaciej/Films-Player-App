'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '@/data/films-data';
import { useTranslation } from 'react-i18next';

const PopularHorrorFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popular horros`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularhorror');

	return <Filters headingTitlePage='Popular horrors' mappingBy={filteredMovies} />;
};

export default PopularHorrorFilms;
