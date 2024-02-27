'use client';

import useDocumentTitle from '../helpers/PageTitle';
import Link from 'next/link';
import getCookie from '../helpers/GetCookie';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Logowanie`)} - vvaciej.app`);

	return (
		<div className='space-dark !justify-center items-center'>
			<div className='flex items-center h-max flex-col text-xs relative w-full pb-16'>
				<Link
					href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}`}
					className='sm:text-6xl text-3xl font-bold'>
					VVACIEJ.APP
				</Link>
				<main className='flex justify-center'>
					<form
						onSubmit={event => {
							event.preventDefault();
						}}
						className='flex flex-col h-4/6 mt-4 rounded p-6 sm:pb-8 pb-6 sm:w-[28rem] w-11/12'
						style={{
							backgroundColor: 'var(--dark-1a1a)',
							border: '1px solid var(--gray-3232)',
						}}>
						<h3 className='text-sm mb-1'>{t('Wprowadź swój adres email aby otrzymać link do zresetowania hasła.')}</h3>
						<section className='flex flex-col gap-y-1 mb-6'>
							<label className='text-sm mt-4' htmlFor='email'>
								Email
							</label>
							<input type='text' className='orange-outline-focus input-style' id='email' />
						</section>
						<button className='orange-btn-style !w-full text-base font-medium' type='submit'>
							{t('Kontynuuj')}
						</button>
					</form>
				</main>
				<p
					className='mt-8 text-sm text-center'
					style={{
						color: 'var(--light-gray-eee)',
					}}>
					<span>{t('Nie masz konta?')}</span>
					<Link href={`/${getCookie('langChoosed') === 'angielski' ? 'en' : 'pl'}/register`} className='orange-link'>
						&nbsp;{t('Zaloguj sie')}
					</Link>
				</p>
			</div>
			<footer>
				<Link
					href='/'
					className='text-sm absolute bottom-10 transition-all left-1/2 translate-x-1/2 hover:brightness-125'
					style={{
						color: 'var(--gray-9999)',
						transform: 'translate(-50%)',
					}}>
					&copy; {t('Źródło')} obejrzyj.to
				</Link>
			</footer>
		</div>
	);
};

export default Login;
