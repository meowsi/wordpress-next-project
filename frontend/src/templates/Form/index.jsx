import Button from '../../components/Button'
import './styles.scss'

export default function FormTemplate(seo) {
  return (
    <>
      <form className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">new item</label>
          <input type="text" id="item" />
        </div>
        <button className="btn">add</button>
      </form>
      <h1 className="header">todo list</h1>
      <ul className="list">
        <li>
          <label>
            <input type="checkbox" />
            item 1
          </label>
          <button className="btn btn-danger">delete</button>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            item 2
          </label>
          <button className="btn btn-danger">delete</button>
        </li>
      </ul>

    </>
  )
}
