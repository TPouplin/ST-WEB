import React from 'react';
import ReactDOM from 'react-dom';

const title = "Benjamin Button"
const attributes = ["durée: ", "genre: ", "acteurs: ", "réalisateur: " ];

const att = attributes.map((attribute, i) => <li key= {'attribute_'+i}>{attribute}</li>

class Film extends React.Component {
  render() {
    return (
      <div>
        <h1>{title}</h1>
        <img src="https://images-na.ssl-images-amazon.com/images/I/91KxcLPgw5S._AC_SL1500_.jpg" />
        <ul>
            {att}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Film/>, document.getElementById('app'))

