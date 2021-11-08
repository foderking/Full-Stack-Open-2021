import express from 'express';
const app = express();
import DiagnosesRouter from './src/routes/diagnoses'
import PatientsRouter from  './src/routes/patients'

const PORT : number = 3001;

app.use(express.json());
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/api/diagnoses', DiagnosesRouter)
app.use('/api/patients', PatientsRouter)

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
