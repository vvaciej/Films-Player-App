'use client';

import { Navbar } from '../../layouts/Navbar';
import { Footer } from '../../layouts/Footer';
import { useState, useEffect } from 'react';
import React from 'react';
import useDocumentTitle from '@/helpers/PageTitle';
import { allFilms } from '../../data/films-data';
import SiteNotFound from '../../[...not_found]/page';
import Link from 'next/link';
import convertTitleToUrl from '@/helpers/ConvertTitleToURL';
import getCookie from '@/helpers/GetCookie';
import { useTranslation } from 'react-i18next';
import SomethingDone from '../../components/SomethingDoneDropdown';
import ShareBtn from '../../components/ShareBtn';

import {
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
	const [sthDoneVisible, setSthDoneVisible] = useState<boolean>(false);
	const [sthDoneVotedVisible, setSthDoneVotedVisible] = useState<boolean>(false);
	const [sthDoneBugVisible, setSthDoneBugVisible] = useState<boolean>(false);

	const infoOfChoosedFilm = allFilms.find(film => film.ref === Number(params.ref));

	const { t } = useTranslation();
	useDocumentTitle(`${infoOfChoosedFilm?.title} - vvaciej-app`);

	useEffect(() => {
		const checkIfPageExist = allFilms.some(film => film.ref === Number(params.ref));

		checkIfPageExist ? setIsFilmExist(true) : setIsFilmExist(false);
	}, [params]);

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

	const infoAbVotesFilmCookie = getCookie(`${infoOfChoosedFilm?.ref}-infoAbVotesFilm`);
	const infoAbVotesFilmParsed = infoAbVotesFilmCookie ? JSON.parse(infoAbVotesFilmCookie) : null;

	const [userVoted, setUserVoted] = useState<boolean>(infoAbVotesFilmParsed?.isUserAlrVoted || false);
	const [userWhatVote, setUserWhatVote] = useState<string>(infoAbVotesFilmParsed?.whatUserVoted || '');

	const [uniqueFilmLikes, setUniqueFilmLikes] = useState<number>(infoAbVotesFilmParsed?.amountOfLikes || 0);
	const [uniqueFilmUnLikes, setUniqueFilmUnLikes] = useState<number>(infoAbVotesFilmParsed?.amountOfDisLikes || 0);

	const infoAbVotesFilm = {
		amountOfLikes: uniqueFilmLikes,
		amountOfDisLikes: uniqueFilmUnLikes,
		isUserAlrVoted: userVoted,
		whatUserVoted: userWhatVote,
	};

	useEffect(() => {
		const infoAbVotesFilmString = JSON.stringify(infoAbVotesFilm);
		document.cookie = `${infoOfChoosedFilm?.ref}-infoAbVotesFilm=${infoAbVotesFilmString}`;
	}, [infoAbVotesFilm, infoOfChoosedFilm]);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			{isLoaded ? (
				isFilmExist ? (
					<>
						<div className='content-full-space-centered'>
							<div className='xl:w-[1220px] w-[95%] h-max mt-[calc(var(--main-container-padd-top)-0.5rem)]'>
								<main className='w-full h-max rounded'>
									<video controls controlsList='nodownload' className='h-max w-full'>
										<source src='' type='video/mp4' />
									</video>
								</main>
								<div className='lg:mt-10 mt-8 h-max flex gap-x-8 lg:gap-x-12'>
									<section className='watch-film-page-text-section w-full'>
										<section className='flex gap-x-3 sm:gap-x-4 max-h-[209px] mb-6'>
											<img
												className='max-h-[209px] sm:block hidden rounded'
												src={infoOfChoosedFilm?.image}
												alt={`Poster for ${t(infoOfChoosedFilm?.title || '')}`}
											/>
											<section className='flex flex-col items-start gap-x-2 w-full'>
												<h1 className='text-2xl font-medium'>{t(infoOfChoosedFilm?.title || '')}</h1>
												<section className='flex gap-x-2 items-center justify-between w-full mb-1'>
													<section className='flex'>
														<button
															onClick={() => {
																setUserVoted(true);
																userVoted ? '' : setUniqueFilmLikes(prevState => prevState + 1);
																setUserWhatVote('liked');
																setSthDoneVotedVisible(true);
																setTimeout(() => setSthDoneVotedVisible(false), 2500);
															}}
															className={`flex gap-x-2 items-center transparent-btn-style !p-2 ${
																userVoted && userWhatVote !== 'liked'
																	? 'text-gray9999'
																	: userVoted && userWhatVote === 'liked'
																	? 'text-green'
																	: ''
															}  ${
																userVoted
																	? 'cursor-not-allowed pointer-events-none'
																	: 'cursor-pointer pointer-events-auto'
															}`}>
															<HandThumbUpIcon className='h-5' />
															<span className='font-semibold'>{uniqueFilmLikes}</span>
														</button>
														<button
															onClick={() => {
																setUserVoted(true);
																userVoted ? '' : setUniqueFilmUnLikes(prevState => prevState + 1);
																setUserWhatVote('disLiked');
																setSthDoneVotedVisible(true);
																setTimeout(() => setSthDoneVotedVisible(false), 2500);
															}}
															className={`flex gap-x-2 items-center transparent-btn-style !p-2 ${
																userVoted && userWhatVote !== 'disLiked'
																	? 'text-gray9999'
																	: userVoted && userWhatVote === 'disLiked'
																	? 'text-red'
																	: ''
															} ${
																userVoted
																	? 'cursor-not-allowed pointer-events-none'
																	: 'cursor-pointer pointer-events-auto'
															}`}>
															<HandThumbDownIcon className='h-5' />
															<span className='font-semibold'>{uniqueFilmUnLikes}</span>
														</button>
													</section>
													<section className='flex gap-x-3'>
														<button
															onClick={() => {
																setSthDoneBugVisible(true);
																setTimeout(() => setSthDoneBugVisible(false), 2500);
															}}>
															<FlagIcon className='min-h-8 max-h-8 transparent-btn-style cursor-pointer !p-2' />
														</button>
														{getCookie('email') ? (
															<Link href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/login`}>
																<ShareIcon className='min-h-8 transparent-btn-style cursor-pointer !p-2' />
															</Link>
														) : (
															<ShareBtn setIsVisibleSthDone={setSthDoneVisible} whatBtnLook='basic' />
														)}
													</section>
												</section>
												<p className=' text-gray-300 text-[13.4px]'>{t(infoOfChoosedFilm?.description || '')}</p>
											</section>
										</section>
										<section>
											<section className='flex gap-x-2 mt-8 mb-2'>
												<ChatBubbleBottomCenterIcon className='h-5' />
												<span className='text-sm'>0 {t('comments')}</span>
											</section>
											<hr className='border-zinc-700 border-1 w-full' />
										</section>
										<section className='text-center text-sm mt-8'>
											<h2 className='mb-1 text-[15.2px]'>{t('Seems a little quiet over here')}</h2>
											<span className='text-gray-300'>{t('Bądź pierwszym komentującym')}</span>
										</section>
									</section>
									<aside
										className={`min-w-[260px] watch-page-aside-container ${
											findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title).length > 0
												? 'block'
												: 'hidden'
										}`}>
										<section className='films-heading-section'>
											<h1 className='films-category-heading-text !text-2xl'>{t('Alike')}</h1>
										</section>
										<section>
											{findSimilarFilms(infoOfChoosedFilm?.keywords, infoOfChoosedFilm?.title)
												.slice(0, 4)
												.map((similarFilm, index) => (
													<article
														className='film-container !max-w-80 mb-6 hover:brightness-75 transition-all'
														key={index}>
														<section className='films-image-section'>
															<Link
																href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
																	similarFilm?.ref
																}/${convertTitleToUrl(similarFilm?.title)}`}>
																<img
																	className='rounded brightness-75'
																	src={similarFilm?.imgFullHd500}
																	alt={`Poster for ${t(similarFilm?.title)}`}
																/>
															</Link>
														</section>
														<section className='films-text-section !pt-2 font-semibold'>
															<Link
																href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/titles/${
																	similarFilm?.ref
																}/${convertTitleToUrl(similarFilm?.title)}`}
																className='film-container-title text-[14px] hover:underline'>
																{t(similarFilm?.title)}
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
						<SomethingDone text={t('The vote has been cast')} visible={sthDoneVotedVisible} />
						<SomethingDone text={t('Issue reported successfully')} visible={sthDoneBugVisible} />
						<SomethingDone text={t('Copied link to clipboard')} visible={sthDoneVisible} />
					</>
				) : (
					<SiteNotFound />
				)
			) : (
				<div className='loader-container absolute bottom-1/2 h-full'>
					<div className='loader'></div>
				</div>
			)}
		</div>
	);
};

export default WatchFilm;
