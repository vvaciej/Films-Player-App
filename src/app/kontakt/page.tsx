'use client';

import '../../style/css/home.css';
import '../../style/css/contact.css';

import { Navbar } from '@/app/layouts/Navbar';
import { Footer } from '../layouts/Footer';
import React, { useRef } from 'react';
import useDocumentTitle from '../helpers/PageTitle';

const Kontakt: React.FC = () => {
	useDocumentTitle('Skontaktuj się - vvaciej.app');

	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<Navbar isCutted={true} />
			<div className='contact-container'>
				<div className='contact-box'>
					<h1>Skontaktuj się</h1>
					<p>Użyj poniższego formularza, aby przesłać nam wiadomość, a my skontaktujemy się z Tobą jak najszybciej.</p>
					<form className='contact-input-form' ref={formRef} onSubmit={handleSubmit}>
						<section>
							<label htmlFor='title'>Tytuł</label>
							<input type='text' id='title' required />
						</section>
						<section>
							<label htmlFor='email'>Email</label>
							<input type='text' id='email' required />
						</section>
						<section>
							<label htmlFor='message'>Wiadomość</label>
							<textarea className='contact-message-textarea' id='message' required />
						</section>
						<button className='contact-submit-btn' type='submit'>
							Wyślij
						</button>
					</form>
				</div>
			</div>
			<Footer isVisible={true} />
		</>
	);
};

export default Kontakt;
