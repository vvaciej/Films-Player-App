import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const SomethingDone = ({ visible, text }: any) => {
	const { t } = useTranslation();

	return (
		<div
			className={`fixed w-max h-max py-1 bg-red-300 bottom-7 translate-x-1/2 flex items-center justify-between rounded transition-all bg-dark1a1a outline-[1px] outline outline-gray3232 ${
				visible
					? 'opacity-100 scale-100 z-10 right-1/2 pointer-events-auto'
					: 'opacity-0 scale-50 z-[-10] right-[47%] pointer-events-none'
			}`}>
			<section className='flex items-center gap-x-2 px-4 py-[7px]'>
				<CheckCircleIcon className='h-6 text-green' />
				<span className='text-[13px]'>{t(text)}</span>
			</section>
		</div>
	);
};

export default SomethingDone;
