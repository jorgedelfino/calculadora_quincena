import { useState, useEffect } from 'react'

const Quincena = ({ valorTotal, mostrarValor }) => {

	const [dias, setDias] = useState(10)
	const [valorDias, setValorDias] = useState(0)
	const [valorPresentismo, setValorPresentismo] = useState(0)
	
	const [totalRemun, setTotalRemun] = useState(0)
	
	const [valorNoRemunerativo, setValorNoRemunerativo] = useState(0)
	const [valorBonificacion, setValorBonificacion] = useState(0)
	
	const [totalNoRemun, setTotalNoRemun] = useState(0)

	const [valorAporteObraSocial, setValorAporteObraSocial] = useState(0)
	const [valorAporteSindicato, setValorAporteSindicato] = useState(0)
	const [valorAporteJubilacion, setValorAporteJubilacion] = useState(0)
	const [valorAporte19032, setValorAporte19032] = useState(0)
	const [valorAporteSolidario, setValorAporteSolidario] = useState(0)

	const [totalDeducciones, setTotalDeducciones] = useState(0)

	const [totalNeto, setTotalNeto] = useState(0)

	const [hayBonificacion, setHayBonificacion] = useState(false)
	const [bonificacion, setBonificacion] = useState(0)

	const [hayAporteObraSocial, setHayAporteObraSocial] = useState(false)
	const [hayAporteSindicato, setHayAporteSindicato] = useState(false)

	const handleQuincena = e => {
		const cantidadDias = Number(e.target.value)
		setDias(cantidadDias)
	}

	const handleBonificacion = e => {
		const cantidadBonificacion = Number(e.target.value)
		setBonificacion(cantidadBonificacion)
	}

	const handleSubmit = e => {
		e.preventDefault()

		setValorBonificacion(bonificacion)

		if (dias) {
			const valorDia = valorTotal.remunerativo * dias * 9
			setValorDias(valorDia)
			setValorNoRemunerativo((valorTotal.noRemunerativo * dias * 9) * 1.11)
			setValorPresentismo(((valorDia) * 11) / 100)
		}
	}

	useEffect(() => {
		setTotalRemun(valorDias + valorPresentismo)
	}, [valorDias, valorNoRemunerativo])

	useEffect(() => {
		if (hayBonificacion) {
			setTotalNoRemun(valorBonificacion + valorNoRemunerativo)
		} else {
			setTotalNoRemun(valorNoRemunerativo)
		}
	}, [valorBonificacion, valorNoRemunerativo])

	useEffect(() => {
		if (hayAporteObraSocial) {
			setValorAporteObraSocial(totalRemun / 100 * 3.2)
		}

		if (hayAporteSindicato) {
			setValorAporteSindicato(totalRemun / 100 * 2.2)
		}

		setValorAporteJubilacion(totalRemun / 100 * 11)
		setValorAporte19032(totalRemun / 100 * 3)
		setValorAporteSolidario(totalRemun / 100 * 2.2)
	}, [totalRemun])

	useEffect(() => {
		setTotalDeducciones(valorAporteObraSocial + valorAporteSindicato + valorAporteJubilacion + valorAporte19032 + valorAporteSolidario)
	}, [valorAporteSolidario, valorAporteJubilacion, valorAporte19032, valorAporteObraSocial, valorAporteSindicato])

	useEffect(() => {
		setTotalNeto(Number((totalRemun + totalNoRemun - totalDeducciones).toFixed(2)))
	}, [totalDeducciones, totalNoRemun, totalRemun])

	return (
		<div
			className="sm:w-full md:w-1/2"
		>
			<div
				className="w-full flex justify-center"
			>
				<h2
					className="text-center text-2xl uppercase font-bold bg-red-600 text-white py-1 px-4"			
				>Quincena</h2>
			</div>
			<form
				className='p-6 text-xl uppercase border-2 rounded-md m-2 flex flex-col items-center'
				onSubmit={handleSubmit}
			>
				<div className='py-3'>
					<p>Quincena de 
						<select
							defaultValue={dias}
							name="dias"
							id="dias"
							className="border rounded-md border-gray-300 bg-gray-50 m-1 p-1"
							onChange={handleQuincena}
						>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
						días
					</p>
				</div>
				<div className='py-3'>
					<label
						htmlFor="hayBonificacion"
					>Bonificación</label>
					<input
						id='hayBonificacion'
						type="checkbox"
						value={hayBonificacion}
						onChange={() => setHayBonificacion(!hayBonificacion)}
						className='h-4 w-4 mx-2'
					/>
					{hayBonificacion && (
						<input
							type="number"
							className='border rounded-md border-gray-300 bg-gray-50 m-1 p-1'
							value={bonificacion}
							onChange={handleBonificacion}
						/>
					)}
				</div>
				<div className='py-3'>
					<label
						htmlFor="hayObraSocial"
					>Obra Social</label>
					<input
						id='hayObraSocial'
						type="checkbox"
						value={hayAporteObraSocial}
						className='h-4 w-4 mx-2'
						onChange={() => setHayAporteObraSocial(!hayAporteObraSocial)}
					/>
				</div>
				<div className='py-3'>
					<label
						htmlFor="haySindicato"
					>Sindicato</label>
					<input
						id='haySindicato'
						type="checkbox"
						value={hayAporteSindicato}
						className='h-4 w-4 mx-2'
						onChange={() => setHayAporteSindicato(!hayAporteSindicato)}
					/>
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
			
			{totalNeto !== 0 && (
				<div
					className='w-full text-center font-bold text-2xl px-4'
				>
					<p
						className='bg-blue-600 text-white py-4 rounded-sm'
					>${totalNeto}</p>
				</div>
			)}

		</div>
	)
};

export default Quincena;
