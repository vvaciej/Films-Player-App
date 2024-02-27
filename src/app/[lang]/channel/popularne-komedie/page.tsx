'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularComedyFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popularne komedie`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularcomedia');

	return <Filters headingTitlePage='Popularne komedie' mappingBy={filteredMovies} />;
};

export default PopularComedyFilms;
