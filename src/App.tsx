import "./App.css"

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type FormData = {
  name: string
  date: string
  subject: string
  description: string
}

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  date: yup.string().required("A data é obrigatória"),
  subject: yup.string().required("Selecione um assunto"),
  description: yup.string().required("A descrição é obrigatória").min(10, "A descrição ter pelo menos 10 digitos")


})

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>(
    {
      defaultValues: {
        name: "",
        date: "",
        subject: "",
        description: ""

      },
      resolver: yupResolver(schema)
    })
  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <div>
      <h1>Evento</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.name?.message && <span className="error">{errors.name.message}</span>}
        <Controller
          control={control}
          name="name"
          render={({ field }) => <input type="text" placeholder="Nome do evento"  {...field} />}
        />

        {errors.date?.message && <span className="error">{errors.date.message}</span>}
        <Controller
          control={control}
          name="date"
          render={({ field }) =>
            <input
              type="date"
              placeholder="Nome do evento"
              lang="pt-BR"
              {...field} />} />

        {errors.subject?.message && <span className="error">{errors.subject.message}</span>}
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <select {...field}>
              <option value="" disabled>
                Selecione...
              </option>

              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="javascript">Javascript</option>
              <option value="typescript">Typescript</option>
            </select>)}

        />
        {errors.description?.message && <span className="error">{errors.description.message}</span>}
        <Controller
          control={control}
          name="description"
          render={({ field }) => <textarea placeholder="Descrição" rows={4} {...field} />}

        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}
