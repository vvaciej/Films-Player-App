'use client';

import useDocumentTitle from '../../../helpers/PageTitle';
import { Navbar } from '../layouts/Navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getCookie from '../../../helpers/GetCookie';
import { allFilms } from '../data/films-data';
import { useTranslation } from 'react-i18next';

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

	const formatedWatchlistArr = (getCookie('watchlist') || '').split(',').map(Number);
	const watchlistRefs = formatedWatchlistArr;

	const findedMovies = allFilms.filter(film => {
		return watchlistRefs.includes(film.ref);
	});

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			<div className='content-full-space-centered'>
				{isLogged ? (
					<Filters headingTitlePage={t('Watchlist')} mappingBy={findedMovies as any} />
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
