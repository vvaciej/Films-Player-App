'use client';

import useDocumentTitle from '@/app/[lang]/helpers/PageTitle';
import Filters from '../../components/FilmsFilterContainer';
import IteratingFilmsPage from '@/app/[lang]/helpers/FilmsIteratingFilter';

import { allFilms } from '../../data/films-data';
import { useTranslation } from 'react-i18next';

const PopularHorrorFilms: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Popularne horrory`)} - vvaciej.app`);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'popularhorror');

	return <Filters headingTitlePage='Popularne horrory' mappingBy={filteredMovies} />;
};

export default PopularHorrorFilms;
