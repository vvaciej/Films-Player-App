'use client';

import '../../style/css/home.css';
import '../../style/css/register.css';

import useDocumentTitle from '@/app/helpers/PageTitle';
import { Footer } from '../layouts/Footer';
import Link from 'next/link';

const Policy: React.FC = () => {
	useDocumentTitle('vvaciej.app - Rejestracja');

	return (
		<>
			<div className='register-container'>
				<Link href='/' className='header-brand-text'>
					VVACIEJ.APP
				</Link>
				<div className='register-box'>
					<h1>Stwórz nowe konto</h1>
					<section className='register-input-form'>
						<section>
							<label htmlFor='email'>Email</label>
							<input type='text' id='email' />
						</section>
						<section>
							<label htmlFor='password'>Hasło</label>
							<input type='text' id='password' />
						</section>
						<section>
							<label htmlFor='confirm-password'>Potwierdź hasło</label>
							<input type='text' id='confirm-password' />
						</section>
					</section>
					<button className='register-create-acc-btn'>Stwórz konto</button>
					<section className='register-autorize-section'>
						<span>
							Lub zajerestruj się przez
							<hr></hr>
						</span>
						<button className='register-google-authorize-btn'>
							<img
								src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png '
								className='h-10'
								alt=''
							/>
						</button>
					</section>
				</div>
				<p>
					Already have an account? <Link href='/login'>Sign in</Link>
				</p>
				<Link href='/regulamin' className='register-bottom-link'>
					&copy; src obejrzyj.to
				</Link>
			</div>
			<Footer isVisible={false} />
		</>
	);
};

export default Policy;
