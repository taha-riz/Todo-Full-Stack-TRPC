import React from "react";
import { api } from "../utils/api";
import { todoInput } from "../types";
import { toast } from "react-hot-toast";

const CreateTodo = () => {
  const [newTodo, setNewTodo] = React.useState("");

  const trpc = api.useContext();

  const { mutate } = api.todo.create.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          console.log("Hello");

          const result = todoInput.safeParse(newTodo);
          console.log(result);

          if (!result.success) {
            toast.error(result.error.format()._errors.join("\n"));
            console.log("Not success");
            return;
          }

          // create todo mutation
          mutate(newTodo);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          className="rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 w-10/12 p-4"
          placeholder="New Todo..."
          name="new-todo"
          id="new-todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button className="bg-blue-700 rounded-lg text-white hover:bg-blue-800 w-3/12 focus:ring-4">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
