
interface TrainInfo {
	periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

function calculateExercises(exercise_hours : number[]) : TrainInfo {
	const periodLength = exercise_hours.length
	const trainingDays = exercise_hours.filter(each => each).length
	const average = exercise_hours.reduce((a, b) => a + b) / periodLength
	const target = 2
	const success = target <= average
	const rating = success ? 5 : 2
	const ratingDescription = rating === 5 ? "Great!" : "not too bad but could be better"

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	}
}

const input = process.argv.slice(2).map(each => Number(each))

if (input.includes(NaN)) {
	throw "User Input Error"
}

console.log(calculateExercises(input))