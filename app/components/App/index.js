import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div>
            <h1>Filter table</h1>
            { this.props.children }
            <footer>
                <Link to="/">Filterable Table</Link>
                <Link to="/about">About</Link>
            </footer>
        </div>
      );
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default App;
