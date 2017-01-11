import React, {PropTypes} from 'react';
class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
    <div className="flex">
        {this.props.content}
    </div>);}
}

Content.propTypes = {
    content: PropTypes.number
};

export default Content;
