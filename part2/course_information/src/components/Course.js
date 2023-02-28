const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <b>total of {total} exercises</b>
    )
}

export default Course