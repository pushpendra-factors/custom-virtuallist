import logo from './logo.svg';
import './App.css';
import CustomVirtualList from './components/CustomVirtualList.tsx';

function App() {
  
  const Items = Array(2000).fill(2).map(((each, eachIndex)=>{ return {name: "Foobar"+eachIndex}}))
  const handleItemClick = (event)=>{
    console.log(event.target.innerHTML)
  }
  const renderItem = (eachItem, eachIndex)=>{
    return <div onClick={handleItemClick} className='eachItem' key={eachIndex}>{eachItem.name}</div>
  }
  return (
    <div className="App" style={{height: "100vh"}}>
      Hello World
      <CustomVirtualList items={Items} renderItem={renderItem} />
    </div>
  );
}

export default App;
