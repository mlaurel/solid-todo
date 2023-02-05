// "typescript.validate.enable": false,

import { createSignal, Show, For } from 'solid-js';

let counter = 0;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const App = () => {
  const [todos, setTodos] = createSignal([

  ]);

  const addTodo = (event: { target: { value: string }; keyCode: number }) => {
    const title = event.target.value.trim();
    if (event.keyCode === ENTER_KEY && title) {
      setTodos((todos) => [
        ...todos,
        { id: counter++, title, completed: false },
      ]);
      event.target.value = '';
    }
  };

  const remove = (todoId: number) => {
    setTodos((todos) => todos.filter((todo) => todoId !== todo.id));
  };

  const toggle = (todoId: number) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id !== todoId) return todo;
        return { ...todo, completed: !todo.completed };
      })
    );
  };

  return (
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={addTodo}
        />
      </header>
      <Show when={todos().length > 0}>
        <ul class="todo-list">
          <For each={todos()}>
            {(todo) => (
              <li
                class="todo"
                classList={{
                  completed: todo.completed,
                }}
              >
                <div class="view">
                  <input
                    type="checkbox"
                    class="toggle"
                    checked={todo.completed}
                    onInput={() => toggle(todo.id)}
                  />
                  <label>{todo.title}</label>
                  <button
                    class="destroy"
                    onClick={() => remove(todo.id)}
                  ></button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </section>
  );
};

export default App;
