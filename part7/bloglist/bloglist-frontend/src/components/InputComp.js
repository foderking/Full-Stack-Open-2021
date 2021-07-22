import React from 'react'

const InputComp = (props) =>
	<div>
		{props.desc}
		<input
			id={props.desc}
			type={props.type}
			value={props.value}
			onChange={({ target }) => props.change(target.value)}
		/>
	</div>

export default InputComp