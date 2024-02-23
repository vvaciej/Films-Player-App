'use client';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import { useState, useEffect } from 'react';
import React from 'react';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { allFilms } from '@/app/data/films-data';
import SiteNotFound from '@/app/[...not_found]/page';
import '../../../style/css/watch-film.css';
import '../../../style/css/film-page.css';
import Link from 'next/link';
import convertTitleToUrl from '@/app/helpers/ConvertTitleToURL';
import getCookie from '@/app/helpers/GetCookie';

import {
	PlayIcon,
	StarIcon,
	HandThumbUpIcon,
	HandThumbDownIcon,
	ChatBubbleBottomCenterIcon,
	FlagIcon,
	ShareIcon,
} from '@heroicons/react/24/solid';

interface pageProps {
	params: { ref: number };
}

const WatchFilm: React.FC<pageProps> = ({ params }) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isFilmExist, setIsFilmExist] = useState<boolean>(false);

	const infoOfChoosedFilm = allFilms.find(film => film.ref === Number(params.ref));

	useDocumentTitle(`${infoOfChoosedFilm?.title} - vvaciej-app`);

	useEffect(() => {
		const checkIfPageExist = allFilms.some(film => film.ref === Number(params.ref));

		checkIfPageExist ? setIsFilmExist(true) : setIsFilmExist(false);
	}, [params]);

	const [isHoveredStar, setHoveredStars] = useState<number | null>(null);
	const [indexStars, setIndexStars] = useState<number | null>(null);
	const [isAddOpinionSelected, setAddOpinionSelected] = useState<boolean>(false);

	const isLogged = getCookie('email');

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 200);
	}, []);

	const findSimilarFilms = (keywords: string[] | undefined, title: string | undefined) => {
		const similarFilms = allFilms.filter(film => {
			if (film.title !== title) {
				return film.keywords.some(keyword => keywords?.includes(keyword));
			}
		});

		return similarFilms;
	};

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			{isLoaded ? (
				isFilmExist ? (
					<>
						<div className='content-full-space-centered'>
							<div className='watch-film-page-main-container'>
								<main className='watch-film-page-film-player-container'>
									<video controls controlsList='nodownload'>
										<source src='' type='video/mp4' />
									</video>
								</main>
								<div className='watch-film-page-text-container'>
									<section className='watch-film-page-text-section'>
										<section className='watch-film-page-info-ab-film-section'>
											<img src={infoOfChoosedFilm?.image} alt={`Poster for ${infoOfChoosedFilm?.title}`} />
											<section>
												<h1>{infoOfChoosedFilm?.title}</h1>
												<section className='flex gap-x-2 items-center justify-between w-full mb-1'>
													<section className='flex'>
														<Link href='/login' className='flex gap-x-2 items-center transparent-btn-style !p-2'>
															<HandThumbUpIcon className='h-5' />
															<span className='font-semibold'>0</span>
														</Link>
														<Link href='/login' className='flex gap-x-2 items-center transparent-btn-style !p-2'>
															<HandThumbDownIcon className='h-5' />
															<span className='font-semibold'>0</span>
														</Link>
													</section>
													<section className='flex'>
														<Link href='/login'>
															<FlagIcon className='min-h-8 transparent-btn-style cursor-pointer !p-2' />
														</Link>
														<Link href='/login'>
															<ShareIcon className='min-h-8 transparent-btn-style cursor-pointer !p-2' />
														</Link>
													</section>
												</section>
												<p
													className=' text-gray-300'
													style={{
														fontSize: '13.4px',
													}}>
													{infoOfChoosedFilm?.description}
												</p>
											</section>
										</section>
										<section>
											<section className='flex gap-x-2 mt-8 mb-2'>
												<ChatBubbleBottomCenterIcon className='h-5' />
												<span className='text-sm'>0 comments</span>
											</section>
											<hr className='border-zinc-700 border-1 w-full' />
										</section>
										<section className='film-page-opinion-ab-film'>
											<div className='film-page-opinion-ab-film-review-container'>
												<section className='flex sm:items-center justify-between flex-col sm:flex-row gap-y-2 film-page-opinion-ab-film-heading-section'>
													<section className='!w-max film-page-opinion-ab-film-left-section'>
														{isLogged ? (
															<img
																src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
																alt='user avatar'
																className='mr-4 hidden sm:block w-12 h-max'
																style={{
																	outline: '1px solid var(--gray-3232)',
																	borderRadius: '50%',
																}}></img>
														) : (
															<img
																className='object-cover max-w-12 max-h-12 mr-4 w-12 h-max'
																src='https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png'
																alt={`Poster for ${infoOfChoosedFilm?.title}`}
															/>
														)}
														<section>
															<span className='pl-1'>
																Review as&nbsp;
																<b className='text-white'>
																	{isLogged ? getCookie('email').match(/^(.+)@/)?.[1] || '' : ''}
																</b>
															</span>
															<section className='flex mt-1'>
																{Array.from({ length: 10 }).map((_, index: number) => (
																	<StarIcon
																		className='film-page-opinions-stars-icons cursor-pointer sm:px-1 pr-1'
																		key={index}
																		onMouseOver={() => setHoveredStars(index + 1)}
																		onMouseOut={() => setHoveredStars(null)}
																		onClick={() => setIndexStars(index + 1)}
																		style={{
																			color:
																				(!indexStars &&
																					!isHoveredStar &&
																					infoOfChoosedFilm &&
																					index < Number(String(infoOfChoosedFilm?.rating).slice(0, 1))) ||
																				(isHoveredStar && isHoveredStar > index) ||
																				(indexStars && !isHoveredStar && indexStars >= index + 1)
																					? 'var(--orange)'
																					: 'var(--gray-5050)',
																		}}
																	/>
																))}
															</section>
														</section>
													</section>
													<button
														className={`${isLogged ? 'logged' : ''} ${
															isAddOpinionSelected ? 'hidden' : 'flex'
														} film-page-add-opinion-btn`}
														onClick={() => setAddOpinionSelected(!isAddOpinionSelected)}>
														Dodaj recenzję
													</button>
												</section>
												{isLogged && isAddOpinionSelected ? (
													<>
														<section className='film-page-adding-opinion-container'>
															<section>
																<label htmlFor='title'>Tytuł</label>
																<input type='text' id='title' />
															</section>
															<section>
																<label htmlFor='opinion-mess'>Recenzja</label>
																<textarea id='opinion-mess' />
															</section>
														</section>
														<section className='flex gap-x-2 justify-end mt-1'>
															<button
																className='btn-style-outlined w-max sm:!px-7 !py-2 !text-md'
																onClick={() => setAddOpinionSelected(!isAddOpinionSelected)}>
																Anuluj
															</button>
															<button className='orange-btn-style w-max sm:!px-7 !py-2 text-sm'>Dodaj</button>
														</section>
													</>
												) : (
													''
												)}
											</div>
											<div
												className='opinion-must-be-logged-container'
												style={{
													display: `${isLogged ? 'none' : 'flex'}`,
												}}>
												<h1>Wymagana jest rejestracja</h1>
												<p>
													Please&nbsp;
													<Link href='/login' className='orange-link'>
														login
													</Link>
													&nbsp;or&nbsp;
													<Link href='/register' className='orange-link'>
														create account
													</Link>
													&nbsp;to add a review
												</p>
											</div>
										</section>
										<section className='text-center text-sm mt-8'>
											<h2
												className='mb-1'
												style={{
													fontSize: '15.2px',
												}}>
												Seems a little quiet over here
											</h2>
											<span className='text-gray-300'>Be the first to comment</span>
										</section>
									</section>
									<section
										className='watch-film-page-alike-films-section'
										style={{
											display:
												findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title).length > 0
													? 'block'
													: 'none',
										}}>
										<section className='films-heading-section'>
											<h1 className='films-category-heading-text hover:underline !cursor-pointer !text-2xl'>Podobne</h1>
										</section>
										<section>
											{findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title)
												.slice(0, 4)
												.map((similarFilm, index) => (
													<article className='film-container !max-w-80' key={index}>
														<section className='films-image-section'>
															<Link href={`/titles/${similarFilm?.ref}/${convertTitleToUrl(similarFilm?.title)}`}>
																<img src={similarFilm?.imgFullHd500} alt={`Poster for ${similarFilm?.title}`} />
																<button className='film-play-btn'>
																	<PlayIcon className='text-black h-5' />
																</button>
															</Link>
														</section>
														<section className='films-text-section'>
															<Link
																href={`/titles/${similarFilm?.ref}/${convertTitleToUrl(similarFilm?.title)}`}
																className='film-container-title hover:underline'>
																{similarFilm?.title}
															</Link>
														</section>
													</article>
												))}
										</section>
									</section>
								</div>
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
	);
};

export default WatchFilm;
