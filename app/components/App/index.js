import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../Header';
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className="flex-col flex">
            <Header/>
            { this.props.children }
            <div>
                <Link to="/">Filterable Table</Link>
                <Link to="/about">About</Link>
            </div>
          </div>
      );
    }
}

export default App;
