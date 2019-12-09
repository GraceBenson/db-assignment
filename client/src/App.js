import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  state = {
    flowers : [],
    sightings : []
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

/*onclickHandler(selectedFlower)
{
  getSightings =_ =>{
    fetch('/flowers/sightings?comname=${selectedFlower}')
  }  
}*/

renderFlower(flower)
{
  return(<div><button>{flower.name}</button></div>)

 //return(<div><button onclick = {onclickHandler(flower.name)}>{flower.name}</button></div>)
}


render()
{
  console.log(this.state.flowers)
  return(
    <div className = "App">
      {this.state.flowers.map(flower=>this.renderFlower(flower))}
    </div>
  )

}

}

export default App;
