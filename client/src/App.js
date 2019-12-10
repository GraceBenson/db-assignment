import React from 'react';
import { Card, Form, Button, Input, Table, Divider, Container } from 'semantic-ui-react'
import flowerpics from './flowerpics'
import './App.css';

class App extends React.Component{
  state = {
    flowers : [],
    sightings : [],
    selectedFlower: null,
    
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
    },

    flowerClicked: false
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


 //return(<div><button onclick = {onclickHandler(flower.name)}>{flower.name}</button></div>)
addFlowers = _ =>{
  const { sighting } = this.state
  fetch(`http://localhost:4000/flowers/add?name=${sighting.name}&person=${sighting.person}&location=${sighting.location}&sighted=${sighting.sighted}`)
  .then(this.getFlowers)
  .catch(err => console.error(err))
}

updateFlowers = _ =>{
  const { sighting } = this.state
  fetch(`http://localhost:4000/flowers/update?name=${sighting.name}&person=${sighting.person}&location=${sighting.location}&sighted=${sighting.sighted}`)
  .then(response => response.json())
  .then(this.getFlowers)
  .catch(err => console.error(err))
}

getFlowerpic(flower) {
  return
}

  onclickHandler(event)
  {
   var selectedFlower = event.target.value;
    console.log(selectedFlower)
      fetch(`http://localhost:4000/sightings?comname=${selectedFlower}`).then(response => response.json())
      .then(response => this.setState({sightings : response})).catch(err => console.error(err))

      this.setState({selectedFlower: selectedFlower})

      this.state.flowerClicked = true;
    
  }

renderFlower(flower) {
  return(<Button className="ui image circular label" value={flower.name} onClick={(e) => this.onclickHandler(e)}><img src={flowerpics
    .filter(pic =>{
      return pic.name===flower.name
    }).map(pic => {
      return pic.img
  })} />
    {flower.name}</Button>)
}

getSighting(sighting)
{
return(
  <Card color="grey">
    <Card.Content header><b>Sighted in {sighting.LOCATION}</b></Card.Content>
    <Card.Content>
      <p>By {sighting.PERSON}</p>
    </Card.Content>
    <Card.Content extra>
      On {sighting.SIGHTED}
    </Card.Content>
  </Card>
  )
}

renderSighting()
{
  if(this.state.flowerClicked === true)
  {
  return(
  <div>
    <img width="20%" src={flowerpics
    .filter(pic =>{
      return pic.name===this.state.selectedFlower
    }).map(pic => {
      return pic.img
  })} /><h3>{this.state.selectedFlower}</h3>
    <Card.Group centered itemsPerRow={4}>
      {this.state.sightings.map(sighting=>this.getSighting(sighting))}
    </Card.Group>
  </div>)
  }
}


render()
{
  //console.log(this.state.flowers)
  const { sighting } = this.state
  return(
    <div className = "App">
      <Container>
        {this.state.flowers.map(flower=>this.renderFlower(flower))}
      </Container>
      <Divider />
      <Container>
        {this.renderSighting()}
        <h3>Select a flower to view infromation</h3>
      </Container>
      <Table celled>
        <Table.Row>
          <Table.Cell>
            <h3>Add a flower sighting</h3>
            <Form>
              <Form.Group widths="equal">
              <Form.Field control={Input} value={sighting.name} label='Common Name' placeholder="Common Name" onChange={e => this.setState({ sighting: { ...sighting, name: e.target.value } })} />
              <Form.Field control={Input} value={sighting.person} label='Person' placeholder="Person" onChange={e => this.setState({ sighting: { ...sighting, person: e.target.value } })} />
              </Form.Group>
              <Form.Group widths="equal">
              <Form.Field control={Input} value={sighting.location} label='Location' placeholder="Location" onChange={e => this.setState({ sighting: { ...sighting, location: e.target.value } })} />
              <Form.Field control={Input} value={sighting.sighted} label='Sighted' placeholder="Sighted" onChange={e => this.setState({ sighting: { ...sighting, sighted: e.target.value } })} />
              </Form.Group>
              <Button
                className="ui green button"
                onClick={this.addFlowers}>Add</Button>
            </Form>
          </Table.Cell>
          <Table.Cell>
            <h3>Update sighting information</h3>
            <Form>
            {/* <Form.Group widths="equal">
              <Form.Field control={Input} value={sighting.name} label='Common Name' placeholder="Common Name" onChange={e => this.setState({ sighting: { ...sighting, name: e.target.value } })} />
              <Form.Field control={Input} value={sighting.person} label='Person' placeholder="Person" onChange={e => this.setState({ sighting: { ...sighting, person: e.target.value } })} />
              </Form.Group>
              <Form.Group widths="equal">
              <Form.Field control={Input} value={sighting.location} label='Location' placeholder="Location" onChange={e => this.setState({ sighting: { ...sighting, location: e.target.value } })} />
              <Form.Field control={Input} value={sighting.sighted} label='Sighted' placeholder="Sighted" onChange={e => this.setState({ sighting: { ...sighting, sighted: e.target.value } })} />
              </Form.Group>
              <Button
                className="ui green button"
                onClick={this.addFlowers}>Add</Button> */}
            </Form>
          </Table.Cell>
        </Table.Row>
      </Table>
    </div>
  )

}

}

export default App;
