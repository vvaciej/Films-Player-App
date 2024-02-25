'use client';

import Filters from '@/app/components/FilmsFilterContainer';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { allFilms } from '@/app/data/films-data';
import IteratingFilmsPageArrays from '@/app/helpers/FilmsIteratingFilterArrays';

interface params {
	params: {
		country: string | string[];
	};
}

const Countries: React.FC<params> = ({ params }) => {
	const countryArray = Array.isArray(params.country) ? params.country : [params.country];
	useDocumentTitle(`${countryArray.join(', ')} - vvaciej.app`);

	const filteredByCountry = IteratingFilmsPageArrays(allFilms, 'filmedIn', countryArray);

  const isGap = filteredByCountry.length === 0;

	return (
		<Filters
			headingTitlePage={`Titles producted in ${!isGap ? countryArray
				.join(', ')
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1)) : 'restricted'}`}
			mappingBy={filteredByCountry}
		/>
	);
};

export default Countries;
