import { Transition } from '@headlessui/react';
import { StopIcon, XCircleIcon } from '@heroicons/react/20/solid';
import {
	CheckCircleIcon,
	InformationCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from '../../context/AlertContext';

export default function SnackAlert({ variant, message, ...rest }) {
	const { show, setShow, remainingTime } = useAlert();
	const totalDuration = 3500; // Total time before the alert is hidden
	const [progressWidth, setProgressWidth] = useState(100); // Start with 100% width

	useEffect(() => {
		if (show) {
			// Reset progress bar when a new alert is shown
			setProgressWidth(100);
		}
	}, [show]);

	useEffect(() => {
		// Calculate width as a percentage of time remaining
		const width = (remainingTime / totalDuration) * 100;
		setProgressWidth(width);

		// If time is up, ensure alert disappears after progress bar reaches 0
		if (width <= 0) {
			setTimeout(() => setShow(false), 200); // Adjust 200ms to match transition duration if needed
		}
	}, [remainingTime, setShow]);
	const [color, setColor] = useState('');
	const [bgColor, setBgColor] = useState('');
	const [progressColor, setProgressColor] = useState('');
	function getIcon() {
		switch (variant) {
			case 'error':
				return (
					<XCircleIcon
						className='h-6 w-6 text-rose-400'
						aria-hidden='true'
					/>
				);
			case 'success':
				return (
					<CheckCircleIcon
						className='h-6 w-6 text-green-400'
						aria-hidden='true'
					/>
				);
			case 'info':
				return (
					<InformationCircleIcon
						className='h-6 w-6 text-brand_primary-400'
						aria-hidden='true'
					/>
				);
			case 'warning':
				return (
					<StopIcon
						className='h-6 w-6 text-yellow-400'
						aria-hidden='true'
					/>
				);
			default:
				return null;
		}
	}

	useEffect(() => {
		switch (variant) {
			case 'error':
				setColor('text-rose-50 dark:text-white');
				setBgColor('bg-rose-500 dark:bg-rose-500');
				setProgressColor('bg-rose-400 dark:bg-rose-300');
				return;
			case 'success':
				setColor('text-green-50');
				setBgColor('bg-green-900 dark:bg-green-700');
				setProgressColor('bg-green-400 dark:bg-green-700');
				break;
			case 'info':
				setColor('text-brand_primary-50');
				setBgColor('bg-brand_primary-900 dark:bg-brand_primary-700');
				setProgressColor('bg-brand_primary-400 dark:bg-brand_primary-700');
				break;
			case 'warning':
				setColor('text-yellow-50');
				setBgColor('bg-yellow-900 dark:bg-yellow-700');
				setProgressColor('bg-yellow-400 dark:bg-yellow-700');
				break;
			default:
				setColor('text-gray-50');
				setBgColor('bg-gray-900 dark:bg-gray-700');
				setProgressColor('bg-gray-400 dark:bg-gray-700');
		}
	}, [variant]);

	return (
		<div>
			<div
				aria-live='assertive'
				className='z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6'
			>
				<div className='flex w-full flex-col items-top space-y-4 sm:items-end'>
					<Transition
						show={show}
						as={Fragment}
						enter='transform ease-out duration-300 transition'
						enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
						enterTo='translate-y-0 opacity-100 sm:translate-x-0'
						leave='transition ease-in duration-200' // Ensure this matches any delay added for progress completion
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div
							style={{ zIndex: 9999 }}
							className={`${bgColor} ${color} pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`}
						>
							<div className='p-4'>
								<div className='flex items-center'>
									<div className='flex-shrink-0'>{getIcon()}</div>
									<div className='ml-3 w-0 flex-1 pt-0.5'>
										<p className={`${color} mt-1 text-sm font-bold`}>
											{message}
										</p>
									</div>
									<div className='ml-4 flex-shrink-0'>
										<button
											type='button'
											className={`${color} ${bgColor} inline-flex rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand_primary-500 focus:ring-offset-2`}
											onClick={() => setShow(false)}
										>
											<span className='sr-only'>Close</span>
											<XMarkIcon
												className='h-5 w-5'
												aria-hidden='true'
											/>
										</button>
									</div>
								</div>
								{/* Progress bar */}
								<div className='w-full bg-gray-200 rounded-full h-1.5 mt-4'>
									<div
										className={`${progressColor} h-1.5 rounded-full transition-width duration-1000 ease-linear`}
										style={{ width: `${progressWidth}%` }}
									></div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	);
}
