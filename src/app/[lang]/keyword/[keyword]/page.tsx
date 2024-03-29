'use client';

import Filters from '@/components/FilmsFilterContainer';
import useDocumentTitle from '@/helpers/PageTitle';
import { allFilms } from '@/data/films-data';
import IteratingFilmsPageArrays from '@/helpers/FilmsIteratingFilterArrays';
import { useTranslation } from 'react-i18next';

interface params {
	params: {
		keyword: string | string[];
	};
}

const Keywords: React.FC<params> = ({ params }) => {
	const keywordArray = Array.isArray(params.keyword) ? params.keyword : [params.keyword];
	const { t } = useTranslation();
	useDocumentTitle(`${t(keywordArray.join(', '))} - vvaciej.app`);

	const filteredByKeyword = IteratingFilmsPageArrays(allFilms, 'keywords', keywordArray);

	const isGap = filteredByKeyword.length === 0;

	return (
		<Filters
			headingTitlePage={`Titles with "${
				!isGap
					? keywordArray
							.join(', ')
							.split(' ')
							.map(word => word.charAt(0).toUpperCase() + word.slice(1).replace(/-/g, ' '))
					: t('restricted')
			}" ${t('keyword')}`}
			mappingBy={filteredByKeyword}
		/>
	);
};

export default Keywords;
