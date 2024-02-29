import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getCookie from '@/helpers/GetCookie';

export const LoginForm = ({ loginOrRegister }: any) => {
	const { t } = useTranslation();
	const router = useRouter();

	const exampleLogin = {
		email: 'user@example.com',
		password: 'test',
		avatarSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
		ref: '1',
	};

	const [isLogged, setLogged] = useState<boolean>(true);
	const [emailLogged, setEmailLogged] = useState('');

	const emailInputRef = useRef<any>(null);
	const passwordInputRef = useRef<any>(null);

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

	return (
		<>
			{loginOrRegister === 'register' ? (
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
			) : (
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
								if (!isLogged) {
									passwordInputRef.current.style.outline = '1px solid var(--red)';
									emailInputRef.current.style.outline = '1px solid var(--red)';
									setTimeout(() => {
										passwordInputRef.current.style.outline = '';
										emailInputRef.current.style.outline = '';
									}, 1200);
								}
							}}>
							{t('Continue')}
						</button>
					</form>
				</main>
			)}
		</>
	);
};
