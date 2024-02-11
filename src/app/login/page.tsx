'use client';

import '../../style/css/reg-log.css';

import useDocumentTitle from '../helpers/PageTitle';
import Link from 'next/link';

const Login: React.FC = () => {
	useDocumentTitle('vvaciej.app - Logowanie');

	return (
		<div className='space-dark-reg-log'>
			<div className='reg-log-container'>
				<Link href='/' className='reg-log-brand-text'>
					VVACIEJ.APP
				</Link>
				<div className='reg-log-box'>
					<h1>Zaloguj się na swoje konto</h1>
					<section className='reg-log-input-form'>
						<section>
							<label htmlFor='email'>Email</label> <input type='text' id='email' />
						</section>
						<section>
							<section className='flex justify-between'>
								<label htmlFor='password'>Hasło</label>
								<Link href='/forgot-password' className='orange-link text-xs'>
									Zapomniałeś hasła?
								</Link>
							</section>
							<input type='password' id='password' />
							<section className='flex items-center gap-x-2 mt-2'>
								<input type='checkbox' id='remember' className='orange-checkbox' />
								<label htmlFor='remember' className='select-none'>
									Zapamiętaj
								</label>
							</section>
						</section>
					</section>
					<button className='reg-log-create-acc-btn'>Kontynuuj</button>
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
