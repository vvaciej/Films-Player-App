'use client';

import useDocumentTitle from '../helpers/PageTitle';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import '../../style/css/global.css';
import { useRef, useEffect } from 'react';
import getCookie from '../helpers/GetCookie';
import {
	CameraIcon,
	UserIcon,
	ArrowRightEndOnRectangleIcon,
	LockClosedIcon,
	DevicePhoneMobileIcon,
	XCircleIcon,
	ComputerDesktopIcon,
	GlobeAmericasIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AccSettings = () => {
	useDocumentTitle('Ustawienia konta - vvaciej.app');

	const [selectedFile, setSelectedFile] = useState(null);
	const [photoFile, setPhotoFile] = useState<string>(
		'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
	);

	const [langSelected, setLangSelected] = useState<string>('polski');
	const [langDropdownActive, setLangDropdownActive] = useState<boolean>(false);

	const [countrySelected, setCountrySelected] = useState<string>('Poland');
	const [countryDropdownActive, setCountryDropdownActive] = useState<boolean>(false);

	const [timeZoneSelected, setTimeZoneSelected] = useState<string>('Warsaw');
	const [timeZoneDropdownActive, setTimeZoneDropdownActive] = useState<boolean>(false);

	const langSelectBtnRef = useRef<HTMLButtonElement>(null);
	const langDropdownRef = useRef<HTMLDivElement>(null);

	const countrySelectBtnRef = useRef<HTMLButtonElement>(null);
	const countryDropdownRef = useRef<HTMLDivElement>(null);

	const timeZoneSelectBtnRef = useRef<HTMLButtonElement>(null);
	const timeZoneDropdownRef = useRef<HTMLDivElement>(null);

	const handleDocumentClick = (event: MouseEvent) => {
		const isInsideDropdown = (
			target: EventTarget | null,
			dropdownRef: React.RefObject<HTMLDivElement | HTMLButtonElement>
		) => {
			return dropdownRef.current && dropdownRef.current.contains(target as Node);
		};

		if (!isInsideDropdown(event.target, langSelectBtnRef) && !isInsideDropdown(event.target, langDropdownRef)) {
			setLangDropdownActive(false);
		}

		if (!isInsideDropdown(event.target, countrySelectBtnRef) && !isInsideDropdown(event.target, countryDropdownRef)) {
			setCountryDropdownActive(false);
		}

		if (!isInsideDropdown(event.target, timeZoneSelectBtnRef) && !isInsideDropdown(event.target, timeZoneDropdownRef)) {
			setTimeZoneDropdownActive(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleDocumentClick);

		return () => {
			document.body.removeEventListener('click', handleDocumentClick);
		};
	}, []);

	const [isLogged] = useState(getCookie('email') ? true : false);

	const handleFileChange = (event: any) => {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				const imgElement = document.getElementById('userAvatar');
				if (imgElement) {
					const imagePath = reader.result as string;
					(imgElement as HTMLImageElement).src = imagePath;
				}
			};

			reader.readAsDataURL(file);
			setSelectedFile(file);
		}
	};

	const router = useRouter();

	useEffect(() => {
		if (!isLogged) {
			router.push('/login');
		}
	}, []);

	const informationRef = useRef<HTMLDivElement>(null);
	const socialLoginRef = useRef<HTMLDivElement>(null);
	const passwordRef = useRef<HTMLDivElement>(null);
	const twoFactorAuthRef = useRef<HTMLDivElement>(null);
	const activeSessionsRef = useRef<HTMLDivElement>(null);
	const langRef = useRef<HTMLDivElement>(null);
	const deleteAccRef = useRef<HTMLDivElement>(null);

	return (
		<div className='space-dark'>
			<Navbar isCutted={true} />
			{isLogged ? (
				<div className='content-full-space-centered'>
					<div className='main-container-width-padd-top-1240'>
						<header className='w-full text-left mb-6 sm:mb-12'>
							<h1 className='text-3xl'>Ustawienia konta</h1>
							<span className='text-zinc-400'>Zaktualizuj informacje o swoim koncie.</span>
						</header>
						<div className='flex gap-x-8'>
							<aside className='w-max hidden lg:block sticky top-20 h-max'>
								<ul>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												informationRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<UserIcon className='h-5' />
											<span>Informacje</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												socialLoginRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<ArrowRightEndOnRectangleIcon className='h-5' />
											<span>Social login</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												passwordRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<LockClosedIcon className='h-5' />
											<span>Hasło</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												twoFactorAuthRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<DevicePhoneMobileIcon className='h-5' />
											<span className='w-max'>Uwierzytelnienia dwuskładnikowe</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												activeSessionsRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<ComputerDesktopIcon className='h-5' />
											<span>Aktywne sesje</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												langRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<GlobeAmericasIcon className='h-5' />
											<span>Kraj i język</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												deleteAccRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<XCircleIcon className='h-5' />
											<span>Usuń konto</span>
										</button>
									</li>
								</ul>
							</aside>
							<main className='w-full h-max flex flex-col gap-y-7'>
								<div
									ref={informationRef}
									className='bg-slate-400 px-5 py-4 text-zinc-200 rounded'
									style={{
										backgroundColor: 'var(--gray-2222)',
										border: '1px solid var(--gray-3232)',
									}}>
									<h2
										className='pb-2'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										Zaktualizuj imię nazwisko lub zdjęcie profilowe.
									</h2>
									<section
										className='flex flex-col sm:flex-row items-center'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										<section className='w-full mt-6 text-sm flex-col flex gap-y-6 pb-8'>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='name'>Imię</label>
												<input type='text' id='name' className='input-style' />
											</section>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='surname'>Nazwisko</label>
												<input type='text' id='surname' className='input-style' />
											</section>
										</section>
										<section className='text-sm sm:w-96 flex items-center flex-col gap-y-2 pb-3 sm:pb-0'>
											<span>Zdjecie profilowe</span>
											<section className='relative '>
												<label
													htmlFor='upload'
													className='h-9 w-9 flex items-center cursor-pointer justify-center absolute bottom-0 right-0 '>
													<input
														type='file'
														className='hidden'
														id='upload'
														onChange={handleFileChange}
														style={{
															border: '1px solid var(--orange)',
															borderRadius: '50%',
															backgroundColor: 'var(--gray-3232)',
														}}
													/>
													<div
														className='p-2 rounded-3xl hover:brightness-75 transition-all'
														style={{
															border: '1px solid var(--orange)',
															backgroundColor: 'var(--gray-3232)',
														}}>
														<CameraIcon
															className='h-5'
															style={{
																color: 'var(--orange)',
															}}
														/>
													</div>
												</label>
												<img
													src={`${photoFile}`}
													alt='user avatar'
													id='userAvatar'
													className='h-20 w-20 mr-1'
													style={{
														outline: '1px solid var(--gray-3232)',
														borderRadius: '50%',
													}}
												/>
											</section>
											<button className='text-red-500 text-xs mt-2'>Usuń zdjęcie</button>
										</section>
									</section>
									<section className='flex justify-end mt-2'>
										<button className='orange-btn-style text-sm font-medium'>Zapisz</button>
									</section>
								</div>
								<div
									ref={socialLoginRef}
									className='bg-slate-400 px-5 py-4 text-zinc-200 rounded'
									style={{
										backgroundColor: 'var(--gray-2222)',
										border: '1px solid var(--gray-3232)',
									}}>
									<h2
										className='pb-2'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										Logowanie poprzez portale społecznościowe
									</h2>
									<section
										className='flex items-center justify-between sm:px-3'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										<section className='w-full flex mt-6 text-sm gap-1 gap-x-3 pb-8'>
											<button
												className='rounded transition-all hover:brightness-125 w-max'
												style={{
													border: '1px solid var(--gray-3232)',
												}}>
												<img
													src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png '
													className='h-10'
													alt='google-icon'
												/>
											</button>
											<section>
												<h2 className='font-semibold'>Google account</h2>
												<span className='text-xs'>Disabled</span>
											</section>
										</section>
										<section className='text-sm flex items-center flex-col gap-y-2 pb-3 sm:pb-0'>
											<button className='orange-outlined-btn-style py-1 px-3 transition-all'>Włącz</button>
										</section>
									</section>
									<section className='mt-4'>
										<p className='text-[13px] text-zinc-400'>
											Jeśli wyłączysz loginy społecznościowe, nadal będziesz mógł zalogować się za pomocą wiadomości e
											-mail i hasła.
										</p>
									</section>
								</div>
								<div
									ref={passwordRef}
									className='bg-slate-400 px-5 py-4 text-zinc-200 rounded'
									style={{
										backgroundColor: 'var(--gray-2222)',
										border: '1px solid var(--gray-3232)',
									}}>
									<h2
										className='pb-2'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										Zaktualizuj imię nazwisko lub zdjęcie profilowe.
									</h2>
									<section
										className='flex flex-col sm:flex-row items-center'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										<section className='w-full mt-6 text-sm flex-col flex gap-y-6 pb-8'>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='name'>Imię</label>
												<input type='text' id='name' className='input-style' />
											</section>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='surname'>Nazwisko</label>
												<input type='text' id='surname' className='input-style' />
											</section>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='surname'>Potwierdź hasło</label>
												<input type='text' id='surname' className='input-style' />
											</section>
										</section>
									</section>
									<section className='flex justify-end mt-2'>
										<button className='orange-btn-style text-sm font-medium'>Zaktualizuj hasło</button>
									</section>
								</div>
								<div
									ref={twoFactorAuthRef}
									className='bg-slate-400 px-5 py-4 text-zinc-200 rounded'
									style={{
										backgroundColor: 'var(--gray-2222)',
										border: '1px solid var(--gray-3232)',
									}}>
									<h2
										className='pb-2'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										Uwierzytelnianie dwuskładnikowe
									</h2>
									<h1 className='mt-6 font-semibold'>Nie włączyłeś uwierzytelniania dwuskładnikowego.</h1>
									<p className='mt-4 text-sm max-w-[40rem]'>
										Po włączeniu uwierzytelniania dwuskładnikowego zostaniesz poproszony o bezpieczny, losowy token
										podczas uwierzytelniania. Możesz uzyskać ten token z aplikacji Google Authenticator swojego
										telefonu.
									</p>
									<button className='orange-btn-style mt-4'>Włacz</button>
								</div>
								<div
									ref={activeSessionsRef}
									className='bg-slate-400 px-5 py-4 text-zinc-200 rounded'
									style={{
										backgroundColor: 'var(--gray-2222)',
										border: '1px solid var(--gray-3232)',
									}}>
									<h2
										className='pb-2'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										Aktywne sesje
									</h2>
									<p className='mt-4 text-sm'>
										W razie potrzeby możesz wylogować się ze wszystkich innych sesji przeglądarki na wszystkich
										urządzeniach. Twoje ostatnie sesje są wymienione poniżej. Jeśli uważasz, że ktoś inny zalogował sie
										na twoje konto, powinieneś również zaktualizować swoje hasło. (Lokalizacje i adresy IP mogą być inne
										niż w rzeczywistości z powodu używania sieci VPN. Dzięki temu każdy użytkownik naszej strony jest
										bezpieczny i anonimowy.)
									</p>
									<section className='mt-6'>
										<ul>
											<li className='flex gap-x-3'>
												<ComputerDesktopIcon className='h-10' />
												<section>
													<h1 className='text-sm text-white'>Windows - Chrome</h1>
													<span className='text-xs'>Warsaw, Poland</span>
													<p className='text-xs'>
														IP address... - <span className='text-green-300'>this device</span>
													</p>
												</section>
											</li>
										</ul>
									</section>
									<button className='orange-outlined-btn-style text-sm py-1 px-3 transition-all mt-8'>
										Wyloguj z innych sesji
									</button>
								</div>
								<div
									ref={langRef}
									className='bg-slate-400 px-5 py-4 text-zinc-200 rounded'
									style={{
										backgroundColor: 'var(--gray-2222)',
										border: '1px solid var(--gray-3232)',
									}}>
									<h2
										className='pb-2'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										Data, czas i język
									</h2>
									<section
										className='flex flex-col sm:flex-row items-center'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										<section className='w-full mt-6 text-sm flex-col flex gap-y-6 pb-8'>
											<section className='flex flex-col gap-y-1 justify-between relative'>
												<span>Język</span>
												<button
													ref={langSelectBtnRef}
													className='btn-style-outlined min-h-10 justify-between'
													onClick={() => setLangDropdownActive(!langDropdownActive)}>
													{langSelected}
													<ChevronDownIcon className='h-4' />
												</button>
												<div
													ref={langDropdownRef}
													className='absolute h-max w-full top-16 rounded py-1 transition-all z-10'
													style={{
														visibility: langDropdownActive ? 'visible' : 'hidden',
														opacity: langDropdownActive ? '1' : '0',
														pointerEvents: langDropdownActive ? 'all' : 'none',
														backgroundColor: 'var(--dark-1a1a)',
														outline: '1px solid var(--gray-3232)',
													}}>
													<ul>
														<li>
															<button
																className={`btn-choosed-style ${
																	langSelected === 'polski' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setLangDropdownActive(!langDropdownActive);
																	setLangSelected('polski');
																}}>
																polski
															</button>
														</li>
													</ul>
												</div>
											</section>
											<section className='flex flex-col gap-y-1 relative'>
												<span>Kraj</span>
												<button
													ref={countrySelectBtnRef}
													className='btn-style-outlined min-h-10 justify-between'
													onClick={() => setCountryDropdownActive(!countryDropdownActive)}>
													{countrySelected} <ChevronDownIcon className='h-4' />
												</button>
												<div
													ref={countryDropdownRef}
													className='absolute h-max w-full top-16 rounded py-1 transition-all z-10'
													style={{
														visibility: countryDropdownActive ? 'visible' : 'hidden',
														opacity: countryDropdownActive ? '1' : '0',
														pointerEvents: countryDropdownActive ? 'all' : 'none',
														backgroundColor: 'var(--dark-1a1a)',
														outline: '1px solid var(--gray-3232)',
													}}>
													<ul>
														<li>
															<button
																className={`btn-choosed-style ${
																	countrySelected === 'Poland' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setCountryDropdownActive(!countryDropdownActive);
																	setCountrySelected('Poland');
																}}>
																Poland
															</button>
														</li>
														<li>
															<button
																className={`btn-choosed-style ${
																	countrySelected === 'England' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setCountryDropdownActive(!countryDropdownActive);
																	setCountrySelected('England');
																}}>
																England
															</button>
														</li>
														<li>
															<button
																className={`btn-choosed-style ${
																	countrySelected === 'Norway' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setCountryDropdownActive(!countryDropdownActive);
																	setCountrySelected('Norway');
																}}>
																Norway
															</button>
														</li>
													</ul>
												</div>
											</section>
											<section className='flex flex-col gap-y-1 relative'>
												<span>Strefa czasowa</span>
												<button
													ref={timeZoneSelectBtnRef}
													className='btn-style-outlined min-h-10 justify-between'
													onClick={() => setTimeZoneDropdownActive(!timeZoneDropdownActive)}>
													{timeZoneSelected}
													<ChevronDownIcon className='h-4' />
												</button>
												<div
													ref={timeZoneDropdownRef}
													className='absolute h-max w-full top-16 rounded py-1 transition-all z-10'
													style={{
														visibility: timeZoneDropdownActive ? 'visible' : 'hidden',
														opacity: timeZoneDropdownActive ? '1' : '0',
														pointerEvents: timeZoneDropdownActive ? 'all' : 'none',
														backgroundColor: 'var(--dark-1a1a)',
														outline: '1px solid var(--gray-3232)',
													}}>
													<ul>
														<li>
															<button
																className={`btn-choosed-style ${
																	timeZoneSelected === 'Warsaw' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setTimeZoneDropdownActive(false);
																	setTimeZoneSelected('Warsaw');
																}}>
																Warsaw
															</button>
														</li>
														<li>
															<button
																className={`btn-choosed-style ${
																	timeZoneSelected === 'Londyn' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setTimeZoneDropdownActive(false);
																	setTimeZoneSelected('Londyn');
																}}>
																Londyn
															</button>
														</li>
														<li>
															<button
																className={`btn-choosed-style ${
																	timeZoneSelected === 'Oslo' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setTimeZoneDropdownActive(false);
																	setTimeZoneSelected('Oslo');
																}}>
																Oslo
															</button>
														</li>
													</ul>
												</div>
											</section>
										</section>
									</section>
									<section className='flex justify-end mt-2'>
										<button className='orange-btn-style text-sm font-medium'>Zapisz</button>
									</section>
								</div>
								<div
									ref={deleteAccRef}
									className='bg-slate-400 px-5 py-4 text-zinc-200 rounded'
									style={{
										backgroundColor: 'var(--gray-2222)',
										border: '1px solid var(--gray-3232)',
									}}>
									<h2
										className='pb-2'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}>
										Niebezpieczna strefa
									</h2>
									<section
										className='flex flex-col sm:flex-row items-center'
										style={{
											borderBottom: '1px solid var(--gray-3232)',
										}}></section>
									<section className='mt-5'>
										<button className='orange-btn-style !bg-red-500 hover:brightness-75 !transition-all text-sm font-medium'>
											Usuń konto
										</button>
									</section>
								</div>
							</main>
						</div>
					</div>
				</div>
			) : (
				<div className='h-full absolute right-1/2 top-36 translate-x-1/2'>
					<div className='loader'></div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default AccSettings;
