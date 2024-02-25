'use client';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';
import { useState, useEffect } from 'react';
import React from 'react';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { allFilms } from '@/app/data/films-data';
import SiteNotFound from '@/app/[...not_found]/page';
import '../../../style/css/film-page.css';
import Link from 'next/link';
import convertTitleToUrl from '@/app/helpers/ConvertTitleToURL';
import getCookie from '@/app/helpers/GetCookie';

import {
	PlayIcon,
	HandThumbUpIcon,
	HandThumbDownIcon,
	ChatBubbleBottomCenterIcon,
	FlagIcon,
	ShareIcon,
} from '@heroicons/react/24/solid';
import ReviewAs from '@/app/components/ReviewAsContainer';

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

	const isLogged = getCookie('email');
	const [, setIsLiked] = useState(false);

	const handleLikeClick = () => {};
	const handleUnLikeClick = () => {};

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
							<div
								className='xl:w-[1220px] w-[95%] h-max'
								style={{
									marginTop: 'calc(var(--main-container-padd-top) - .5rem)',
								}}>
								<main className='w-full h-max rounded'>
									<video controls controlsList='nodownload' className='h-max w-full'>
										<source src='' type='video/mp4' />
									</video>
								</main>
								<div className='lg:mt-10 mt-8 h-max flex gap-x-8 lg:gap-x-12'>
									<section className='watch-film-page-text-section'>
										<section className='flex gap-x-3 sm:gap-x-4 overflow-hidden max-h-[209px] mb-6'>
											<img
												className='max-h-[209px] sm:block hidden rounded'
												src={infoOfChoosedFilm?.image}
												alt={`Poster for ${infoOfChoosedFilm?.title}`}
											/>
											<section className='flex flex-col items-start gap-x-2'>
												<h1 className='text-2xl font-medium'>{infoOfChoosedFilm?.title}</h1>
												<section className='flex gap-x-2 items-center justify-between w-full mb-1'>
													{isLogged ? (
														<section className='flex'>
															<button
																onClick={() => {
																	handleLikeClick();
																	setIsLiked(true);
																}}
																className='flex gap-x-2 items-center transparent-btn-style !p-2'>
																<HandThumbUpIcon className='h-5' />
																<span className='font-semibold'>0</span>
															</button>
															<button
																onClick={() => {
																	handleUnLikeClick();
																	setIsLiked(true);
																}}
																className='flex gap-x-2 items-center transparent-btn-style !p-2'>
																<HandThumbDownIcon className='h-5' />
																<span className='font-semibold'>0</span>
															</button>
														</section>
													) : (
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
													)}
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
									<aside
										className='min-w-[260px] lg:block hidden'
										style={{
											display:
												findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title).length > 0
													? 'block'
													: 'none',
										}}>
										<section className='films-heading-section'>
											<h1 className='films-category-heading-text !text-2xl mb-6'>Podobne</h1>
										</section>
										<section>
											{findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title)
												.slice(0, 4)
												.map((similarFilm, index) => (
													<article className='film-container !max-w-80 mb-6' key={index}>
														<section className='films-image-section relative'>
															<Link href={`/titles/${similarFilm?.ref}/${convertTitleToUrl(similarFilm?.title)}`}>
																<img
																	className='rounded brightness-75'
																	src={similarFilm?.imgFullHd500}
																	alt={`Poster for ${similarFilm?.title}`}
																/>
																<button className='film-play-btn'>
																	<PlayIcon className='text-black h-5' />
																</button>
															</Link>
														</section>
														<section className='films-text-section !pt-2 font-semibold'>
															<Link
																href={`/titles/${similarFilm?.ref}/${convertTitleToUrl(similarFilm?.title)}`}
																className='film-container-title text-[14px] hover:underline'>
																{similarFilm?.title}
															</Link>
														</section>
													</article>
												))}
										</section>
									</aside>
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
