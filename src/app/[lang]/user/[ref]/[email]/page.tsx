'use client';

import { Navbar } from '@/app/[lang]/layouts/Navbar';
import { Footer } from '@/app/[lang]/layouts/Footer';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import getCookie from '@/helpers/GetCookie';
import { useRouter } from 'next/navigation';
import useDocumentTitle from '@/helpers/PageTitle';
import { useEffect, useState } from 'react';
import { BookmarkSlashIcon, PencilIcon, StarIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const UserPage = () => {
	const [isLogged] = useState(getCookie('email') ? true : false);
	const router = useRouter();

	const { t } = useTranslation();
	useDocumentTitle(`${t('Twoje konto')} - vvaciej-app`);

	useEffect(() => {
		if (!isLogged) {
			router.push('/login');
		}
	}, []);

	const [selectedMode, setSelectedMode] = useState<string>('Lists');

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			{isLogged ? (
				<div className='flex justify-center'>
					<div className='main-container-width-padd-top-1240'>
						<header className='flex sm:flex-row flex-col gap-y-6 justify-between items-center'>
							<section className='flex gap-x-4 items-center flex-col text-center sm:text-left gap-y-3 sm:flex-row'>
								<img
									className='h-32 rounded-[50%] sm:mr-2'
									src={`${getCookie('avatarSrc') || ''}`}
									alt='image for user avatar'
								/>
								<section className='flex flex-col gap-y-2'>
									<h1 className='text-2xl font-semibold'>{getCookie('email').match(/^(.+)@/)?.[1] || ''}</h1>
									<Link
										href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/account-settings`}
										className='btn-style-outlined !text-xs'>
										<PencilIcon className='h-4' />
										<span>{t('Edit profile')}</span>
									</Link>
								</section>
							</section>
							<section className='flex gap-x-3 items-center'>
								<section className='flex flex-col items-center uppercase'>
									<b className='text-lg'>0</b>
									<span className='text-xs text-zinc-300'>{t('Followers')}</span>
								</section>
								<hr className='h-8 border-[1px] border-gray3232' />
								<section className='flex flex-col items-center uppercase'>
									<b className='text-lg'>0</b>
									<span className='text-xs text-zinc-300'>{t('Following')}</span>
								</section>
								<hr className='border-r-2 h-8 border-gray3232' />
								<section className='flex flex-col items-center uppercase'>
									<b className='text-lg'>0</b>
									<span className='text-xs text-zinc-300'>{t('Lists')}</span>
								</section>
							</section>
						</header>
						<main className='mt-10'>
							<div
								className='overflow-hidden overflow-x-auto hide-scrollbar border-b-[1px] border-gray3232 '
								style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
								}}>
								<section className='text-sm justify-between flex w-[48rem] relative'>
									<hr
										className={`absolute bottom-0 border-r-2 w-32 transition-all border-b-[1px] border-darkOrange ${
											selectedMode === 'Lists'
												? 'left-0'
												: selectedMode === 'Grades'
												? 'left-[128px]'
												: selectedMode === 'Reviews'
												? 'left-[256px]'
												: selectedMode === 'Comments'
												? 'left-[384px]'
												: selectedMode === 'Followers'
												? 'left-[512px]'
												: selectedMode === 'Following'
												? 'left-[640px]'
												: ''
										}`}
									/>
									<button
										onClick={() => setSelectedMode('Lists')}
										className={`hover:brightness-125 w-full p-3 ${
											selectedMode === 'Lists' ? 'text-darkOrange' : 'text-lightGrayDdd'
										}`}>
										{t('Lists')}
									</button>
									<button
										onClick={() => setSelectedMode('Grades')}
										className={`hover:brightness-125 w-full p-3 ${
											selectedMode === 'Grades' ? 'text-darkOrange' : 'text-lightGrayDdd'
										}`}>
										{t('Grades')}
									</button>
									<button
										onClick={() => setSelectedMode('Reviews')}
										className={`hover:brightness-125 w-full p-3 ${
											selectedMode === 'Reviews' ? 'text-darkOrange' : 'text-lightGrayDdd'
										}`}>
										{t('Reviews')}
									</button>
									<button
										onClick={() => setSelectedMode('Comments')}
										className={`hover:brightness-125 w-full p-3 ${
											selectedMode === 'Comments' ? 'text-darkOrange' : 'text-lightGrayDdd'
										}`}>
										{t('Comments')}
									</button>
									<button
										onClick={() => setSelectedMode('Followers')}
										className={`hover:brightness-125 w-full p-3 ${
											selectedMode === 'Followers' ? 'text-darkOrange' : 'text-lightGrayDdd'
										}`}>
										{t('Followers')}
									</button>
									<button
										onClick={() => setSelectedMode('Following')}
										className={`hover:brightness-125 w-full p-3 ${
											selectedMode === 'Following' ? 'text-darkOrange' : 'text-lightGrayDdd'
										}`}>
										{t('Following')}
									</button>
								</section>
							</div>
							<div className='flex w-full justify-center flex-col items-center gap-y-1 mt-10'>
								{selectedMode === 'Lists' ? (
									<>
										<BookmarkSlashIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>{t('No lists')}</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											{t('Follow')} {getCookie('email').match(/^(.+)@/)?.[1] || ''}&nbsp;
											{t('for updates on lists they create in the future.')}
										</p>
									</>
								) : selectedMode === 'Grades' ? (
									<>
										<StarIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>{t('Brak ocen')}</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											{t('Follow')} {getCookie('email').match(/^(.+)@/)?.[1] || ''}&nbsp;
											{t('for updates on lists they create in the future.')}
										</p>
									</>
								) : selectedMode === 'Reviews' ? (
									<>
										<PencilIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>{t('Brak recenzji')}</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											{t('Follow')} {getCookie('email').match(/^(.+)@/)?.[1] || ''}&nbsp;
											{t('for updates on lists they create in the future.')}
										</p>
									</>
								) : selectedMode === 'Comments' ? (
									<>
										<PencilIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>{t('Brak komentarzy')}</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											{t('Follow')} {getCookie('email').match(/^(.+)@/)?.[1] || ''}&nbsp;
											{t('for updates on lists they create in the future.')}
										</p>
									</>
								) : selectedMode === 'Followers' ? (
									<>
										<BookmarkIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>{t('No followers')}</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											{t('Be the first to follow')} {getCookie('email').match(/^(.+)@/)?.[1] || ''}.
										</p>
									</>
								) : selectedMode === 'Following' ? (
									<>
										<BookmarkIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>{t('No followers yet')}</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											{t('Check back later to see users')} {getCookie('email').match(/^(.+)@/)?.[1] || ''}{' '}
											{t('Followers')}
										</p>
									</>
								) : (
									''
								)}
							</div>
						</main>
					</div>
				</div>
			) : (
				<div className='h-full absolute right-1/2 top-36 translate-x-1/2'>
					<div className='loader'></div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default UserPage;
