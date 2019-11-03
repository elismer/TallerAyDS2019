import React,{Component} from "react";
import { AsyncStorage } from "AsyncStorage";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from 'react-bootstrap/Dropdown';

class Question extends Component{
  constructor(props) {
      super(props);
      this.state = {description: '',option1: '',option2:'',option3:'',optionUnknow:'UNKNOW',optionCorrect:''};
      this.handleChange = this.handleChange.bind(this);
  }

  /*handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
      });
  }*/
  handleChange(e) {
        let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  loadQuestion= async() => {
      const h = new Headers();
      console.log("aqui");
      console.log(await AsyncStorage.getItem('userToken'));
      h.append('Content-Type','application/json; charset=UTF-8');
      h.append('Authorization', await AsyncStorage.getItem('userToken'));
      await fetch(process.env.REACT_APP_API_HOST+"/questions",{
         method: 'POST',
         body: JSON.stringify({description: this.state.description, category_id: 1, options: [
           {description: this.state.option1, type: 'INCORRECT'},
           {description: this.state.option2, type: 'INCORRECT'},
           {description: this.state.option3, type: 'INCORRECT'},
           {description: this.state.optionUnknow, type: 'UNKNOW'},
           {description: this.state.optionCorrect, type: 'CORRECT'},
          ]
         }),
         headers: h
      }).then(response => response.json())
        .then(response => {
          console.log(response);
          alert("Pregunta cargada exitosamente");
          this.props.history.push('/Menu');
        })
        .catch (error => {
          console.log(error);
        });
  }

  form(){
      if(this.state.category!= '' ){
           return(
             <div className="form">
                 <form className="question-form" >
                   <label>
                     <input type="text" placeholder="PREGUNTA" name="description" value={this.state.description} onChange={this.handleChange} />
                   </label>
                   <label>
                     <input type="text" placeholder="OPCION 1" name="option1" value={this.state.option1} onChange={this.handleChange} />
                   </label>
                   <label>
                     <input type="text" placeholder="OPCION 2" name="option2" value={this.state.option2} onChange={this.handleChange} />
                   </label>
                   <label>
                     <input type="text" placeholder="OPCION 3" name="option3" value={this.state.option3} onChange={this.handleChange} />
                   </label>
                   <label>
                     <input type="text" placeholder="OPCION CORRECTA" name="optionCorrect" value={this.state.optionCorrect} onChange={this.handleChange} />
                   </label>
                 </form>
                 <button onClick ={this.loadQuestion}>
                     GUARDAR
                 </button>
             </div>
            );
      }
  }


  render () {
    return (

    <div className="question-page">
       <DropdownButton id="dropdown-basic-button" title="CATEGORIAS">
         <Dropdown.Item href="#/action-1">EXAMEN CLINICO</Dropdown.Item>
         <Dropdown.Item href="#/action-2">FARMACOLOGIA Y TERAPEUTICA</Dropdown.Item>
         <Dropdown.Item href="#/action-3">ENFERMEDADES INFECCIOSAS Y PARASITARIAS</Dropdown.Item>
         <Dropdown.Item href="#/action-1">CLINICA MEDICA</Dropdown.Item>
         <Dropdown.Item href="#/action-1">CLINICA QUIRURGICA</Dropdown.Item>
         <Dropdown.Item href="#/action-1">MANEJO POBLACIONAL</Dropdown.Item>
       </DropdownButton>
       {this.form()}
    </div>
    );
  }
}


export default Question;
