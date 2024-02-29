'use client';

import { useRef, useState } from 'react';
import useDocumentTitle from '../../../helpers/PageTitle';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getCookie from '../../../helpers/GetCookie';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
	const router = useRouter();
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Logowanie`)} - vvaciej.app`);

	const exampleLogin = {
		email: 'user@example.com',
		password: 'test',
		avatarSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
		ref: '1',
	};

	const emailInputRef = useRef<any>(null);
	const passwordInputRef = useRef<any>(null);

	const [isLogged, setLogged] = useState<boolean>(true);
	const [emailLogged, setEmailLogged] = useState('');

	const [rememberChecked, setRememberChecked] = useState(false);

	useEffect(() => {
		const expirationDate = new Date();
		if (!rememberChecked) {
			expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);

			document.cookie = `email=${emailLogged}; expires=${expirationDate.toUTCString()}; path=/;`;
			document.cookie = `avatarSrc=${exampleLogin.avatarSrc}; path=/;`;
			document.cookie = `ref=${exampleLogin.ref}; path=/;`;
		} else {
			expirationDate.setFullYear(expirationDate.getFullYear() + 1);

			document.cookie = `email=${emailLogged}; expires=${expirationDate.toUTCString()}; path=/;`;
			document.cookie = `avatarSrc=${exampleLogin.avatarSrc}; expires=${expirationDate.toUTCString()}; path=/;`;
			document.cookie = `ref=${exampleLogin.ref}; expires=${expirationDate.toUTCString()}; path=/;`;
		}
	}, [emailLogged, rememberChecked]);

	const handleLogin = () => {
		const enteredPassword = passwordInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;

		if (exampleLogin.email.includes(enteredEmail) && exampleLogin.password.includes(enteredPassword)) {
			setLogged(true);
			router.push(`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}`);
			setEmailLogged(enteredEmail);
		} else {
			setLogged(false);
		}
	};

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
					<main>
						<form
							className='flex flex-col mt-6 text-base'
							onSubmit={event => {
								event.preventDefault();
								handleLogin();
							}}>
							<section className='flex flex-col gap-y-1 mb-6'>
								<label htmlFor='email' className='text-sm'>
									Email
								</label>
								<input
									type='text'
									ref={emailInputRef}
									id='email'
									required
									minLength={5}
									className={`orange-outline-focus input-style transition-all`}
								/>
							</section>
							<section className='flex flex-col gap-y-1 mb-6'>
								<section className='flex justify-between'>
									<label htmlFor='password' className='text-sm'>
										{t('Password')}
									</label>
									<Link
										href={`/${getCookie('langChoosed') === 'english' ? 'en' : 'pl'}/forgot-password`}
										className='orange-link text-xs'>
										{t('Forgot password?')}
									</Link>
								</section>
								<input
									type='password'
									ref={passwordInputRef}
									id='password'
									required
									minLength={4}
									maxLength={30}
									className={`orange-outline-focus input-style transition-all`}
								/>
								<section className='flex items-center gap-x-2 mt-2'>
									<input
										type='checkbox'
										id='remember'
										className='orange-checkbox'
										onClick={() => setRememberChecked(!rememberChecked)}
									/>
									<label htmlFor='remember' className='select-none text-sm'>
										{t('Remember')}
									</label>
								</section>
							</section>
							<button
								className='orange-btn-style !w-full mb-4'
								type='submit'
								onClick={() => {
									passwordInputRef.current.style.outline = '1px solid var(--red)';
									emailInputRef.current.style.outline = '1px solid var(--red)';
									setTimeout(() => {
										if (!isLogged) {
											passwordInputRef.current.style.outline = '';
											emailInputRef.current.style.outline = '';
										}
									}, 1200);
								}}>
								{t('Continue')}
							</button>
						</form>
					</main>
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
