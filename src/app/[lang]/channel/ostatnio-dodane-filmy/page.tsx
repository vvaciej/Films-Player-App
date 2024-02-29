'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const LastAddedFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Last added films`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'lastadded');

	return <Filters headingTitlePage='Last added films' mappingBy={filteredMovies} />;
};

export default LastAddedFilms;
