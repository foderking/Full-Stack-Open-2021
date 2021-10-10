
export default function calculateBmi(height_cm: number, weight_kg: number): string {
	const bmi =  weight_kg / (height_cm/100)**2

	if (!Number(height_cm) || !Number(weight_kg) ) {
		return "Error"
	}

	if (bmi < 16  ) return "Underweight (Severe thinness)"
	if (bmi < 17  ) return "Underweight (Moderate thinness)"
	if (bmi < 18.5) return "Underweight (Mild thinness)"
	if (bmi < 25  ) return "Normal range"
	if (bmi < 30  ) return "Overweight (Pre-obese)"
	if (bmi < 35  ) return "Obese (Class I)"
	if (bmi < 40  ) return "Obese (Class II)"
	if (bmi >=40  ) return "Obese (Class III)"

	return "Error"
}

// const a: number = Number(process.argv[2])
// const b: number = Number(process.argv[3])
// console.log(calculateBmi(a, b))