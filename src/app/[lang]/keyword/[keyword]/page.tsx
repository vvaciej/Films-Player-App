'use client';

import Filters from '@/app/[lang]/components/FilmsFilterContainer';
import useDocumentTitle from '@/app/[lang]/helpers/PageTitle';
import { allFilms } from '../../data/films-data';
import IteratingFilmsPageArrays from '@/app/[lang]/helpers/FilmsIteratingFilterArrays';
import { useTranslation } from 'react-i18next';

interface params {
	params: {
		keyword: string | string[];
	};
}

const Keywords: React.FC<params> = ({ params }) => {
	const keywordArray = Array.isArray(params.keyword) ? params.keyword : [params.keyword];
	const { t, i18n } = useTranslation();
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
					: t('zastrzeżone')
			}" ${t('słowo kluczowe')}`}
			mappingBy={filteredByKeyword}
		/>
	);
};

export default Keywords;
