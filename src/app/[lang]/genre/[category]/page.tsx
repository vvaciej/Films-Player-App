'use client';

import Filters from '@/components/FilmsFilterContainer';
import useDocumentTitle from '@/helpers/PageTitle';
import { allFilms } from '@/data/films-data';
import IteratingFilmsPageArrays from '@/helpers/FilmsIteratingFilterArrays';
import { useTranslation } from 'react-i18next';

interface params {
	params: {
		category: string | string[];
	};
}

const Genre: React.FC<params> = ({ params }) => {
	const categoryArray = Array.isArray(params.category) ? params.category : [params.category];
	const { t } = useTranslation();
	useDocumentTitle(`${t(categoryArray.join(', '))} - vvaciej.app`);

	const filteredByGenre = IteratingFilmsPageArrays(allFilms, 'categoryArr', categoryArray);

	const isGap = filteredByGenre.length === 0;

	return (
		<Filters
			headingTitlePage={`${
				!isGap
					? categoryArray
							.join(', ')
							.split(' ')
							.map(word => word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, ' '))
					: t('restricted')
			} ${t('films and serials')}`}
			mappingBy={filteredByGenre}
		/>
	);
};

export default Genre;
