import { useState, useEffect } from 'react'

import Categoria from './components/Categoria'
import Quincena from './components/Quincena'
import Extras from './components/Extras'

import db from '../db/db'

const App = () => {

	const [categoria, setCategoria] = useState('')
	const [antiguedad, setAntiguedad] = useState(0)
	const [mostrarValor, setMostrarValor] = useState(false)
	const [valorTotal, setValorTotal] = useState({})

	useEffect(() => {
		if (categoria) {

			const remunerativo = db.precios.remunerativo[categoria]
			const noRemunerativo = db.precios.noRemunerativo[categoria]
		
			if (antiguedad === 1) {
				const nuevosValores = {
					remunerativo,
					noRemunerativo
				}

				setValorTotal(nuevosValores)
				setMostrarValor(true)
			} else if (antiguedad > 1) {
				const porcentaje = 1.0075 * (antiguedad - 1)

				const nuevosValores = {
					remunerativo: (remunerativo + ((remunerativo * porcentaje) / 100)).toFixed(2),
					noRemunerativo: (noRemunerativo + ((noRemunerativo * porcentaje) / 100)).toFixed(2)
				}
				setValorTotal(nuevosValores)
				setMostrarValor(true)
			} else if (antiguedad === 0) {
				setMostrarValor(false)
			}
		} else {
			setMostrarValor(false)
		}
	}, [categoria, antiguedad])

	return (
		<div
			className='container mx-auto py-6'
		>
			<div className='w-full mb-5 flex justify-center'>
				<h1
					className='font-bold uppercase text-4xl text-center py-3 px-4 bg-red-600 text-white'
				>Calculadora Sueldo</h1>
			</div>

			<Categoria
				mostrarValor={mostrarValor}
				valorTotal={valorTotal}
				setCategoria={setCategoria}
				setAntiguedad={setAntiguedad}
			/>
			
			<div
				className='w-full flex'
			>
				<Quincena
					valorTotal={valorTotal}
					mostrarValor={mostrarValor}
				/>
				<Extras/>
			</div>
		</div>
	)
}

export default App