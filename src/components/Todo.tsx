import type { Todo } from "../types";
import { api } from "../utils/api";
import { toast } from "react-hot-toast";

type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  const { id, text, done } = todo;
  const trpc = api.useContext();

  const { mutate: deleteMutation } = api.todo.delete.useMutation({
    onSuccess: () => {
      toast.success("Todo Error Deleted Successfully");
    },
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });
  const { mutate: doneMutation } = api.todo.toggle.useMutation({
    onSuccess: ({ done }) => {
      done ? toast.success("Task completed") : toast.error("Task Incomplete");
    },
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });
  return (
    <>
      <div className="w-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="done"
            id="done"
            className="h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50"
            checked={done}
            onChange={(e) => {
              doneMutation({ id, done: e.target.checked });
            }}
          />
          <label htmlFor="done" className="cursor-pointer text-lg">
            {text}
          </label>
        </div>
        <button
          onClick={() => {
            deleteMutation(id);
          }}
          className="w-1/12 rounded border bg-red-700 p-1 text-white shadow-2xl hover:bg-red-800 focus:outline focus:ring-4"
        >
          Delete
        </button>
      </div>
    </>
  );
}
