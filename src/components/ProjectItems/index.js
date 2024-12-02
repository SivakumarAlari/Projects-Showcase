import './index.css'

const ProjectItems = props => {
  const {detailsOfProject} = props
  const {id, name, imageUrl} = detailsOfProject
  return (
    <li className="eachProject">
      <img src={imageUrl} alt={name} className="project-image" />
      <p className="about-project">{name} </p>
    </li>
  )
}

export default ProjectItems
