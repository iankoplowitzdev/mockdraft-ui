'use strict';

function assembleFilter(positions, handlePositionFilter) {
  const renderablePositions = [];

  for (let i = 0; i < positions.length; i++) {
    if (positions[i].selected) {
      renderablePositions.push(
        <li
          key={`position-filter-${positions[i].abbreviation}`}
          onClick={() => {handlePositionFilter(positions[i].abbreviation)}}>
          {positions[i].abbreviation}
          <span class="uk-margin-small-right" uk-icon="check"></span>
        </li>
      )
    }
    else {
      renderablePositions.push(
        <li
          key={`position-filter-${positions[i].abbreviation}`}
          onClick={() => {handlePositionFilter(positions[i].abbreviation)}}>
            {positions[i].abbreviation}
        </li>
      )
    }

  }

  return renderablePositions;
}

export default function Filter(props) {
  const renderablePositions = assembleFilter(props.filteredPositions, props.handlePositionFilter);

  return(
    <div>
        <button class="uk-button uk-button-default" type="button">Positions</button>
        <div data-uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            {renderablePositions}
          </ul>
        </div>
    </div>
  )
}