'use client';

import { useRef, useState } from 'react';
import useDocumentTitle from '../helpers/PageTitle';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
	useDocumentTitle('vvaciej.app - Logowanie');
	const router = useRouter();

	const exampleLogin = { email: 'user@example.com', password: 'test' };
	const emailInputRef = useRef<any>(null);
	const passwordInputRef = useRef<any>(null);

	const [isLogged, setLogged] = useState<boolean>(true);
	const [emailLogged, setEmailLogged] = useState('');

	const [rememberChecked, setRememberChecked] = useState(false);

	useEffect(() => {
		if (!rememberChecked) {
			const expirationDate = new Date();
			expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);
			document.cookie = `email=${emailLogged}; expires=${expirationDate.toUTCString()}; path=/;`;
		} else {
			document.cookie = `email=${emailLogged}; path=/;`;
		}
	}, [emailLogged, rememberChecked]);

	const handleLogin = () => {
		const enteredPassword = passwordInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;

		if (exampleLogin.email.includes(enteredEmail) && exampleLogin.password.includes(enteredPassword)) {
			setLogged(true);
			router.push('/');
			setEmailLogged(enteredEmail);
		} else {
			setLogged(false);
		}
	};

	return (
		<div className='space-dark !justify-center items-center'>
			<div className='flex items-center h-max flex-col text-xs relative w-full pb-24'>
				<Link href='/' className='sm:text-6xl text-3xl font-bold'>
					VVACIEJ.APP
				</Link>
				<div
					className='reg-log-box flex flex-col h-4/6 mt-4 rounded p-6 sm:p-10 sm:pb-8 pb-6 sm:w-[28rem] w-11/12'
					style={{
						backgroundColor: 'var(--dark-1a1a)',
						border: '1px solid var(--gray-3232)',
					}}>
					<h1 className='text-lg'>Zaloguj się na swoje konto</h1>
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
								className='orange-outline-focus input-style'
								style={{
									outline: isLogged ? '' : '1px solid rgba(239, 58, 48, 0.704)',
								}}
							/>
						</section>
						<section className='flex flex-col gap-y-1 mb-6'>
							<section className='flex justify-between'>
								<label htmlFor='password' className='text-sm'>
									Hasło
								</label>
								<Link href='/forgot-password' className='orange-link text-xs'>
									Zapomniałeś hasła?
								</Link>
							</section>
							<input
								type='password'
								ref={passwordInputRef}
								id='password'
								required
								minLength={4}
								maxLength={30}
								className='orange-outline-focus input-style'
								style={{
									outline: isLogged ? '' : '1px solid rgba(239, 58, 48, 0.704)',
								}}
							/>
							<section className='flex items-center gap-x-2 mt-2'>
								<input type='checkbox' id='remember' className='orange-checkbox' />
								<label
									htmlFor='remember'
									className='select-none text-sm'
									onClick={() => setRememberChecked(!rememberChecked)}>
									Zapamiętaj
								</label>
							</section>
						</section>
						<button className='orange-btn-style !w-full mb-4' type='submit'>
							Kontynuuj
						</button>
					</form>
					<section className='flex items-center justify-center flex-col w-full gap-y-5'>
						<span
							className='login-authorize-text text-xs text-center w-full px-2'
							style={{
								color: 'var(--light-gray-d5d5)',
							}}>
							Lub zaloguj się przez
						</span>
						<button
							className='rounded transition-all hover:brightness-125'
							style={{
								border: '1px solid var(--gray-3232)',
							}}>
							<img
								src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
								className='h-10'
								alt='google-icon'
							/>
						</button>
					</section>
				</div>
				<p
					className='mt-8 text-sm text-center'
					style={{
						color: 'var(--light-gray-eee)',
					}}>
					<span>Don&apos;t have an account?&nbsp;</span>
					<Link href='/register' className='orange-link'>
						Sign up
					</Link>
				</p>
			</div>
			<Link
				href='/'
				className='text-sm absolute bottom-10 transition-all left-1/2 translate-x-1/2 hover:brightness-125'
				style={{
					color: 'var(--gray-9999)',
					transform: 'translate(-50%)',
				}}>
				&copy; src obejrzyj.to
			</Link>
		</div>
	);
};

export default Login;
