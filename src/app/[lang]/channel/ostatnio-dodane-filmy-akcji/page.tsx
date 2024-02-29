'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Filters from '../../../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const LastAddedActionFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Last added action films`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'lastaddedaction');

	return <Filters headingTitlePage='Last added action films' mappingBy={filteredMovies} />;
};

export default LastAddedActionFilms;
