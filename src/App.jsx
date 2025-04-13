import { useState } from "react";

function Input({ value, onChange, placeholder }) {
  return <input value={value} onChange={onChange} placeholder={placeholder} style={styles.input} />;
}

function Button({ onClick, children }) {
  return <button onClick={onClick} style={styles.button}>{children}</button>;
}

function Checkbox({ checked, onChange }) {
  return <input type="checkbox" checked={checked} onChange={onChange} />;
}

function Card({ children }) {
  return <div style={styles.card}>{children}</div>;
}

function CardContent({ children }) {
  return <div style={styles.cardContent}>{children}</div>;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
      setInput("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div style={styles.taskList}>
        {tasks.map(task => (
          <Card key={task.id}>
            <CardContent>
              <Checkbox
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{ textDecoration: task.done ? "line-through" : "none", marginLeft: 8 }}>{task.text}</span>
            </CardContent>
            <Button onClick={() => removeTask(task.id)}>✕</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  row: {
    display: "flex",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  button: {
    padding: "8px 12px",
    fontSize: 16,
    cursor: "pointer",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
};
