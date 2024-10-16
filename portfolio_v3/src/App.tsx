import './styles/App.css'
import Layout from './components/Layout'
import Form from './components/Form'
import Projects from './components/Projects'
import loadProjects from './components/Projects'

function App() {

  return (
    <Layout>
      <Form loadProjects={loadProjects} />
      <Projects/>
    </Layout>
  )
}

export default App
