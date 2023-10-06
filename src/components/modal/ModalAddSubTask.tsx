import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

function TaskForm() {
  const { control, handleSubmit, register } = useForm<any>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Имя:</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Поле 'Имя' обязательное" }}
          render={({ field }) => (
            <>
              <input type="text" id="name" {...field} />
            </>
          )}
        />
      </div>

      <div>
        <label>Подзадачи:</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`subTasks.${index}.subTaskName`)}
              placeholder="Название подзадачи"
            />
            <button type="button" onClick={() => remove(index)}>
              Удалить
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({ subTaskName: "" })}>
          Добавить подзадачу
        </button>
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
}

export default TaskForm;
