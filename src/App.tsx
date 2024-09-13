import './App.css'
import Menu from './components/Menu/index.tsx'
import Main from './components/Main/index.tsx';
import AppRoutes from './routes/index.tsx';

function App() {

  return (
    <>
      <Menu />
      <Main>
        <AppRoutes />
      </Main>
    </>
  )
}

export default App
