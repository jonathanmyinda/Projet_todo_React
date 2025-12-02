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

    const newTodos = [newTodo , ...todos]
    setTodos(newTodos)
    setInput("")
    setPriority("basse")
    console.log(newTodos)
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

  function deleteTodo(id: number){
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const [selectedTodos , setSelectedTodos]  = useState<Set<number>>(new Set())

  function toggleSelectedTodos (id: number) {
    const newSelected = new Set(selectedTodos)
    if(newSelected.has(id)){
      newSelected.delete(id)
    }else{
      newSelected.add(id)
    }
    setSelectedTodos(newSelected)
  }

  function finishSelected () {
    const newTodos = todos.filter((todo) => {
      if(selectedTodos.has(todo.id)){
        return false
      }else{
        return true
      }
    })
    setTodos(newTodos)
    setSelectedTodos(new Set())
  }

  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-6">
          <input type="text"
                  className="input w-full"
                  placeholder="Ajouter une tâche..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
          />
          <select name="priority" id="priority" className="select" value={priority} onChange={(e) => setPriority(e.target.value as priority)}>
            <option value="urgente">Urgente</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
          <button className="btn btn-primary" onClick={addTodo}>Ajouter</button>
        </div>
        <div className='flex items-center justify-between'>
          <div className='space-y-2 flex-1 h-fit'>
            <div className='flex flex-wrap gap-4'>
              <button className={`btn btn-soft ${filter === "Tous" ? "btn btn-primary" : ""}`} onClick={() => setFilter("Tous")}>
                Tous ({totalCount})
              </button>
              <button className={`btn btn-soft ${filter === "urgente" ? "btn btn-primary" : ""}`} onClick={() => setFilter("urgente")}>
                Urgentes ({urgentCount})
              </button>
              <button className={`btn btn-soft ${filter === "moyenne" ? "btn btn-primary" : ""}`} onClick={() => setFilter("moyenne")}>
                Moyennes ({mediumCount})
              </button>
              <button className={`btn btn-soft ${filter === "basse" ? "btn btn-primary" : ""}`} onClick={() => setFilter("basse")}>
                Basse ({lowCount})
              </button>
            </div>
          </div>
          <button className="btn btn-primary" disabled={selectedTodos.size === 0} onClick={finishSelected}>
            Suppimer la selection ({selectedTodos.size})
          </button>
        </div>
        {filteredTodos.length > 0 ? (
          <ul className='divide-y divide-primary/20'>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <TodoItem todo={todo} 
                          onDelete={() => deleteTodo(todo.id)} 
                          isSelected={selectedTodos.has(todo.id)} 
                          onToggleSelect={toggleSelectedTodos} />
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex justify-center items-center p-6'>
            <div>
              <Construction strokeWidth={1} className='w-40 h-40 text-primary'/>
              <p className='text-sm'>Aucue tache poursuivie pour ce filtre</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App