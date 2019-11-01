import React,{Component} from "react";

class Menu extends Component{

newQuestion = () => {
  this.props.history.push("/Question");
}

  render () {
    return (
      <div className="menu-page">
        <h1> MENU </h1>
        <button onClick ={this.newQuestion}> CARGAR PREGUNTAS </button>
        <button onClick ={this.seeStats}> VER ESTADISTICAS </button>
      </div>
    );
  }
}


export default Menu;
