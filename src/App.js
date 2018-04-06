import React, { Component } from 'react';
import './App.css';
import DraggableList from "react-draggable-list"
import "font-awesome/css/font-awesome.css";

const modules = [
    {
        id:'abc',
        title:'first one'
    },
    {
        id:'def',
        title:'second one'
    },
    {
        id:'ghi',
        title:'third one'
    },
    {
        id:'jkl',
        title:'fourth one'
    },
    {
        id:'mno',
        title:'fifth one'
    },
    {
        id:'pqr',
        title:'sixth one'
    }
]

const queue = [
    {
        id:'1',
        title:"the first ish one"
    }
]


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modules:modules,
            queue:queue,
        }
    }
  render() {
    return (
      <div className="main">
          <div id="modules" className="list-container" ref={(ref)=>this._modules_container = ref}>
              <DraggableList
                  list={this.state.modules}
                  itemKey={'id'}
                  onMoveEnd={this.modulesMoveEnded}
                  template={ListItemTemplate}
                  container={()=>this._container}
                  padding={0}
                  commonProps={{onAdd:this.onAdd}}
              />
          </div>
          <div id="queue" className="list-container" ref={(ref)=>this._queue_container = ref}>
              <DraggableList
                  list={this.state.queue}
                  itemKey={'id'}
                  onMoveEnd={this.queueMoveEnded}
                  template={ListItemTemplate}
                  container={()=>this._container}
                  padding={0}
                  commonProps={{}}
              />
          </div>
      </div>
    );
  }
    modulesMoveEnded = (list) => this.setState({modules:list})
    queueMoveEnded = (list) => this.setState({queue:list})
    onAdd = (item) => {
        console.log('adding an item,',item)
        const queue = this.state.queue.slice()
        queue.push(item)
        this.setState({queue:queue})
    }
}

class ListItemTemplate extends Component {
    add = () => {
        if(this.props.commonProps.onAdd) {
            this.props.commonProps.onAdd(this.props.item)
        }
    }
    render() {
        return <div className="list-item">
            {this.props.dragHandle(<i className="fa fa-bars handle"/>)}
            <i>{this.props.item.title}</i>
            <span className="spacer"/>
            {this.props.commonProps.onAdd?<i className="fa fa-arrow-right handle" onClick={this.add}/>:<i/>}
            </div>
    }
}



export default App;
