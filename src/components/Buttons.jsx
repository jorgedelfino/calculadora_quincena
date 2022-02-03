import ColdImgBlack from '../img/01-cold.png'
import ColdImgWhite from '../img/02-cold.png'
import SunImgBlack from '../img/01-sun.png'
import SunImgWhite from '../img/02-sun.png'

const Buttons = ({ horaFrio, setHoraFrio, modoVacaciones, setModoVacaciones }) => {
	return (
		<div
			className='flex flex-col p-2 fixed right-0 bottom-24 bg-red-500 rounded-l-lg'
		>
			<div
				className={`text-center cursor-pointer border-2 p-2 rounded-full transition-all delay-100 ${horaFrio ? 'bg-blue-500 border-blue-300' : 'bg-white border-white'}`}
				onClick={() => setHoraFrio(!horaFrio)}
			>
				<img
					src={horaFrio ? ColdImgWhite : ColdImgBlack}
					alt="frio"
					className='h-7'
				/>
			</div>

			<div
				className={`mt-4 text-center cursor-pointer border-2 p-2 rounded-full transition-all delay-100 ${modoVacaciones ? 'bg-yellow-500 border-yellow-300' : 'bg-white border-white'}`}
				onClick={() => setModoVacaciones(!modoVacaciones)}
			>
				<img
					src={modoVacaciones ? SunImgWhite : SunImgBlack}
					alt="frio"
					className='h-7'
				/>
			</div>		
		</div>
	)
}

export default Buttons
