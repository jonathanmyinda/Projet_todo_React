import { Trash } from "lucide-react"

type priority = "urgente" | "moyenne" | "basse"

type todo = {
  id: number
  text: string
  priority: priority
}

type props = {
  todo: todo
  onDelete: () => void
  isSelected: boolean
  onToggleSelect: (id: number) => void
}

const TodoItem = ({ todo , onDelete , isSelected , onToggleSelect}: props) => {
  return (
    <li className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="checkbox checkbox-primary checkbox-xs" checked= {isSelected} onChange={() => onToggleSelect(todo.id)} />
          <span className="text-md font-bold">
            <span>
              {todo.text}
            </span>
          </span>
            <span className={`badge badge-md badge-soft
              ${todo.priority === "urgente" ? "badge-error" : todo.priority === "moyenne" ? "badge-warning" : "badge-success"}`}>
              {todo.priority}
            </span>
        </div>
        <button className="btn btn-error btn-soft" onClick={onDelete}>
          <Trash className="w-4 h-4"/>
        </button>
      </div>
    </li>
  )
}

export default TodoItem
