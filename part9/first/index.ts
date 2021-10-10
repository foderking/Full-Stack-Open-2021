import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
const PORT = 3003;

app.use(express.json())

app.get('/hello', (_req, res) =>
{
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res)  =>
{
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	console.log(height, weight);
	const result = calculateBmi(height, weight);

	if (!height || !weight || result === "Error") { 
		return res.json({ error : "malformed parameters" });
	}

	return res.json({
		height,
		weight,
		bmi: result
	});
});

app.post('/exercises', function (req, res ) 
{
	const {daily_exercises, target} = req.body

	if (!daily_exercises || !target) {
		return res.json({
			"error": "malformed parameter",
		})
	}
	const result = calculateExercises(daily_exercises, target)

	return res.json(result)
})

app.post('/', (req, res) => {
	const body = req.body
	console.log(body)
	res.send(body)
})

app.listen(PORT, () =>
{
  console.log(`Server running on port ${PORT}`);
});
