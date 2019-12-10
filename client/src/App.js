import React from 'react';
import { Label, Form, Button, Input, Table, Divider, Container } from 'semantic-ui-react'
import flowerpics from './flowerpics'
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
  .then(response => this.setState({flowers : response }))
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
  fetch(`http://localhost:4000/flowers/update?name=${sighting.name}&person=${sighting.person}&location=${sighting.location}&sighted=${sighting.sighted}`)
  .then(response => response.json())
  .then(this.getFlowers)
  .catch(err => console.error(err))
}

getFlowerpic(flower) {
  return
}

renderFlower(flower) {
  return(<Label circular as='a' size="medium" image><img src={flowerpics
    .filter(pic =>{
      return pic.name===flower.name
    }).map(pic => {
      return pic.img
  })} />
    {flower.name}</Label>)
}


render()
{
  const { sighting } = this.state
  return(
    <div className = "App">
      <Container>
        {this.state.flowers.map(flower=>this.renderFlower(flower))}
      </Container>
      <Divider />
      <Container>
        <h3>Flower Information</h3>
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
