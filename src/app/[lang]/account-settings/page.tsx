'use client';

import useDocumentTitle from '../../../helpers/PageTitle';
import { Navbar } from '../layouts/Navbar';
import { useRef, useEffect } from 'react';
import getCookie from '../../../helpers/GetCookie';
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
import React from 'react';
import { useTranslation } from 'react-i18next';

const AccSettings = () => {
	const { t } = useTranslation();
	useDocumentTitle(`${t(`Account settings`)} - vvaciej.app`);

	const [selectedFile, setSelectedFile] = useState(null);
	const [photoFile, setPhotoFile] = useState<string>(
		'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
	);

	const [langSelected, setLangSelected] = useState<string>(`${getCookie('langChoosed')}`);
	const [langSelectedToDisplay, setLangSelectedToDisplay] = useState<string>(`${langSelected}`);
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

	useEffect(() => {
		document.cookie = `langChoosed=${langSelected}; path=/`;
	}, [langSelected]);

	return (
		<div className='space-dark'>
			<Navbar isCutted={true} />
			{isLogged ? (
				<div className='flex w-full justify-center'>
					<div className='main-container-width-padd-top-1240'>
						<header className='w-full text-left mb-6 sm:mb-12'>
							<h1 className='text-3xl'>{t('Account settings')}</h1>
							<span className='text-zinc-400'>{t('Update password and informations')}</span>
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
											<span>{t('Informations')}</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												socialLoginRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<ArrowRightEndOnRectangleIcon className='h-5' />
											<span>{t('Social login')}</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												passwordRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<LockClosedIcon className='h-5' />
											<span>{t('Password')}</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												twoFactorAuthRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<DevicePhoneMobileIcon className='h-5' />
											<span className='w-max'>{t('Two-factor authentication')}</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												activeSessionsRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<ComputerDesktopIcon className='h-5' />
											<span>{t('Active sessions')}</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												langRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<GlobeAmericasIcon className='h-5' />
											<span>{t('Country and language')}</span>
										</button>
									</li>
									<li>
										<button
											className='flex items-center gap-x-2 text-sm btn-choosed-style !py-4 rounded w-full'
											onClick={() => {
												deleteAccRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
											}}>
											<XCircleIcon className='h-5' />
											<span>{t('Delete account')}</span>
										</button>
									</li>
								</ul>
							</aside>
							<main className='w-full h-max flex flex-col gap-y-7'>
								<div
									ref={informationRef}
									className='px-5 py-4 text-zinc-200 rounded border-[1px] bg-gray2222 border-gray3232'>
									<h2 className='pb-2'>{t('Update your name or profile picture.')}</h2>
									<section className='flex flex-col sm:flex-row items-center border-b-[1px] border-gray3232'>
										<section className='w-full mt-6 text-sm flex-col flex gap-y-6 pb-8'>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='name'>{t('Name')}</label>
												<input type='text' id='name' className='input-style' />
											</section>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='surname'>{t('Surname')}</label>
												<input type='text' id='surname' className='input-style' />
											</section>
										</section>
										<section className='text-sm sm:w-96 flex items-center flex-col gap-y-2 pb-3 sm:pb-0'>
											<span>{t('Profile picture')}</span>
											<section className='relative '>
												<label
													htmlFor='upload'
													className='h-9 w-9 flex items-center cursor-pointer justify-center absolute bottom-0 right-0'>
													<input
														type='file'
														className='hidden border-[1px] border-orange rounded-[50%] bg-gray3232'
														id='upload'
														onChange={handleFileChange}
													/>
													<div className='p-2 rounded-3xl hover:brightness-75 transition-all border-[1px] border-orange bg-gray3232'>
														<CameraIcon className='h-5 text-orange' />
													</div>
												</label>
												<img
													src={`${photoFile}`}
													alt='user avatar'
													id='userAvatar'
													className='h-20 w-20 mr-1 outline-gray3232 outline outline-[1px] rounded-[50%]'
												/>
											</section>
											<button className='text-red-500 text-xs mt-2'>{t('Delete picture')}</button>
										</section>
									</section>
									<section className='flex justify-end mt-2'>
										<button className='orange-btn-style text-sm font-medium'>{t('Save')}</button>
									</section>
								</div>
								<div
									ref={socialLoginRef}
									className='px-5 py-4 text-zinc-200 rounded bg-gray2222 border-[1px] border-gray3232'>
									<h2 className='pb-2 border-b-gray3232 border-b-[1px]'>{t('Login through social networks')}</h2>
									<section className='flex items-center justify-between sm:px-3 border-b-[1px] border-gray3232'>
										<section className='w-full flex mt-6 text-sm gap-1 gap-x-3 pb-8'>
											<button className='rounded transition-all hover:brightness-125 w-max border-[1px] border-gray3232'>
												<img
													src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png '
													className='h-10'
													alt='google-icon'
												/>
											</button>
											<section>
												<h2 className='font-semibold'>{t('Google account')}</h2>
												<span className='text-xs'>{t('Disabled')}</span>
											</section>
										</section>
										<section className='text-sm flex items-center flex-col gap-y-2 pb-3 sm:pb-0'>
											<button className='orange-outlined-btn-style w-max py-1 px-3 transition-all'>
												{t('Turn on')}
											</button>
										</section>
									</section>
									<section className='mt-4'>
										<p className='text-[13px] text-zinc-400'>
											{t(
												'If you disable social logins, you will still be able to log in with your e-mail and password.'
											)}
										</p>
									</section>
								</div>
								<div
									ref={passwordRef}
									className='px-5 py-4 text-zinc-200 rounded bg-gray2222 border-[1px] border-gray3232'>
									<h2 className='pb-2 border-b-[1px] border-gray3232'>{t('Update password and informations')}</h2>
									<section className='flex flex-col sm:flex-row items-center border-b-[1px] border-gray3232'>
										<section className='w-full mt-6 text-sm flex-col flex gap-y-6 pb-8'>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='name'>{t('Name')}</label>
												<input type='text' id='name' className='input-style' />
											</section>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='surname'>{t('Surname')}</label>
												<input type='text' id='surname' className='input-style' />
											</section>
											<section className='flex flex-col gap-y-1'>
												<label htmlFor='surname'>{t('Confirm password')}</label>
												<input type='text' id='surname' className='input-style' />
											</section>
										</section>
									</section>
									<section className='flex justify-end mt-2'>
										<button className='orange-btn-style text-sm font-medium'>{t('Update password')}</button>
									</section>
								</div>
								<div
									ref={twoFactorAuthRef}
									className='px-5 py-4 text-zinc-200 rounded border-b-[1px] border-gray3232 bg-gray2222'>
									<h2 className='pb-2 border-b-[1px] border-gray3232'>{t('Two-factor authentication')}</h2>
									<h1 className='mt-6 font-semibold'>{t('You have not enabled two-factor authentication.')}</h1>
									<p className='mt-4 text-sm max-w-[40rem]'>
										{t(
											"When you enable two-factor authentication, you will be asked for a secure, random token during authentication. You can get this token from your phone's Google Authenticator app."
										)}
									</p>
									<button className='orange-btn-style mt-4'>{t('Turn on')}</button>
								</div>
								<div
									ref={activeSessionsRef}
									className='px-5 py-4 text-zinc-200 rounded bg-gray2222 border-[1px] border-gray3232'>
									<h2 className='pb-2 border-b-[1px] border-gray3232'>{t('Active sessions')}</h2>
									<p className='mt-4 text-sm'>
										{t(
											'If necessary, you can log out of all other browser sessions on all devices. Your most recent sessions are listed below. If you think someone else has logged into your account, you should also update your password. (Locations and IP addresses may not be what they actually are due to the use of a VPN. This keeps every user of our site safe and anonymous.'
										)}
									</p>
									<section className='mt-6'>
										<ul>
											<li className='flex gap-x-3'>
												<ComputerDesktopIcon className='h-10' />
												<section>
													<h1 className='text-sm text-white'>Windows - Chrome</h1>
													<span className='text-xs'>Warsaw, Poland</span>
													<p className='text-xs'>
														{t('IP address..')} - <span className='text-green'>{t('This device')}</span>
													</p>
												</section>
											</li>
										</ul>
									</section>
									<button className='orange-outlined-btn-style text-sm py-1 px-3 transition-all mt-8'>
										{t('Logout from other sessions')}
									</button>
								</div>
								<div ref={langRef} className='px-5 py-4 text-zinc-200 rounded bg-gray2222 border-[1px] border-gray3232'>
									<h2 className='pb-2 border-b-[1px] border-gray3232'>{t('Date, time and language')}</h2>
									<section className='flex flex-col sm:flex-row items-center border-b-[1px] border-gray3232'>
										<section className='w-full mt-6 text-sm flex-col flex gap-y-6 pb-8'>
											<section className='flex flex-col gap-y-1 justify-between relative'>
												<span>{t('Language')}</span>
												<button
													ref={langSelectBtnRef}
													className='btn-style-outlined min-h-10 justify-between'
													onClick={() => setLangDropdownActive(!langDropdownActive)}>
													{t(langSelectedToDisplay)}
													<ChevronDownIcon className='h-4' />
												</button>
												<div
													ref={langDropdownRef}
													className={`absolute h-max w-full top-16 rounded py-1 transition-all z-10 bg-dark1a1a outline-[1px] outline outline-gray3232 ${
														langDropdownActive
															? 'visible opacity-100 pointer-events-auto'
															: 'invisible opacity-0 pointer-events-none'
													}`}
													style={{}}>
													<ul>
														<li>
															<button
																className={`btn-choosed-style ${
																	langSelectedToDisplay === 'polish' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setLangDropdownActive(false);
																	setLangSelectedToDisplay('polish');
																}}>
																{t('polish')}
															</button>
														</li>
														<li>
															<button
																className={`btn-choosed-style ${
																	langSelectedToDisplay === 'english' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setLangDropdownActive(false);
																	setLangSelectedToDisplay('english');
																}}>
																{t('english')}
															</button>
														</li>
													</ul>
												</div>
											</section>
											<section className='flex flex-col gap-y-1 relative'>
												<span>{t('Country')}</span>
												<button
													ref={countrySelectBtnRef}
													className='btn-style-outlined min-h-10 justify-between'
													onClick={() => setCountryDropdownActive(!countryDropdownActive)}>
													{countrySelected} <ChevronDownIcon className='h-4' />
												</button>
												<div
													ref={countryDropdownRef}
													className={`absolute h-max w-full top-16 rounded py-1 transition-all z-10 bg-dark1a1a outline-[1px] outline outline-gray3232 ${
														countryDropdownActive
															? 'visible opacity-100 pointer-events-auto'
															: 'invisible opacity-0 pointer-events-none'
													}`}>
													<ul>
														<li>
															<button
																className={`btn-choosed-style ${
																	countrySelected === 'Poland' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setCountryDropdownActive(false);
																	setCountrySelected('Poland');
																}}>
																{t('Poland')}
															</button>
														</li>
														<li>
															<button
																className={`btn-choosed-style ${
																	countrySelected === 'England' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setCountryDropdownActive(false);
																	setCountrySelected('England');
																}}>
																{t('England')}
															</button>
														</li>
														<li>
															<button
																className={`btn-choosed-style ${
																	countrySelected === 'Norway' ? 'choosed' : ''
																} p-3 flex gap-x-1 items-center`}
																onClick={() => {
																	setCountryDropdownActive(false);
																	setCountrySelected('Norway');
																}}>
																{t('Norway')}
															</button>
														</li>
													</ul>
												</div>
											</section>
											<section className='flex flex-col gap-y-1 relative'>
												<span>{t('Time zone')}</span>
												<button
													ref={timeZoneSelectBtnRef}
													className='btn-style-outlined min-h-10 justify-between'
													onClick={() => setTimeZoneDropdownActive(!timeZoneDropdownActive)}>
													{t(timeZoneSelected)}
													<ChevronDownIcon className='h-4' />
												</button>
												<div
													ref={timeZoneDropdownRef}
													className={`absolute h-max w-full top-16 rounded py-1 transition-all z-10 bg-dark1a1a outline-[1px] outline outline-gray3232 ${
														timeZoneDropdownActive
															? 'visible opacity-100 pointer-events-auto'
															: 'invisible opacity-0 pointer-events-none'
													}`}>
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
																{t('Warsaw')}
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
										<button
											className='orange-btn-style text-sm font-medium'
											onClick={() => {
												setLangSelected(langSelectedToDisplay === 'polish' ? 'polish' : 'english');
												const currentPath = window.location.pathname;
												const newPath = currentPath.startsWith('/pl') ? currentPath.replace('/pl', '/en') : '/pl';
												window.location.href = newPath;
											}}>
											{t('Save')}
										</button>
									</section>
								</div>
								<div
									ref={deleteAccRef}
									className='bg-gray2222 border-[1px] border-gray3232 px-5 py-4 text-zinc-200 rounded'>
									<h2 className='pb-2 border-b-[1px] border-gray3232'>{t('Dangerous zone')}</h2>
									<section className='flex flex-col sm:flex-row items-center border-b-[1px] border-gray3232'></section>
									<section className='mt-5'>
										<button className='orange-btn-style !bg-red-500 hover:brightness-75 !transition-all text-sm font-medium'>
											{t('Delete account')}
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
		</div>
	);
};

export default AccSettings;
