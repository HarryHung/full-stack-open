import { useState } from 'react'

const Header = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ( {state, setState, text} ) => {
  return <button onClick={() => setState(state + 1) }>{text}</button>
}

const Display = ( {state, text} ) => {
  return <div>{text} {state}</div>
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
      <Display text='good' state={good} />
      <Display text='neutral' state={neutral} />
      <Display text='bad' state={bad} />
    </div>
  )
}

export default App