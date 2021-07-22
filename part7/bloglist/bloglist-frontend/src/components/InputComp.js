import React from 'react'

const InputComp = (props) =>
	<div className='mb-3'>
		<label className='form-label'>
			{props.desc}

			<input
				id={props.desc}
				type={props.type}
				value={props.value}
				onChange={({ target }) => props.change(target.value)}
				className='form-control'
			/>
		</label>
	</div>

export default InputComp