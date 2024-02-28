'use client';

import useDocumentTitle from '@/helpers/PageTitle';
import Link from 'next/link';
import getCookie from '../../../helpers/GetCookie';
import { useTranslation } from 'react-i18next';

const Policy: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t('Signin')} - vvaciej.app`);

	return (
		<div className='space-dark !justify-center items-center'>
			<div className='flex items-center h-max flex-col text-xs relative w-full pb-24'>
				<Link
					href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`}
					className='sm:text-6xl text-3xl font-bold'>
					VVACIEJ.APP
				</Link>
				<div
					className='flex flex-col h-4/6 mt-4 rounded p-6 sm:pb-8 pb-6 sm:w-[28rem] w-[93%] bg-1a1a border-[1px] border-gray3232'>
					<h1 className='text-lg'>{t('Create new account')}</h1>
					<main>
						<form
							className='flex flex-col mt-6 text-base'
							onSubmit={event => {
								event.preventDefault();
							}}>
							<section className='flex flex-col gap-y-1 mb-6'>
								<label htmlFor='email' className='text-sm'>
									Email
								</label>
								<input type='text' id='email' required className='orange-outline-focus input-style' />
							</section>
							<section className='flex flex-col gap-y-1 mb-6'>
								<label htmlFor='password' className='text-sm'>
									{t('Password')}
								</label>
								<input type='password' id='password' required className='orange-outline-focus input-style' />
							</section>
							<section className='flex flex-col gap-y-1 mb-6'>
								<label htmlFor='confirm-password' className='text-sm'>
									{t('Confirm password')}
								</label>
								<input type='password' id='confirm-password' required className='orange-outline-focus input-style' />
							</section>
							<button className='orange-btn-style !w-full mb-4' type='submit'>
								{t('Create account')}
							</button>
						</form>
					</main>
					<section className='flex items-center justify-center flex-col w-full gap-y-5'>
						<span
							className='text-xs text-center w-full px-2 text-lightGrayD5d5'>
							{t('Or signin by')}
						</span>
						<button
							className='rounded transition-all hover:brightness-125 border-[1px] border-gray3232'>
							<img
								src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png '
								className='h-10'
								alt='google-icon'
							/>
						</button>
					</section>
				</div>
				<p
					className='mt-8 text-sm text-center text-lightEee'>
					<span>{t('Already have an account?')}</span>
					<Link href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/login`} className='orange-link'>
						&nbsp;{t('Login')}
					</Link>
				</p>
			</div>
			<footer>
				<Link
					href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`}
					className='text-sm absolute bottom-10 transition-all right-1/2 translate-x-1/2 hover:brightness-125 text-gray9999'>
					&copy; {t('Source')} obejrzyj.to
				</Link>
			</footer>
		</div>
	);
};

export default Policy;
