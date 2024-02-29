'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularSerials: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popular serials`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularserial');

	return <Filters headingTitlePage='Popular serials' mappingBy={filteredMovies} />;
};

export default PopularSerials;
