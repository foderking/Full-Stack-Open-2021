import React from 'react';
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
			<Header name={courseName} />
			<Content parts={ courseParts } />
			<Total parts = { courseParts } />
    </div>
  );
};


interface headerProps {
	name : string
}
interface contentParts {
	name: string
	exerciseCount: number
}
interface contentProps {
	parts : contentParts[]
} 

const Header = ({ name } : headerProps) : JSX.Element =>
{
	return (
		<h1>{name}</h1>
	);
};

const Content = ({ parts } : contentProps) =>
{
	return (
		<>
			{
				parts.map(each =>
					<p key={ each.name } >{each.name} {each.exerciseCount}</p>
				)
			}
		</>
	);
};

const Total = ({ parts }: contentProps) =>
{
	return (
		<p>
			Number of exercises{" "}
			{
				parts.reduce( (carry, part) => carry + part.exerciseCount, 0)
			}
		</p>
	);
};

export default App;