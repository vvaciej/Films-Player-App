'use client';

import useDocumentTitle from '@/app/[lang]/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/[lang]/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularSerials: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popularne seriale`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularserial');

	return <Filters headingTitlePage='Popularne seriale' mappingBy={filteredMovies} />;
};

export default PopularSerials;
