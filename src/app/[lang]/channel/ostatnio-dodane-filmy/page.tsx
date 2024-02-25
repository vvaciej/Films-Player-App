'use client';

import useDocumentTitle from '@/app/[lang]/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/[lang]/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const LastAddedFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Ostatnio dodane filmy`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'lastadded');

	return <Filters headingTitlePage='Ostatnio dodane filmy' mappingBy={filteredMovies} />;
};

export default LastAddedFilms;
