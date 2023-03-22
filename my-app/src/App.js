import Search from './Search.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <Search 
        placeholder='Insira a cidade...' 
        title='Digite a cidade que você deseja saber a previsão.'
        searchBtn='Pesquisar por cidade'
      />
    </div>
  );
}

export default App;
