'use client';

import useDocumentTitle from '@/app/helpers/PageTitle';
import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import '../../../../style/css/film-page.css';
import SiteNotFound from '@/app/[...not_found]/page';
import convertTitleToUrl from '@/app/helpers/ConvertTitleToURL';
import { ChevronRightIcon, StarIcon, PlayIcon, ChevronLeftIcon, PlusIcon, ShareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { allFilms } from '@/app/data/films-data';

interface pageProps {
	params: { ref: number; title: string };
}

const FilmPage: React.FC<pageProps> = ({ params }) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 200);
	}, []);

	const infoOfChoosedFilm = allFilms.find(film => convertTitleToUrl(film.title) === params.title);

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
		const checkIfPageExist = allFilms.some(
			film => film.ref === Number(params.ref) && convertTitleToUrl(film.title) === params.title
		);

		checkIfPageExist ? setIsFilmExist(true) : setIsFilmExist(false);
	}, [params]);

	return (
		<>
			<div className='space-light'>
				<Navbar isCutted={false} />
				{isLoaded ? (
					isFilmExist ? (
						<>
							<div className='film-page-image-fullhd-preview'>
								<button className='film-play-btn'>
									<PlayIcon className='text-black h-6' />
								</button>
								<div className='film-page-image-gradient'></div>
								<div className='film-page-image-blured'></div>
								<img src={infoOfChoosedFilm?.imgFullHd1280} alt={`Image for ${infoOfChoosedFilm?.title}`} />
								<div className='relative'>
									<img src={infoOfChoosedFilm?.imgFullHd1280} alt={`Image for ${infoOfChoosedFilm?.title}`} />
								</div>
							</div>
							<div className='content-full-space-centered'>
								<div className='film-page-container'>
									<aside className='film-page-aside'>
										<img
											src={infoOfChoosedFilm?.image}
											alt={`Poster for ${infoOfChoosedFilm?.title}`}
											className='cursor-pointer'
										/>
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
											<span>{infoOfChoosedFilm?.originalLang}</span>
										</section>
										<section
											style={{
												display: infoOfChoosedFilm?.title === infoOfChoosedFilm?.originalTitle ? 'none' : 'flex',
											}}>
											<b>Oryginalny tytuł</b>
											<span>{infoOfChoosedFilm?.originalTitle}</span>
										</section>
										<section
											style={{
												display: infoOfChoosedFilm?.budget === 1 ? 'none' : 'flex',
											}}>
											<b>Budżet</b>
											<span>
												{infoOfChoosedFilm?.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
											</span>
										</section>
										<section
											style={{
												display: infoOfChoosedFilm?.profit === 1 ? 'none' : 'flex',
											}}>
											<b>Przychód</b>
											<span>
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
													<section className='main-text-rating flex items-center min-w-max'>
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
											<section className='film-page-main-film-categories-section'>
												<ul>
													{infoOfChoosedFilm?.categoryArr &&
														infoOfChoosedFilm?.categoryArr.map((categories: string[] | string, index: number) => (
															<Link href='#' key={index}>
																<li>{categories}</li>
															</Link>
														))}
												</ul>
											</section>
											<p className='film-page-film-description'>{infoOfChoosedFilm?.description}</p>
										</section>
									</main>
								</div>
							</div>
							<Footer />
						</>
					) : (
						<SiteNotFound />
					)
				) : (
					<div className='loader-container flex justify-center w-full h-full'>
						<div className='loader'></div>
					</div>
				)}
			</div>
		</>
	);
};

export default FilmPage;
