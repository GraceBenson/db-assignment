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
    },
    updateInfo: {
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
  .then(response => this.setState({flowers : response.json }))
  .catch(err => console.error(err))
}

addFlowers = _ =>{
  const { sighting } = this.state
  fetch(`http://localhost:4000/flowers/add?name=${sighting.name}&person=${sighting.person}&location=${sighting.location}&sighted=${sighting.sighted}`)
  .then(this.getFlowers)
  .catch(err => console.error(err))
}

updateFlowers = _ =>{
  const { sighting } = this.state
  fetch(`http://localhost:4000/flowers/add?name=${sighting.name}&person=${sighting.person}&location=${sighting.location}&sighted=${sighting.sighted}`)
  .then(response => response.json())
  .then(this.getFlowers)
  .catch(err => console.error(err))
}

renderFlower(flower) {
  return(<div><button>{flower}</button></div>)
}


render()
{
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
