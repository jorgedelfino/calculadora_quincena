const Categoria = ({
	mostrarValor,
	valorTotal,
	setCategoria,
	setAntiguedad}) => {

	return (
		<div
		className="w-full py-5"
		>
			<form
				className="flex flex-col items-center md:flex-row justify-center"
			>
				<select
					name="categoria"
					id="categoria"
					className="border rounded-md border-gray-300 bg-gray-50 mx-3 py-2 px-4"
					onChange={ e => setCategoria(e.target.value) }
					>
					<option value="">-- Seleccione una Categoría --</option>
					<option value="OI">Operario Inicial</option>
					<option value="C">Calificado</option>
					<option value="CA">Calificado A</option>
					<option value="E">Especializado</option>
					<option value="EA">Especializado A</option>
					<option value="EB">Especializado B</option>
				</select>

				<select
					name="antiguedad"
					id="categoria"
					className="border rounded-md border-gray-300 bg-gray-50 mt-6 md:mt-0 mx-3 py-2 px-4"
					onChange={ e => setAntiguedad(Number(e.target.value)) }
					>
					<option value="0">-- Seleccione su Antigüedad --</option>
					<option value="1">Inicial</option>
					<option value="2">1 - 3 años</option>
					<option value="3">3 - 5 años</option>
					<option value="4">5 - 7 años</option>
					<option value="5">7 - 9 años</option>
					<option value="6">9 - 11 años</option>
					<option value="7">11 - 13 años</option>
					<option value="8">13 - 15 años</option>
					<option value="9">15 - 17 años</option>
					<option value="10">17 - 19 años</option>
					<option value="11">19 - 21 años</option>
					<option value="12">21 - 23 años</option>
					<option value="13">23 - 25 años</option>
					<option value="14">25 - 27 años</option>
					<option value="15">27 - 29 años</option>
					<option value="16">29 - 31 años</option>
					<option value="17">31 - 33 años</option>
					<option value="18">33 - 35 años</option>
					<option value="19">+35 años</option>
				</select>
			</form>
			<div
				className={`container w-full mx-auto py-5 flex justify-center ${!mostrarValor && 'flex-col items-center'}`}>
			{mostrarValor && (
				<p
					className="text-center text-lg bg-blue-300 py-4 px-6 rounded-md border-4 border-blue-500"
				>Precio/Hora: <span className="font-bold text-xl">${valorTotal.remunerativo}</span> + <span className="font-bold text-xl">${valorTotal.noRemunerativo}</span>
				</p>	
			)}

			{!mostrarValor && (
				<>
					<p
						className="text-center text-lg md:w-1/2 bg-green-300 py-4 px-6 rounded-md border-4 border-green-500 my-8"
					>
						<span
							className="uppercase font-bold"
						>¡Bienvenido a la Calculadora de Quincena!</span> <br />
						Para empezar seleccione su Categoría y su Antigüedad
					</p>
					<p
						className="text-center text-lg md:w-1/2 bg-blue-300 py-4 px-6 rounded-md border-4 border-blue-500"
					>
						Ultima actualización <br /> <span className="uppercase font-bold">
							20/02/2025
						</span>
					</p>
				</>
			)}
			</div>
		</div>
		
	)
};

export default Categoria;
