'use client';

import { useRef, useState } from 'react';
import '../../style/css/reg-log.css';

import useDocumentTitle from '../helpers/PageTitle';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getCookie from '../helpers/GetCookie';

const Login: React.FC = () => {
	useDocumentTitle('vvaciej.app - Logowanie');
	const router = useRouter();

	const exampleLogin = { email: 'user@example.com', password: 'test' };
	const emailInputRef = useRef<any>(null);
	const passwordInputRef = useRef<any>(null);

	const [isLogged, setLogged] = useState<boolean>(true);
	const [loggedEmail, setLoggedEmail] = useState('');

	const [rememberChecked, setRememberChecked] = useState(false);

	useEffect(() => {
		if (!rememberChecked) {
			const expirationDate = new Date();
			expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);
			document.cookie = `email=${loggedEmail}; expires=${expirationDate.toUTCString()}; path=/;`;
		} else {
			document.cookie = `email=${loggedEmail}; path=/;`;
		}
	}, [loggedEmail, rememberChecked]);

	const handleLogin = () => {
		const enteredPassword = passwordInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;

		if (exampleLogin.email.includes(enteredEmail) && exampleLogin.password.includes(enteredPassword)) {
			setLogged(true);
			router.push('/');
			setLoggedEmail(enteredEmail);
		} else {
			setLogged(false);
		}
	};

	return (
		<div className='space-dark-reg-log'>
			<div className='reg-log-container'>
				<Link href='/' className='reg-log-brand-text'>
					VVACIEJ.APP
				</Link>
				<div className='reg-log-box'>
					<h1>Zaloguj się na swoje konto</h1>
					<form
						className='reg-log-input-form'
						onSubmit={event => {
							event.preventDefault();
							handleLogin();
						}}>
						<section>
							<label htmlFor='email'>Email</label>{' '}
							<input
								type='text'
								ref={emailInputRef}
								id='email'
								required
								minLength={5}
								className={`${isLogged ? '' : 'failed-log'}`}
							/>
						</section>
						<section>
							<section className='flex justify-between'>
								<label htmlFor='password'>Hasło</label>
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
								className={`${isLogged ? '' : 'failed-log'}`}
							/>
							<section className='flex items-center gap-x-2 mt-2'>
								<input type='checkbox' id='remember' className='orange-checkbox' />
								<label htmlFor='remember' className='select-none' onClick={() => setRememberChecked(!rememberChecked)}>
									Zapamiętaj
								</label>
							</section>
						</section>
						<button className='reg-log-create-acc-btn' type='submit'>
							Kontynuuj
						</button>
					</form>
					<section className='reg-log-authorize-section'>
						<span className='login-authorize-text'>
							Lub zaloguj się przez <hr></hr>
						</span>
						<button className='reg-log-google-authorize-btn'>
							<img
								src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
								className='h-10'
								alt='google-icon'
							/>
						</button>
					</section>
				</div>
				<p>
					Don&apos;t have an account?&nbsp;
					<Link href='/register' className='orange-link'>
						Sign up
					</Link>
				</p>
			</div>
			<Link href='/' className='reg-log-bottom-link'>
				&copy; src obejrzyj.to
			</Link>
		</div>
	);
};

export default Login;
