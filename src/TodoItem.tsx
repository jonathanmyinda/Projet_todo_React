type priority = "urgente" | "moyenne" | "basse"

type todo = {
  id: number
  text: string
  priority: priority
}

type props = {
  todo: todo
}

const TodoItem = ({ todo }: props) => {
  return (
    <li className="p-3">
      {todo.text}
    </li>
  )
}

export default TodoItem
