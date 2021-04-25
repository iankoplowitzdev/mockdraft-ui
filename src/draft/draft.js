import React from 'react';
import api from '../api/api';


export default class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  async componentDidMount() {
    const response = await api.getPlayers();
    this.setState({
      players: response.data
    })
  }

  render() {
    const { players } = this.state;
    return (
      <ol>
        {players.map(item => (
          <li key={item.id}>
            {item.firstName} {item.lastName} - {item.position} - {item.program}
          </li>
        ))}
      </ol>
    );
  }
}