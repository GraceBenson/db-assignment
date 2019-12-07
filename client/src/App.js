import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  state = {
    flowers: []
  }


componentDidMount()
{
  this.getFlowers();
}

getFlowers = _ =>{
  fetch('http://localhost:4000/flowers')
  .then(response => response.json())
  .then(response => this.setState({flowers : response}))
  .catch(err => console.error(err))
}

renderFlower(flower)
{
 return(<div><button>{flower}</button></div>)
}


render()
{

  return(
    <div className = "App">
      {this.state.flowers.map(flower=>this.renderFlower(flower))}
    </div>
  )

}

}

export default App;
