import React from 'react';
import './App.css';

class App extends React.Component{
  state = {
    flowers : [],
    sightings : [],
    
    sighting: {
      name: '',
      person: '',
      location: '',
      sighted: ''
    }
  }


componentDidMount()
{
  this.getFlowers();
}

getFlowers = _ =>{
  fetch('http://localhost:4000/flowers')
  .then(response => response.json())
  .then(response => this.setState({flowers : response }))
  .catch(err => console.error(err))
}

/*onclickHandler(selectedFlower)
{
  getSightings =_ =>{
    fetch('/flowers/sightings?comname=${selectedFlower}')
  }  
}*/

 //return(<div><button onclick = {onclickHandler(flower.name)}>{flower.name}</button></div>)
addFlowers = _ =>{
  const { sighting } = this.state
  fetch(`http://localhost:4000/flowers/add?name=${sighting.name}&person=${sighting.person}&location=${sighting.location}&sighted=${sighting.sighted}`)
  .then(this.getFlowers)
  .catch(err => console.error(err))
}

//fixing
updateFlowers = _ =>{
  const { sighting } = this.state
  fetch(`http://localhost:4000/flowers/add?name=${sighting.name}&person=${sighting.person}&location=${sighting.location}&sighted=${sighting.sighted}`)
  .then(this.getFlowers)
  .catch(err => console.error(err))
}

renderFlower(flower) {
  return(<div><button>{flower.name}</button></div>)
}


render()
{
  console.log(this.state.flowers)
  const { sighting } = this.state
  return(
    <div className = "App">
      {this.state.flowers.map(flower=>this.renderFlower(flower))}

      <div>
        <input value={sighting.name} placeholder="Common Name" onChange={e => this.setState({ sighting: { ...sighting, name: e.target.value } })} />
        <input value={sighting.person} placeholder="Person" onChange={e => this.setState({ sighting: { ...sighting, person: e.target.value } })} />
        <input value={sighting.location} placeholder="Location" onChange={e => this.setState({ sighting: { ...sighting, location: e.target.value } })} />
        <input value={sighting.sighted} placeholder="Sighted" onChange={e => this.setState({ sighting: { ...sighting, sighted: e.target.value } })} />
        <button onClick={this.addFlowers}>Add</button>
      </div>
    </div>
  )

}

}

export default App;
