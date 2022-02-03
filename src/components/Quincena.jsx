import { useState, useEffect } from 'react'

import CleanImg from '../img/clean.png'

const Quincena = ({ valorTotal, mostrarValor, horaFrio, modoVacaciones }) => {

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

	const [hayAporteObraSocial, setHayAporteObraSocial] = useState(true)
	const [hayAporteSindicato, setHayAporteSindicato] = useState(false)

	const [limpiar, setLimpiar] = useState(false)

	const handleLimpiar =  () => {
		setHayBonificacion(false)
		setBonificacion(0)
		setHayAporteObraSocial(true)
		setHayAporteSindicato(false)
		setLimpiar(true)
	}

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

		setLimpiar(false)

		setValorBonificacion(bonificacion)

		if (dias) {
			if (horaFrio) {
				const valorDia = (valorTotal.remunerativo * dias * 9) * 1.33
				setValorDias(valorDia)
				setValorNoRemunerativo(((valorTotal.noRemunerativo * dias * 9) * 1.11) * 1.33)
				setValorPresentismo(((valorDia) * 11) / 100)
			} else {
				const valorDia = valorTotal.remunerativo * dias * 9
				setValorDias(valorDia)
				setValorNoRemunerativo((valorTotal.noRemunerativo * dias * 9) * 1.11)
				setValorPresentismo(((valorDia) * 11) / 100)
			}
		}
	}

	useEffect(() => {
		setDias(modoVacaciones ? 14 : 10)
	}, [modoVacaciones])

	useEffect(() => {
		setTotalRemun(valorDias + valorPresentismo)
	}, [valorDias, valorNoRemunerativo])

	useEffect(() => {
		if (hayBonificacion) {
			setTotalNoRemun(valorBonificacion + valorNoRemunerativo)
		} else {
			setTotalNoRemun(valorNoRemunerativo)
			setValorBonificacion(0)
		}
	}, [valorBonificacion, valorNoRemunerativo, hayBonificacion])

	useEffect(() => {
		if (hayAporteObraSocial) {
			setValorAporteObraSocial(totalRemun / 100 * 3.2)
		} else {
			setValorAporteObraSocial(0)
		}

		if (hayAporteSindicato) {
			setValorAporteSindicato(totalRemun / 100 * 2.2)
		} else {
			setValorAporteSindicato(0)
		}

		setValorAporteJubilacion(totalRemun / 100 * 11)
		setValorAporte19032(totalRemun / 100 * 3)
		setValorAporteSolidario(totalRemun / 100 * 2.2)
	}, [hayAporteObraSocial, hayAporteSindicato, totalRemun])

	useEffect(() => {
		setTotalDeducciones(valorAporteObraSocial + valorAporteSindicato + valorAporteJubilacion + valorAporte19032 + valorAporteSolidario)
	}, [valorAporteSolidario, valorAporteJubilacion, valorAporte19032, valorAporteObraSocial, valorAporteSindicato])

	useEffect(() => {
		if (limpiar) {
			setTotalNeto(0)
		} else {
			setTotalNeto(Number((totalRemun + totalNoRemun - totalDeducciones).toFixed(2)))

		}
	}, [totalDeducciones, totalNoRemun, totalRemun, limpiar])

	useEffect(() => {
		if (horaFrio || modoVacaciones && totalNeto !== 0) {
			handleLimpiar()
		}
	}, [horaFrio, modoVacaciones])

	return (
		<div
			className="sm:w-full md:w-1/2"
		>
			<div
				className="w-full flex justify-center"
			>
				<h2
					className="text-center text-2xl uppercase font-bold bg-red-600 text-white py-1 px-4"
					style={{
						boxShadow: horaFrio && '0px 0px 50px 30px #31c4fe'
					}}
				>
					{modoVacaciones ? 'Vacaciones' : 'Quincena'} {horaFrio && 'Frio'}
				</h2>
			</div>

			{
				totalNeto !== 0 ? (
					<div
						className='p-6 text-xl uppercase border-2 rounded-md m-2 flex flex-col items-center bg-blue-500'
					>
						<p
							className='text-white pb-10'
						>El valor estimado de su quincena es de:</p>
						<span
							className='uppercase font-bold text-3xl text-white'
						>$ {totalNeto}</span>

						<button
							className='bg-red-600 text-white py-2 px-4 rounded-md uppercase cursor-pointer mt-14 flex items-center'
							onClick={handleLimpiar}
						>
							Limpiar <img className='h-5 ml-2 inline' src={CleanImg}/>
						</button>
					</div>
				) : (
					<form
						className='p-6 text-xl uppercase border-2 rounded-md m-2 flex flex-col items-center'
						onSubmit={handleSubmit}
					>
						<div className='py-3'>
							<p>
								{modoVacaciones ? 'Vacaciones' : 'Quincena'} de
								<select
									value={dias}
									name="dias"
									id="dias"
									className="border rounded-md border-gray-300 bg-gray-50 m-1 p-1"
									onChange={handleQuincena}
								>
									{modoVacaciones ? (
										<>
											<option value="14">14</option>
											<option value="21">21</option>
											<option value="28">28</option>
											<option value="35">35</option>
										</>
									) : (
										<>
											<option value="9">9</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
											<option value="13">13</option>
										</>
									)}
								</select>
								días
							</p>
						</div>
						<div className='py-3 flex flex-col'>
							<div
								className='text-center'
							>
								<label
									htmlFor="hayBonificacion"
								>Bonificación</label>
								<input
									id='hayBonificacion'
									type="checkbox"
									onChange={() => setHayBonificacion(!hayBonificacion)}
									className='h-4 w-4 mx-2'
								/>
							</div>
							{hayBonificacion && (
								<input
									min={0}
									max={99999}
									value={bonificacion > 0 && bonificacion}
									type="number"
									className='border rounded-md border-gray-300 bg-gray-50 m-1 mt-4 p-1'
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
								checked={hayAporteObraSocial}
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
				)
			}
		</div>
	)
};

export default Quincena;
