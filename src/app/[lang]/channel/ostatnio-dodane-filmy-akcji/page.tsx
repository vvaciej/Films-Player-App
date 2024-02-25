'use client';

import useDocumentTitle from '@/app/[lang]/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/[lang]/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const LastAddedActionFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Ostatnio dodane filmy akcji`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'lastaddedaction');

	return <Filters headingTitlePage='Popularne filmy akcji' mappingBy={filteredMovies} />;
};

export default LastAddedActionFilms;
