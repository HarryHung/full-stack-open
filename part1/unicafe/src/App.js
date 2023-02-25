import { useState } from 'react'

const Header = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ( {state, setState, text} ) => {
  return <button onClick={() => setState(state + 1) }>{text}</button>
}

const Display = ( {text, value} ) => {
  return <div>{text} {value}</div>
}

const Statistics = ( {good, neutral, bad} ) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = `${(good / total) * 100} %`

  if (total === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <Display text='good' value={good} />
        <Display text='neutral' value={neutral} />
        <Display text='bad' value={bad} />
        <Display text='all' value={total} />
        <Display text='average' value={average} />
        <Display text='positive' value={positive} />
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title='give feedback' />
      <Button text='good' state={good} setState={setGood}/>
      <Button text='neutral' state={neutral} setState={setNeutral}/>
      <Button text='bad' state={bad} setState={setBad}/>
      <Header title='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App