import React,{Component} from "react";
import { AsyncStorage } from "AsyncStorage";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/questionStyle.css';

class Question extends Component{
  constructor(props) {
      super(props);
      this.state = {cats:[], category:false, id_category:'',description: '',option1: '',option2:'',option3:'',optionUnknow:'UNKNOW',optionCorrect:''};
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


  searchCategory= async() => {
    const h = new Headers();
    console.log(await AsyncStorage.getItem('userToken'));
    h.append('Content-Type','application/json; charset=UTF-8');
    h.append('Authorization', await AsyncStorage.getItem('userToken'));
    await fetch(process.env.REACT_APP_API_HOST+"/categories",{
       method: 'GET',
       headers: h
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        let cats = [];

      Object.values(response).forEach(item => {
          cats = cats.concat(item);
      });
        this.setState({cats:cats});
      })
      .catch (error => {
        console.log(error);
      });
}

  loadQuestion= async() => {
      const h = new Headers();
      console.log(await AsyncStorage.getItem('userToken'));
      h.append('Content-Type','application/json; charset=UTF-8');
      h.append('Authorization', await AsyncStorage.getItem('userToken'));
      await fetch(process.env.REACT_APP_API_HOST+"/questions",{
         method: 'POST',
         body: JSON.stringify({description: this.state.description, category_id: this.state.id_category, options: [
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
      if(this.state.category){
           return(
             <div className="form">
                 <form className="question-form" >
                   <label>
                    <p> <input type="text" placeholder="PREGUNTA" name="description" class="question" value={this.state.description} onChange={this.handleChange} /> </p>
                   </label>
                   <label>
                    <p> <input type="text" placeholder="OPCION 1" name="option1" class="question" value={this.state.option1} onChange={this.handleChange} /> </p>
                   </label>
                   <label>
                     <p> <input type="text" placeholder="OPCION 2" name="option2" class="question" value={this.state.option2} onChange={this.handleChange} /> </p>
                   </label>
                   <label>
                     <p> <input type="text" placeholder="OPCION 3" name="option3" class="question" value={this.state.option3} onChange={this.handleChange} /> </p>
                   </label>
                   <label>
                    <p>  <input type="text" placeholder="OPCION CORRECTA" name="optionCorrect" class="question" value={this.state.optionCorrect} onChange={this.handleChange} /> </p>
                   </label>
                 </form>
                 <button onClick ={this.loadQuestion}>
                     GUARDAR
                 </button>
             </div>
            );
      }
      else{
        return(
          <div>
                <DropdownButton id="dropdown-item-button" title="CATEGORIAS" onClick={this.searchCategory}>
                {this.state.cats.map(cats =>
                  <li key={cats.id}>
                      <Dropdown.Item as="button" onClick={()=> this.setState({id_category:cats.id,category: true})}> soy {cats.category_name}</Dropdown.Item>
                  </li>
                  )}
                </DropdownButton>
          </div>
        );
      }

  }






  render () {
    return (
      <h2 class="question">
        <div>
          <div className="question-page">
            <div>
             {this.form()}
            </div>
          </div>
        </div>
      </h2>

    );
  }
}


export default Question;
