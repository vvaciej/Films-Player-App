'use client';

import useDocumentTitle from '../helpers/PageTitle';
import { Navbar } from '../layouts/Navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getCookie from '../helpers/GetCookie';
import { allFilms } from '../data/films-data';
import { useTranslation } from 'react-i18next';
import '../../../style/css/filteres-page.css';
import IteratingFilmsPage from '../helpers/FilmsIteratingFilter';

import Filters from '../components/FilmsFilterContainer';

const Watchlist = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t('Do obejrzenia')} - vvaciej.app`);
	const router = useRouter();

	const isLogged = getCookie('email') ? true : false;

	useEffect(() => {
		if (!isLogged) {
			router.push('/login');
		}
	}, []);

	const filteredMovies = IteratingFilmsPage(allFilms, 'category', 'favourite');

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				{isLogged ? (
					<Filters headingTitlePage={t('Do obejrzenia')} mappingBy={filteredMovies} />
				) : (
					<div className='h-full absolute right-1/2 top-36 translate-x-1/2'>
						<div className='loader'></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Watchlist;
