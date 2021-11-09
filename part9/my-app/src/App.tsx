import React from 'react';
const App = () => {
	const courseName = "Half Stack application development";

	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is the leisured course part",
			type: "normal"
		},
		{
			name: "Advanced",
			exerciseCount: 7,
			description: "This is the harded course part",
			type: "normal"
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
			groupProjectCount: 3,
			type: "groupProject"
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
			description: "Confusing description",
			exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
			type: "submission"
		},
		{
			name: "Backend development",
			exerciseCount: 21,
			description: "Typing the backend",
			requirements: ["nodejs", "jest"],
			type: "special"
		}
	];

	return (
		<div>
			<Header name={courseName} />
			<Content parts={courseParts} />
			<Total parts={courseParts} />
		</div>
	);
};


const Header = ({ name }: headerProps): JSX.Element => {
	return (
		<h1>{name}</h1>
	);
};

const Content = ({ parts }: contentProps) => {
	return (
		<>
			{
				parts.map(each =>
					<>
						<b key={each.name} >{each.name} {each.exerciseCount}</b>
						<All part={each} />
					</>
				)
			}
		</>
	);
};

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const All = ({ part }: { part: CoursePart }) => {
	switch (part.type) {
		case "groupProject":
			return (
				<p>
					{part.type} {part.groupProjectCount}
				</p>
			);
		case "normal":
			return (
				<p>
					{part.description} {part.type}
				</p>
			);
		case "special":
			return (
				<p>
					{part.description} {part.type}
				</p>
			);
		case "submission":
			return (
				<p>
					{part.description} {part.type}
				</p>
			);
		default:
			return assertNever(part);
	}

};

const Total = ({ parts }: contentProps) => {
	return (
		<p>
			Number of exercises{" "}
			{
				parts.reduce((carry, part) => carry + part.exerciseCount, 0)
			}
		</p>
	);
};


interface headerProps {
	name: string
}
// interface contentParts {
// 	name: string
// 	exerciseCount: number
// }
interface contentProps {
	parts: CoursePart[]
}

interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}
interface CourseNormalPart extends CoursePartExtended {
	type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
	type: "groupProject";
	groupProjectCount: number;
}
interface CourseSubmissionPart extends CoursePartExtended {
	type: "submission";
	exerciseSubmissionLink: string;
}

interface CoursePartExtended extends CoursePartBase {
	description: string
}

interface NewInterface {
	name: string;
	exerciseCount: number;
	description: string;
	requirements: string[];
	type: 'special';
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | NewInterface;

export default App;