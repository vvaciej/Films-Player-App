'use client';

import '../../style/css/contact.css';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '../layouts/Footer';
import useDocumentTitle from '../helpers/PageTitle';

const Kontakt: React.FC = () => {
	useDocumentTitle('vvaciej.app - Skontaktuj się');

	return (
		<div className='space-dark'>
			<Navbar isCutted={true} />
			<div className='content-full-space-centered'>
				<div className='main-container-width-padd-top-1240 !min-h-[76vh] !pb-0 h-max sm:!w-[40rem] w-[93%]'>
					<div
						className='h-full w-full rounded p-8 text-[0.82rem]'
						style={{
							border: '1px solid var(--gray-3232)',
						}}>
						<h1 className='text-2xl mb-1'>Skontaktuj się</h1>
						<p>
							Użyj poniższego formularza, aby przesłać nam wiadomość, a my skontaktujemy się z Tobą jak najszybciej.
						</p>
						<form
							className='flex flex-col gap-y-6 mt-10'
							style={{
								height: 'calc(100% - 4px - 39.38px - 36px - 2.5rem)',
							}}
							onSubmit={event => event.preventDefault()}>
							<section className='flex flex-col gap-1 w-full'>
								<label htmlFor='title'>Tytuł</label>
								<input className='input-style orange-outline-focus' type='text' id='title' required />
							</section>
							<section className='flex flex-col gap-1 w-full'>
								<label htmlFor='email'>Email</label>
								<input className='input-style orange-outline-focus' type='text' id='email' required />
							</section>
							<section className='flex flex-col gap-1 w-full'>
								<label htmlFor='message'>Wiadomość</label>
								<textarea className='input-style orange-outline-focus !pt-2 !h-[11rem]' id='message' required />
							</section>
							<section className='w-full text-end'>
								<button className='orange-btn-style' type='submit'>
									Wyślij
								</button>
							</section>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Kontakt;
