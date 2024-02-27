'use client';

import Filters from '@/app/[lang]/components/FilmsFilterContainer';
import useDocumentTitle from '@/helpers/PageTitle';
import { allFilms } from '../../data/films-data';
import IteratingFilmsPageArrays from '@/helpers/FilmsIteratingFilterArrays';

interface params {
	params: {
		country: string | string[];
	};
}
import { useTranslation } from 'react-i18next';

const Countries: React.FC<params> = ({ params }) => {
	const countryArray = Array.isArray(params.country) ? params.country : [params.country];

	const { t } = useTranslation();
	useDocumentTitle(`${t(countryArray.join(', '))} - vvaciej.app`);

	const filteredByCountry = IteratingFilmsPageArrays(allFilms, 'filmedIn', countryArray);

	const isGap = filteredByCountry.length === 0;

	return (
		<Filters
			headingTitlePage={`Titles producted in ${
				!isGap
					? countryArray
							.join(', ')
							.split(' ')
							.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					: t('restricted')
			}`}
			mappingBy={filteredByCountry}
		/>
	);
};

export default Countries;
