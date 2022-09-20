import { useState, useEffect } from 'react'

import CleanImg from '../img/clean.png'


const ExtrasCien = ({ valorTotal, mostrarValor, horaFrio }) => {

	const [horas, setHoras] = useState(0)
	const [minutos, setMinutos] = useState(0)

	const [totalExtras, setTotalExtras] = useState(0)

	const [limpiar, setLimpiar] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()

		setLimpiar(false)

		const nuevaHora = Number(horas) + Number(minutos)
		const nuevoValorHora = Number(valorTotal.remunerativo) + Number(valorTotal.noRemunerativo)
		if (horaFrio) {
			const nuevoTotalExtras = ((((nuevoValorHora * nuevaHora) * 2) * 1.11) * 1.33).toFixed(2)
			setTotalExtras(nuevoTotalExtras)
		} else {
			const nuevoTotalExtras = (((nuevoValorHora * nuevaHora) * 2) * 1.11).toFixed(2)
			setTotalExtras(nuevoTotalExtras)
		}
	}

	const handleLimpiar =  () => {
		setHoras(0)
		setMinutos(0)
		setTotalExtras(0)
		setLimpiar(true)
	}

	useEffect(() => {
		if (horaFrio && totalExtras !== 0) {
			handleLimpiar()
		}
	}, [horaFrio])

	return (
		<div
			className="sm:w-full md:w-1/2 sm:mt-16 md:mt-0"
		>
			<div
				className="w-full flex justify-center"
			>
				<h2
					className="text-center text-2xl uppercase font-bold bg-red-600 text-white py-1 px-4"
					style={{
						boxShadow: horaFrio && '0px 0px 50px 30px #31c4fe'
					}}			
				>Extras al 100% {horaFrio && 'Frio'}</h2>
			</div>
			
			{
				totalExtras ? (
					<div
						className='p-6 text-xl uppercase border-2 rounded-md m-2 flex flex-col items-center bg-blue-500 text-center'
					>
						<p
							className='text-white pb-10'
						>El valor estimado de sus horas extras es de:</p>
						<span
							className='uppercase font-bold text-3xl text-white'
						>$ {totalExtras}</span>

						<button
							className='bg-red-600 text-white py-2 px-4 rounded-md uppercase cursor-pointer mt-14 flex items-center'
							onClick={handleLimpiar}
						>
							Limpiar <img className='h-5 ml-2 inline' src={CleanImg}/>
						</button>
					</div>
				) : (
					<form
						className="p-6 text-xl uppercase border-2 rounded-md m-2 flex flex-col items-center"
						onSubmit={handleSubmit}
					>
						<div className="py-3">
							<input
								min={0}
								max={99}
								value={horas > 0 && horas}
								type="number"
								id="horas"
								className="border rounded-md border-gray-300 bg-gray-50 m-1 p-1 w-32"
								onChange={e => setHoras(e.target.value)}
							/>
							<label htmlFor="horas"> Horas.</label>
						</div>
						<div className="py-3">
							<p>
								<select
									name="minutos"
									id="minutos"
									className="border rounded-md border-gray-300 bg-gray-50 m-1 p-1"
									onChange={e => setMinutos(e.target.value)}
								>
									<option value={0}>0</option>
									<option value={0.25}>15</option>
									<option value={0.5}>30</option>
									<option value={0.75}>45</option>
								</select>
								Minutos.
							</p>
						</div>
						<div className='text-center py-3'>
							<input
								type="submit"
								value="Calcular"
								disabled={mostrarValor ? false : true}
								className='bg-blue-500 text-white py-2 px-4 rounded-md uppercase cursor-pointer disabled:bg-gray-400'
							/>
						</div>
					</form>
				)
			}
	
		</div>
	)
};

export default ExtrasCien;
