const Copyright = ({mostrarValor}) => {
	return (
		<div
			className={`${!mostrarValor ? 'relative sm:absolute' : 'relative md:absolute'} bottom-0 left-0 right-0 text-center py-1 bg-blue-600 text-white`}
		>
			<p>Desarrollado por <a href="https://linktr.ee/jorgedelfino" target="_blank" className="font-bold">Jorge Delfino</a></p>
		</div>
	)
}

export default Copyright