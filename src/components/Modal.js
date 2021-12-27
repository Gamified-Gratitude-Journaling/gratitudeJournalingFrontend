import ReactModal from 'react-modal'
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export default function Modal({ children, isOpen: propsIsOpen, header, footer, propsHandleClose}) {
	const [isOpen, setIsOpen] = useState(propsIsOpen);
	useEffect(() => { setIsOpen(propsIsOpen); }, [propsIsOpen]);

	const handleClose = () => {setIsOpen(false)}

	return (<ReactModal
		parentSelector={() => document.querySelector('#root')}
		overlayClassName={"fixed inset-0 bg-black opacity-80 w-full h-full p-2"}
		className={"outline-none rounded-3xl w-full h-full place-content-center opacity-100"}
		isOpen={isOpen}
		shouldReturnFocusAfterClose={true}
		shouldCloseOnEsc={true}
		shouldCloseOnOverlayClick={true}
		onRequestClose={handleClose}
	>
		<div className='grid h-full mx-auto place-content-center bg-black'>
			<div className='grid rounded-lg bg-white sm:px-6 py-2'>
				<div className='grid grid-cols-3 pb-1'>
					<div></div>
					<div><h2 className='text-gray-400 text-center'>{header}</h2></div>
					<div 
						className='grid justify-end content-center cursor-pointer pr-4'
						onClick={handleClose}
					>
						<AiOutlineClose className='w-4 h-4' />
					</div>
				</div>
				<div className='border-t-2 h-0 sm:-mx-4 mb-3'><p>&nbsp;</p></div>
				<div className='px-1'>
					{children}
				</div>
				<div>{footer}</div>
			</div>
		</div>
	</ReactModal>)
}