'use client';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';

import '../../../../style/css/global.css';
import getCookie from '@/app/helpers/GetCookie';
import { useRouter } from 'next/navigation';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { useEffect, useState } from 'react';
import { BookmarkSlashIcon, CloudIcon, ListBulletIcon, PencilIcon, StarIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon } from '@heroicons/react/24/outline';

const UserPage = () => {
	const [isLogged] = useState(getCookie('email') ? true : false);
	const router = useRouter();

	useDocumentTitle('Twoje konto - vvaciej-app');

	useEffect(() => {
		if (!isLogged) {
			router.push('/login');
		}
	}, []);

	const [selectedMode, setSelectedMode] = useState<string>('Listy');

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			{isLogged ? (
				<div className='content-full-space-centered'>
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
									<button className='btn-style-outlined !text-xs'>
										<PencilIcon className='h-4' />
										<span>Edytuj profil</span>
									</button>
								</section>
							</section>
							<section className='flex gap-x-3 items-center'>
								<section className='flex flex-col items-center uppercase'>
									<b className='text-lg'>0</b>
									<span className='text-xs text-zinc-300'>Obserwujący</span>
								</section>
								<hr
									className='border-r-2 h-8'
									style={{
										borderColor: 'var(--gray-3232)',
									}}
								/>
								<section className='flex flex-col items-center uppercase'>
									<b className='text-lg'>0</b>
									<span className='text-xs text-zinc-300'>Obserwuje</span>
								</section>
								<hr
									className='border-r-2 h-8'
									style={{
										borderColor: 'var(--gray-3232)',
									}}
								/>
								<section className='flex flex-col items-center uppercase'>
									<b className='text-lg'>0</b>
									<span className='text-xs text-zinc-300'>Listy</span>
								</section>
							</section>
						</header>
						<main className='mt-10'>
							<div
								className='overflow-hidden overflow-x-auto hide-scrollbar'
								style={{
									borderBottom: '1px solid var(--gray-3232)',
								}}>
								<section className='text-sm justify-between flex w-[48rem] relative'>
									<hr className='absolute bottom-0 border-r-2 w-32 transition-all'
										style={{
											borderBottom: '1px solid var(--dark-orange)',
											borderColor: 'var(--dark-orange)',
											left: selectedMode === 'Listy' ? '0' : selectedMode === 'Oceny' ? '128px' : selectedMode === 'Recenzje' ? 'calc(128px * 2)' : selectedMode === 'Komentarze' ? 'calc(128px * 3)' : selectedMode === 'Obserwujący' ? 'calc(128px * 4)' : selectedMode === 'Obserwuje' ? 'calc(128px * 5)' : ''
										}}></hr>
									<button
										onClick={() => setSelectedMode('Listy')}
										className='hover:brightness-125 w-full p-3'
										style={{
											color: selectedMode === 'Listy' ? 'var(--dark-orange)' : 'var(--light-gray-ddd)',
										}}>
										Listy
									</button>
									<button
										onClick={() => setSelectedMode('Oceny')}
										className='hover:brightness-125 w-full p-3'
										style={{
											color: selectedMode === 'Oceny' ? 'var(--dark-orange)' : 'var(--light-gray-ddd)',
										}}>
										Oceny
									</button>
									<button
										onClick={() => setSelectedMode('Recenzje')}
										className='hover:brightness-125 w-full p-3'
										style={{
											color: selectedMode === 'Recenzje' ? 'var(--dark-orange)' : 'var(--light-gray-ddd)',
										}}>
										Recenzje
									</button>
									<button
										onClick={() => setSelectedMode('Komentarze')}
										className='hover:brightness-125 w-full p-3'
										style={{
											color: selectedMode === 'Komentarze' ? 'var(--dark-orange)' : 'var(--light-gray-ddd)',
										}}>
										Komentarze
									</button>
									<button
										onClick={() => setSelectedMode('Obserwujący')}
										className='hover:brightness-125 w-full p-3'
										style={{
											color: selectedMode === 'Obserwujący' ? 'var(--dark-orange)' : 'var(--light-gray-ddd)',
										}}>
										Obserwujący
									</button>
									<button
										onClick={() => setSelectedMode('Obserwuje')}
										className='hover:brightness-125 w-full p-3'
										style={{
											color: selectedMode === 'Obserwuje' ? 'var(--dark-orange)' : 'var(--light-gray-ddd)',
										}}>
										Obserwuje
									</button>
								</section>
							</div>
							<div className='content-full-space-centered flex-col items-center gap-y-1 mt-10'>
								{selectedMode === 'Listy' ? (
									<>
										<BookmarkSlashIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>Brak list</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											Follow {getCookie('email').match(/^(.+)@/)?.[1] || ''} for updates on lists they create in the
											future.
										</p>
									</>
								) : selectedMode === 'Oceny' ? (
									<>
										<StarIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>Brak ocen</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											Follow {getCookie('email').match(/^(.+)@/)?.[1] || ''} for updates on titles they rate in the
											future.
										</p>
									</>
								) : selectedMode === 'Recenzje' ? (
									<>
										<PencilIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>Brak recenzji</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											Follow {getCookie('email').match(/^(.+)@/)?.[1] || ''} for updates on titles they review in the
											future.
										</p>
									</>
								) : selectedMode === 'Komentarze' ? (
									<>
										<PencilIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>Brak komentarzy</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											Follow {getCookie('email').match(/^(.+)@/)?.[1] || ''} for updates on comments they post in the
											future.
										</p>
									</>
								) : selectedMode === 'Obserwujący' ? (
									<>
										<BookmarkIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>Brak obserwujących</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											Be the first to follow {getCookie('email').match(/^(.+)@/)?.[1] || ''}.
										</p>
									</>
								) : selectedMode === 'Obserwuje' ? (
									<>
										<BookmarkIcon className='h-5' />
										<h3 className='text-md text-zinc-200 mt-1'>Nikogo jeszcze nie obserwuje</h3>
										<p className='text-[13.2px] text-zinc-400 text-center'>
											Check back later to see users {getCookie('email').match(/^(.+)@/)?.[1] || ''} is following.
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
