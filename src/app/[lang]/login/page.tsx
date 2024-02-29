'use client';

import useDocumentTitle from '../../../helpers/PageTitle';
import Link from 'next/link';
import getCookie from '../../../helpers/GetCookie';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../components/LoginForm';

const Login: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Logowanie`)} - vvaciej.app`);

	return (
		<div className='space-dark !justify-center items-center'>
			<div className='flex items-center h-max flex-col text-xs relative w-full pb-24'>
				<Link
					href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`}
					className='sm:text-6xl text-3xl font-bold'>
					VVACIEJ.APP
				</Link>
				<div className='flex flex-col h-4/6 mt-4 rounded p-6 sm:pb-8 pb-6 sm:w-[28rem] w-[93%] bg-1a1a border-[1px] border-gray3232'>
					<h1 className='text-lg'>{t('Sign in to your account')}</h1>
					<LoginForm loginOrRegister='login' />
					<section className='flex items-center justify-center flex-col w-full gap-y-5'>
						<span className='login-authorize-text text-xs text-center w-full px-2 text-lightGrayD5d5'>
							{t('Or login by')}
						</span>
						<button className='rounded transition-all hover:brightness-125 border-[1px] border-gray3232'>
							<img
								src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
								className='h-10'
								alt='google-icon'
							/>
						</button>
					</section>
				</div>
				<p className='mt-8 text-sm text-center text-lightEee'>
					<span>{t("Don't have account?")}&nbsp;</span>
					<Link href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/register`} className='orange-link'>
						{t('Sign in')}
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

export default Login;
