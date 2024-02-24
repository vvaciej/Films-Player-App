'use client';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '@/app/layouts/Footer';

import '../../../../style/css/global.css';
import getCookie from '@/app/helpers/GetCookie';
import { useRouter } from 'next/navigation';
import useDocumentTitle from '@/app/helpers/PageTitle';
import { useEffect, useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';

const UserPage = () => {
	const [isLogged] = useState(getCookie('email') ? true : false);
	const router = useRouter();

	useDocumentTitle('Twoje konto - vvaciej-app');

	useEffect(() => {
		if (!isLogged) {
			router.push('/login');
		}
	}, []);

	return (
		<div className='space-light'>
			<Navbar isCutted={false} />
			{isLogged ? (
				<div className='content-full-space-centered'>
					<div className='main-container-width-padd-top-1240'>
						<header className='flex justify-between items-center'>
							<section className='flex gap-x-4 items-center'>
								<img
									className='h-32 rounded-[50%] mr-2'
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
