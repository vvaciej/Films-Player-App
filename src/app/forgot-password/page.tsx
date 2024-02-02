'use client';

import '../../style/css/home.css';
import '../../style/css/reg-log.css';

import useDocumentTitle from '../helpers/PageTitle';
import Link from 'next/link';

const Login: React.FC = () => {
	useDocumentTitle('vvaciej.app - Logowanie');

	return (
		<div className='content-container'>
			<div className='reg-log-container'>
				<Link href='/' className='reg-log-brand-text'>
					VVACIEJ.APP
				</Link>
				<div className='reg-log-box'>
					<h3 className='text-sm mb-1'>Wprowadź swój adres email aby otrzymać link do zresetowania hasła.</h3>
					<section className='reg-log-input-form'>
						<section>
							<label htmlFor='email'>Email</label> <input type='text' id='email' />
						</section>
					</section>
					<button className='reg-log-create-acc-btn'>Kontynuuj</button>
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
