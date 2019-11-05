import React,{Component} from "react";
import '../styles/menuStyle.css';

class Menu extends Component{

newQuestion = () => {
  this.props.history.push("/Question");
}

seeStats = () => {
  this.props.history.push("/Stats");
}

  render () {
    return (


        <div className="menu-page">
          <h1 class="menu"> MENU </h1>
            <p> <button class="menu" onClick ={this.newQuestion}> CARGAR PREGUNTAS </button> </p>
            <p> <button class="menu" onClick ={this.seeStats}> VER ESTADISTICAS </button> </p>
        </div>
  

    );
  }
}


export default Menu;
