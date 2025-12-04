import { useEffect, useState } from 'react'
import TodoItem from "./TodoItem"
import { Construction } from 'lucide-react'

type priority = 'urgente' | 'moyenne' | 'basse'

type todo = {
  id: number
  text: string
  priority: priority
}

function App() {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState<priority>("basse")

  const savedTodos = localStorage.getItem("todos")
  const initialTodos: todo[] = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<todo[]>(initialTodos)
  const [filter, setFilter] = useState<priority | "Tous">("Tous")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if (input.trim() === "") {
      return
    }
    const newTodo: todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }

    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)
    setInput("")
    setPriority("basse")
  }

  let filteredTodos: todo[] = []
  if (filter === "Tous") {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }

  const urgentCount = todos.filter((t) => t.priority === "urgente").length
  const mediumCount = todos.filter((t) => t.priority === "moyenne").length
  const lowCount = todos.filter((t) => t.priority === "basse").length
  const totalCount = todos.length

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set())

  function toggleSelectedTodos(id: number) {
    const newSelected = new Set(selectedTodos)
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id)
    setSelectedTodos(newSelected)
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id))
    setTodos(newTodos)
    setSelectedTodos(new Set())
  }

  return (
    <div className="flex justify-center px-4">
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 my-8 bg-base-300 p-5 rounded-2xl">

        {/* INPUTS RESPONSIVE */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tâche..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <select
            name="priority"
            id="priority"
            className="select w-full md:w-auto"
            value={priority}
            onChange={(e) => setPriority(e.target.value as priority)}
          >
            <option value="urgente">Urgente</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>

          <button className="btn btn-primary w-full md:w-auto" onClick={addTodo}>
            Ajouter
          </button>
        </div>

        {/* FILTRES + BOUTON SELECTION */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`}
              onClick={() => setFilter("Tous")}>
              Tous ({totalCount})
            </button>

            <button className={`btn btn-soft ${filter === "urgente" ? "btn-primary" : ""}`}
              onClick={() => setFilter("urgente")}>
              Urgentes ({urgentCount})
            </button>

            <button className={`btn btn-soft ${filter === "moyenne" ? "btn-primary" : ""}`}
              onClick={() => setFilter("moyenne")}>
              Moyennes ({mediumCount})
            </button>

            <button className={`btn btn-soft ${filter === "basse" ? "btn-primary" : ""}`}
              onClick={() => setFilter("basse")}>
              Basse ({lowCount})
            </button>
          </div>

          <button
            className="btn btn-primary w-full md:w-auto"
            disabled={selectedTodos.size === 0}
            onClick={finishSelected}
          >
            Supprimer la sélection ({selectedTodos.size})
          </button>
        </div>

        {/* TODO LISTE */}
        {filteredTodos.length > 0 ? (
          <ul className="divide-y divide-primary/20">
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  onDelete={() => deleteTodo(todo.id)}
                  isSelected={selectedTodos.has(todo.id)}
                  onToggleSelect={toggleSelectedTodos}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center p-6 text-center">
            <div>
              <Construction strokeWidth={1} className="w-32 h-32 mx-auto text-primary" />
              <p className="text-sm mt-2">Aucune tâche pour ce filtre</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
