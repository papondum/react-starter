import React from 'react';
import './style.scss';
class ContentForm extends React.Component {
    constructor(props) {
        super(props);
    }

    _headerGen(content){
      let genHead=[]
      if(content.length>0){
        var head = Object.keys(content[0])
        genHead = head.map(item=>{
          return (<td key= {item}>{item}</td>)
        })
        genHead.unshift((<td key='checkbox'><input type='checkbox'/></td>))
      }
        return genHead
    }

    _contentGen(content){
      var result = []
      for(var i=0 ;i<content.length;i++){
        let eachRow = this._getEachVal(content[i])
        result.push((<tr key = {i}>{eachRow}</tr>))
      }
      return result
    }

    _getEachVal(obj){
      var result=[]
      for(var o in obj){
        result.push((<td key={o}>{obj[o]}</td>))
      }
      result.unshift((<td key='checkbox'><input type='checkbox' value={obj}/></td>))
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
