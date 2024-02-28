'use client';

import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import useDocumentTitle from '../../../helpers/PageTitle';
import { useTranslation } from 'react-i18next';

const Kontakt: React.FC = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Get in touch`)} - vvaciej.app`);

	return (
		<div className='space-dark'>
			<Navbar isCutted={true} />
			<div className='content-full-space-centered'>
				<div className='main-container-width-padd-top-1240 !min-h-[76vh] !pb-0 h-max sm:!w-[40rem] w-[93%]'>
					<main className='h-full w-full rounded p-8 text-[0.82rem] border-[1px] border-gray3232'>
						<h1 className='text-2xl mb-1'>{t('Get in touch')}</h1>
						<p>{t('Use the form below to send us a message, and we will contact you as soon as possible.')}</p>
						<form
							className='flex flex-col gap-y-6 mt-10 h-[calc(100%-4px-39.38px-36px-2.5rem)]'
							onSubmit={event => event.preventDefault()}>
							<section className='flex flex-col gap-1 w-full'>
								<label htmlFor='title'>{t('Title')}</label>
								<input className='input-style orange-outline-focus' type='text' id='title' required />
							</section>
							<section className='flex flex-col gap-1 w-full'>
								<label htmlFor='email'>Email</label>
								<input className='input-style orange-outline-focus' type='text' id='email' required />
							</section>
							<section className='flex flex-col gap-1 w-full'>
								<label htmlFor='message'>{t('Message')}</label>
								<textarea className='input-style orange-outline-focus !pt-2 !h-[11rem]' id='message' required />
							</section>
							<section className='w-full text-end'>
								<button className='orange-btn-style' type='submit'>
									{t('Send')}
								</button>
							</section>
						</form>
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Kontakt;
