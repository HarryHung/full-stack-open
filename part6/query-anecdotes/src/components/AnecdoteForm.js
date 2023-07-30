import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({ type: 'show', payload: `anecdote '${anecdote.content}' created` })
      setTimeout(() => {dispatch({ type: 'hide' })}, 5000)
    },
    onError: (error) => {
      if (error.response.status === 400) {
        dispatch({ type: 'show', payload: `${error.response.data.error}` })
        setTimeout(() => {dispatch({ type: 'hide' })}, 5000)
      } else {
        dispatch({ type: 'show', payload: 'Unknown error' })
        setTimeout(() => {dispatch({ type: 'hide' })}, 5000)
      }
    }
  })

  const dispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, vote: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
