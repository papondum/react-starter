import React from 'react';
// import './style.scss';
class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state=({
        //   'header':[]
        // })
    }

    _getHeaderFormat(head){
      // switch (head) {
      //   case 'User account':
      //     this.setState({'header':
      //     ['No', 'Firstname', 'Lastname', 'Username', 'Password', 'Email', 'Role']})
      //     break;
      //   case 'User role':
      //
      //     break;
      //   case 'Customer':
      //
      //     break;
      //   case 'Supplier':
      //
      //     break;
      //   case 'Price list':
      //
      //     break;
      //   case 'Product':
      //
      //     break;
      //   case 'Brand':
      //
      //     break;
      //     case 'Film Type':
      //
      //       break;
      //
      //   default:
          console.log('default');
      //}
    }

    _headerGen(content){
      if(content.length>0){
        var head = Object.keys(content[0])
        var genHead = head.map(item=>{
          return (<th key= {item}>{item}</th>)
        })}
        return genHead
    }

    _contentGen(content){
      var result = []
      for(var i=0 ;i<content.length;i++){
        let eachRow = this._getEachVal(content[i])
        result.push((<tr>{eachRow}</tr>))
      }
      return result
    }

    _getEachVal(obj){
      var result=[]
      for(var o in obj){
        result.push((<td>{obj[o]}</td>))
      }
      return result
    }

    render() {
      return (<div>
        <table>
        <thead>
          <tr>
            {this._headerGen(this.props.content)}
          </tr>
        </thead>
        <tbody>
          {this._contentGen(this.props.content)}
        </tbody>
      </table></div>)
    }
}

export default ContentForm;
