import { useState } from 'react'

const Extras = ({ valorTotal, mostrarValor, horaFrio }) => {

	const [horas, setHoras] = useState(0)
	const [minutos, setMinutos] = useState(0)

	const [totalExtras, setTotalExtras] = useState(0)

	const handleSubmit = e => {
		e.preventDefault()

		const nuevaHora = Number(horas) + Number(minutos)
		const nuevoValorHora = Number(valorTotal.remunerativo) + Number(valorTotal.noRemunerativo)
		if (horaFrio) {
			const nuevoTotalExtras = ((((nuevoValorHora * nuevaHora) * 1.5) * 1.11) * 1.33).toFixed(2)
			setTotalExtras(nuevoTotalExtras)
		} else {
			const nuevoTotalExtras = (((nuevoValorHora * nuevaHora) * 1.5) * 1.11).toFixed(2)
			setTotalExtras(nuevoTotalExtras)
		}
	}

	return (
		<div
			className="sm:w-full md:w-1/2 sm:mt-16 md:mt-0"
		>
			<div
				className="w-full flex justify-center"
			>
				<h2
					className="text-center text-2xl uppercase font-bold bg-red-600 text-white py-1 px-4"			
				>Extras</h2>
			</div>
			<form
				className="p-6 text-xl uppercase border-2 rounded-md m-2 flex flex-col items-center"
				onSubmit={handleSubmit}
			>
				<div className="py-3">
					<input
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

			{totalExtras !== 0 && (
				<div
					className='w-full text-center font-bold text-2xl px-4'
				>
					<p
						className='bg-blue-600 text-white py-4 rounded-sm'
					>${totalExtras}</p>
				</div>
			)}
			
		</div>
	)
};

export default Extras;
