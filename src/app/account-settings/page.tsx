import useDocumentTitle from '../helpers/PageTitle';
import { Navbar } from '../layouts/Navbar';
import { Footer } from '../layouts/Footer';
import '../../style/css/global.css';
import '../../style/css/acc-settings.css';
import { CameraIcon, FilmIcon, PhotoIcon, UserIcon } from '@heroicons/react/24/solid';

const AccSettings = () => {
	return (
		<div className='space-dark'>
			<Navbar isCutted={true} />
			<div className='content-full-space-centered'>
				<div className='acc-settings-page-container'>
					<header className='w-full text-left mb-12'>
						<h1 className='text-3xl'>Ustawienia konta</h1>
						<span className='text-zinc-400'>Zaktualizuj informacje o swoim koncie.</span>
					</header>
					<div className='flex gap-x-8'>
						<aside className='w-64 hidden lg:block'>
							<ul>
								<li>
									<button className='flex items-center gap-x-2 text-sm btn-choosed-style w-full'>
										<UserIcon className='h-5' />
										<span>Informacje</span>
									</button>
								</li>
							</ul>
						</aside>
						<main className='w-full h-max'>
							<div
								className='acc-settings-container-for-information bg-slate-400 px-5 py-4 text-zinc-200 rounded'
								style={{
									backgroundColor: 'var(--gray-2222)',
									border: '1px solid var(--gray-3232)',
								}}>
								<h2
									className='pb-1'
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
												src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
												alt='user avatar'
												className='h-20 mr-1'
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
						</main>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AccSettings;
