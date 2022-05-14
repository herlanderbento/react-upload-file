import { ChangeEvent, FormEvent, useState } from "react"
import axios from 'axios'

interface IDataProps {
  name: string;
  description: string;
  duration: string;
  course_id: string
}

export function Home() {
  const [data, setData] = useState<IDataProps>({
    name: '',
    description: '',
    duration: '',
    course_id: ''
  });

  const [image, setImage] = useState<File | any>();
  const [isSelected, setIsSelected] = useState(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  function handleInputFileChange(e: ChangeEvent<File | any>) {
    setImage(e.target.files[0])
    setIsSelected(true)
  }

  async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData();

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('duration', data.duration)
    formData.append('image', image)
    formData.append('course_id', data.course_id)

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL_API}/modules`, formData);
      console.log(response)
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label className="form-label">Módulo</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Digita o módulo"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleInputChange}
                className="form-control"
              >
              </textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Duração</label>
              <input
                type="number"
                name="duration"
                value={data.duration}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Digita a duração"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagem</label>
              <input
                type="file"
                name="image"
                onChange={handleInputFileChange}
                className="form-control"
              />
              {isSelected ? (
                <div>
                  <p>Filename: {image?.name}</p>
                  <p>Filetype: {image?.type}</p>
                  <p>Size: {image?.size}</p>
                  <p>
                    lastModifiedDate:{' '}
                    {image?.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Seleciona  o arquivo para mostrar detalhes</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Curso</label>
              <input
                type="text"
                name="course_id"
                value={data.course_id}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Digita o curso"
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="btn btn-primary btn-lg">Large button</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}