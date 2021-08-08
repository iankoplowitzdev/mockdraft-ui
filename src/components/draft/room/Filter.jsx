import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function assembleFilter(positions, handlePositionFilter) {
  const renderablePositions = [];
  console.log(positions);

  for (let i = 0; i < positions.length; i++) {
    if (positions[i].selected) {
      renderablePositions.push(
        <Dropdown.Item onClick={() => {handlePositionFilter(positions[i].abbreviation)}}>{positions[i].abbreviation} <i className="float-right fas fa-check"></i></Dropdown.Item>
      )
    }
    else {
      renderablePositions.push(
        <Dropdown.Item onClick={() => {handlePositionFilter(positions[i].abbreviation)}}>{positions[i].abbreviation}</Dropdown.Item>
      )
    }

  }

  return renderablePositions;
}

export default function Filter(props) {
  const renderablePositions = assembleFilter(props.filteredPositions, props.handlePositionFilter);

  return(
    <DropdownButton id="dropdown-basic-button" title="Position">
      {renderablePositions}
    </DropdownButton>
  )
}