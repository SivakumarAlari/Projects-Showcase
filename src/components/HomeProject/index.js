import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import ProjectItems from '../ProjectItems'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const checkApiStatus = {
  initial: 'INITIAL',
  isProgress: 'PROGRESS',
  isFailure: 'FAILURE',
  isSuccess: 'SUCCESS',
}

class HomeProject extends Component {
  state = {
    activeTab: categoriesList[0].id,
    projectLists: [],
    apiStatus: checkApiStatus.initial,
  }

  componentDidMount() {
    this.getProjectList()
  }

  renderOptions = event => {
    this.setState({activeTab: event.target.value}, () => this.getProjectList())
  }

  getProjectList = async () => {
    this.setState({apiStatus: checkApiStatus.isProgress})
    const {activeTab} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${activeTab}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.projects.map(eachOne => ({
        id: eachOne.id,
        name: eachOne.name,
        imageUrl: eachOne.image_url,
      }))
      this.setState({
        projectLists: updatedData,
        apiStatus: checkApiStatus.isSuccess,
      })
    } else {
      this.setState({apiStatus: checkApiStatus.isFailure})
    }
  }

  onRetry = () => {
    this.getProjectList()
  }

  getFinalOutputs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case checkApiStatus.isProgress:
        return this.onLoaderView()
      case checkApiStatus.isFailure:
        return this.onFailureView()
      case checkApiStatus.isSuccess:
        return this.onGetProjectItems()
      default:
        return null
    }
  }

  onGetProjectItems = () => {
    const {projectLists} = this.state
    return (
      <div className="project-container">
        <ul className="unOrderList-container">
          {projectLists.map(eachItem => (
            <ProjectItems key={eachItem.id} detailsOfProject={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  onLoaderView = () => (
    <div className="primedeals-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onFailureView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="notFoundImg"
      />
      <h1 className="something-heading">Oops! Something Went Wrong </h1>
      <p className="error-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {activeTab} = this.state
    return (
      <div className="main-container">
        <Header />
        <div className="selectAndOutputContainer">
          <select
            value={activeTab}
            onChange={this.renderOptions}
            className="select-design"
          >
            {categoriesList.map(eachOption => (
              <option key={eachOption.id} value={eachOption.id}>
                {eachOption.displayText}
              </option>
            ))}
          </select>

          <div>{this.getFinalOutputs()}</div>
        </div>
      </div>
    )
  }
}

export default HomeProject

// import {Component} from 'react'

// import Loader from 'react-spinner-loader'

// import Header from '../Header'

// import ProjectItems from '../ProjectItems'

// import './index.css'
// const categoriesList = [
//   {id: 'ALL', displayText: 'All'},
//   {id: 'STATIC', displayText: 'Static'},
//   {id: 'RESPONSIVE', displayText: 'Responsive'},
//   {id: 'DYNAMIC', displayText: 'Dynamic'},
//   {id: 'REACT', displayText: 'React'},
// ]

// const checkApiStatus = {
//   initial: 'INITIAL',
//   isProgress: 'PROGRESS',
//   isFailure: 'FAILURE',
//   isSuccess: 'SUCCESS',
// }

// class HomeProject extends Component {
//   state = {
//     activeTab: categoriesList[0].displayText,
//     projectLists: [],
//     apiStatus: checkApiStatus.initial,
//   }

//   componentDidMount() {
//     this.getProjectList()
//   }

//   getProjectList = async () => {
//     this.setState({apiStatus: checkApiStatus.isProgress})
//     const url = 'https://apis.ccbp.in/ps/projects'
//     const options = {
//       method: 'POST',
//     }
//     const response = await fetch(url, options)

//     if (response.ok === true) {
//       const data = await response.json()
//       const updatedData = data.projects.map(eachOne => ({
//         id: eachOne.id,
//         name: eachOne.name,
//         imageUrl: eachOne.image_url,
//       }))
//       this.setState({
//         projectLists: updatedData,
//         apiStatus: checkApiStatus.isSuccess,
//       })
//     } else {
//       this.setState({apiStatus: checkApiStatus.isFailure})
//     }
//   }

//   renderOptions = event => {
//     this.setState({activeTab: event.target.value})
//   }

//   getFinalOutputs = () => {
//     const {apiStatus} = this.state
//     switch (apiStatus) {
//       case checkApiStatus.isProgress:
//         return this.onLoaderView()
//       case checkApiStatus.isFailure:
//         return this.onFailureView()
//       case checkApiStatus.isSuccess:
//         return this.onGetProjectItems()
//       default:
//         return null
//     }
//   }

//   onGetProjectItems = () => {
//     const {projectLists} = this.state
//     return (
//       <div className="project-container">
//         <ul className="unOrderList-container">
//           {projectLists.map(eachItem => (
//             <ProjectItems key={eachItem.id} detailsOfProject={eachItem} />
//           ))}
//         </ul>
//       </div>
//     )
//   }

//   onLoaderView = () => (
//     <div className="primedeals-loader-container">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </div>
//   )

//   onFailureView = () => (
//     <div className="error-container">
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
//         alt="failure view"
//         className="notFoundImg"
//       />
//       <h1 className="something-heading">Oops! Something Went Wrong </h1>
//       <p className="error-paragraph">
//         We cannot seem to find the page you are looking for.
//       </p>
//       <button className="retry-btn" type="button">
//         Retry
//       </button>
//     </div>
//   )

//   render() {
//     const {activeTab} = this.state
//     return (
//       <div className="main-container">
//         <Header />
//         <select value={activeTab} onChange={this.renderOptions}>
//           {categoriesList.map(eachOption => (
//             <option key={eachOption.id} value={eachOption.id}>
//               {eachOption.label}
//             </option>
//           ))}
//         </select>
//         <div>{this.getFinalOutputs()}</div>
//       </div>
//     )
//   }
// }

// export default HomeProject
