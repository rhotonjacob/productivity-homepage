import TaskList from "@/components/TaskList";
import ReminderList from "@/components/ReminderList";

export default function Home() {
  return (
    <div>
      <h2>Greetings</h2>
      <TaskList />
      <ReminderList />
    </div>
  );
}
