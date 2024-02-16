'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import '../../../../style/css/film-page.css';
import SiteNotFound from '@/app/[...not_found]/page';
import convertTitleToUrl from '@/app/helpers/ConvertTitleToURL';
import { ChevronRightIcon, StarIcon, PlayIcon, ChevronLeftIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/solid';

import {
	popularFilms,
	lastAddedFilms,
	popularActionFilms,
	popularComediaFilms,
	popularHorrorFilms,
	popularPolishFilms,
	popularSerials,
} from '../../../data/main-films';
import { useEffect, useState } from 'react';

const allFilmsData = [
	...popularFilms,
	...lastAddedFilms,
	...popularActionFilms,
	...popularComediaFilms,
	...popularHorrorFilms,
	...popularPolishFilms,
	...popularSerials,
];

interface pageProps {
	params: { ref: number; title: string };
}

const FilmPage: React.FC<pageProps> = ({ params }) => {
	const infoOfChoosedFilm = allFilmsData.find(
		film => convertTitleToUrl(film.title) === params.title
	);

	const extractYearFromReleaseDate = (releaseDate: string | undefined) => {
		const yearRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
		const match = releaseDate?.match(yearRegex);

		return match ? match[3] : null;
	};

	useDocumentTitle(
		`${infoOfChoosedFilm?.title} (${extractYearFromReleaseDate(infoOfChoosedFilm?.releaseDate)}) - vvaciej-app`
	);

	const [isFilmExist, setIsFilmExist] = useState<boolean>(false);

	useEffect(() => {
		const checkIfPageExist = allFilmsData.some(
			film =>
				film.ref === Number(params.ref) && convertTitleToUrl(film.title) === params.title
		);


		checkIfPageExist ? setIsFilmExist(true) : setIsFilmExist(false);
	}, [params]);

	return (
		<>
			{isFilmExist ? (
				<div className='space-light'>
					<Navbar isCutted={false} />
					<div className='film-page-image-fullhd-preview'></div>
					<div className='content-full-space-centered'>
						<div className='film-page-container'>
							<aside className='film-page-aside'>
								<img src={infoOfChoosedFilm?.image} alt={`Poster for ${infoOfChoosedFilm?.title}`} />
								<button className='orange-btn-style'>
									<PlayIcon className='h-4' />
									Obejrzyj to
								</button>
								<button className='orange-outlined-btn-style'>
									<PlusIcon className='h-4' />
									Obejrzyj potem
								</button>
								<button className='orange-outlined-btn-style'>
									<ShareIcon className='h-4' />
									Udostępnij
								</button>
								<section>
									<b>Oryginalny język</b>
									<span>---</span>
								</section>
								<section>
									<b>Oryginalny tytuł</b>
									<span>---</span>
								</section>
								<section>
									<b>Budżet</b>
									<span>
										{infoOfChoosedFilm?.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
									</span>
								</section>
								<section>
									<b>Przychód</b>
									<span>
										{' '}
										{infoOfChoosedFilm?.profit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
									</span>
								</section>
							</aside>
							<main className='film-page-main'>
								<section className='film-page-main-top-info-text-section'>
									<section className='film-page-main-top-info-heading-section'>
										<section>
											<h1 className='film-page-film-title'>{infoOfChoosedFilm?.title}</h1>
											<section>
												<span>{infoOfChoosedFilm?.releaseDate}</span>
												<span className='ml-2 mr-2'>•</span>
												<span>{infoOfChoosedFilm?.time}</span>
											</section>
										</section>
										<section>
											<section className='main-text-rating flex items-center'>
												<StarIcon
													className='h-5 mr-2'
													style={{
														color: 'var(--orange)',
													}}
												/>
												<span>{infoOfChoosedFilm?.rating} / 10</span>
												<span
													className='film-list-rating-separate-symbol ml-3'
													style={{
														color: 'var(--gray-5050)',
													}}>
													|
												</span>
												<button className='rate-this-btn flex items-center gap-x-2'>
													<StarIcon className='h-4' />
													Oceń to
												</button>
											</section>
										</section>
									</section>
									<p className='film-page-film-description'>{infoOfChoosedFilm?.description}</p>
								</section>
							</main>
						</div>
					</div>
					<Footer />
				</div>
			) : (
				<SiteNotFound />
			)}
		</>
	);
};

export default FilmPage;
