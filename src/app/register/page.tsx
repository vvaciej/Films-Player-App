'use client';

import '../../style/css/reg-log.css';

import useDocumentTitle from '@/app/helpers/PageTitle';
import Link from 'next/link';

const Policy: React.FC = () => {
	useDocumentTitle('vvaciej.app - Rejestracja');

	return (
		<div className='space-dark-reg-log'>
			<div className='reg-log-container'>
				<Link href='/' className='reg-log-brand-text'>
					VVACIEJ.APP
				</Link>
				<div className='reg-log-box'>
					<h1>Stwórz nowe konto</h1>
					<form className='reg-log-input-form' onSubmit={(event) => {
						event.preventDefault();
					}}>
						<section>
							<label htmlFor='email'>Email</label>
							<input type='text' id='email' required />
						</section>
						<section>
							<label htmlFor='password'>Hasło</label>
							<input type='password' id='password' required />
						</section>
						<section>
							<label htmlFor='confirm-password'>Potwierdź hasło</label>
							<input type='password' id='confirm-password' required />
						</section>
						<button className='reg-log-create-acc-btn' type='submit'>Stwórz konto</button>
					</form>
					<section className='reg-log-authorize-section'>
						<span className='register-authorize-text'>
							Lub zajerestruj się przez
							<hr></hr>
						</span>
						<button className='reg-log-google-authorize-btn'>
							<img
								src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png '
								className='h-10'
								alt='google-icon'
							/>
						</button>
					</section>
				</div>
				<p>
					Already have an account?{' '}
					<Link href='/login' className='orange-link'>
						Sign in
					</Link>
				</p>
			</div>
			<Link href='/' className='reg-log-bottom-link'>
				&copy; src obejrzyj.to
			</Link>
		</div>
	);
};

export default Policy;
