import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const SomethingDone = ({ visible, text }: any) => {
	const { t, i18n } = useTranslation();

	return (
		<div
			className='fixed w-max h-max py-1 bg-red-300 bottom-7 translate-x-1/2 flex items-center justify-between rounded transition-all'
			style={{
				backgroundColor: 'var(--dark-1a1a)',
				outline: '1px solid var(--gray-3232)',
				scale: visible ? '1' : '0.5',
				right: visible ? '50%' : '47%',
				opacity: visible ? '1' : '0',
				zIndex: visible ? '10' : '-10',
				pointerEvents: visible ? 'all' : 'none',
			}}>
			<section className='flex items-center gap-x-2 px-4 py-[7px]'>
				<CheckCircleIcon className='h-6 text-green-400' />
				<span className='text-[13px]'>{t(text)}</span>
			</section>
		</div>
	);
};

export default SomethingDone;
