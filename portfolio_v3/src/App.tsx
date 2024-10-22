import './styles/App.css'
import Layout from './components/Layout'
import Form from './components/Form'
import Projects from './components/Projects'
import UseProjects from './hooks/UseProject';

function App() {
  const { loadProjects, projects, updateProject, deleteProject, setProjects } = UseProjects();

  return (
    <Layout>
      <Form loadProjects={loadProjects} setProjects={setProjects}/>
      <Projects projects={projects} updateProject={updateProject} deleteProject={deleteProject}/>
    </Layout>
  )
}

export default App
