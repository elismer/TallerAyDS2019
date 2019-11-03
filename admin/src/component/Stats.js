import React,{Component} from "react";
import { AsyncStorage } from "AsyncStorage";
import '../styles/statsStyle.css';

class Stats extends Component {
  constructor(props) {
      super(props);
      this.state = {chooseType:false, choosenType:'' , dni:'' , user: '', cats:[]};
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      this.setState({
        [event.target.name] : event.target.value
      });
  }

  mostrar () {
   if (this.state.chooseType) {
     if(this.state.choosenType == "user") {
       return (
       <div>
            <form className="login-form" >
              <label>
                <input type="text" placeholder="DNI"name="dni" value={this.state.dni} onChange={this.handleChange}/>
              </label>
            </form>
            <button onClick={this.statsUser}> BUSCAR !  </button>
       </div>
     );
     }
     else if(this.state.choosenType == "category") {
       return (
         <div>
           {this.state.cats.map(cats =>
             <li key={cats.id}>
                 {"\n"}
                 {cats.category_name}
                 {"\n"}
                 correctas: {cats.cat_corrects}
                 {"\n"}
                 incorrectas: {cats.cat_incorrects}
                 {"\n"}
                 No respondidas: {cats.cat_unknow}
                 {"\n"}
             </li>
         )}
         </div>
       )
     }else if (this.state.choosenType == "statsUser"){
        return (
         <div>
          <h1> Correctas : {this.state.user.cant_correct_questions} </h1>
          <h1> Incorrectas: {this.state.user.cant_incorrect_questions} </h1>
          <h1> Totales: {this.state.user.cant_total_questions} </h1>
          <h1> Unknow: {this.state.user.cant_unknown_questions} </h1>
         </div>
        );
      }
     }
    else {
      return (
        <div>
          <button onClick ={() => this.setState({choosenType:"user" , chooseType: true})}>
            ESTADISTICAS POR USUARIO
            </button>
            <button onClick = {this.statsCategory} >
            ESTADISTICAS POR CATEGORIA
            </button>
        </div>
      ) ;
    }
   }


 statsUser = async() => {
   const h = new Headers();
   console.log(await AsyncStorage.getItem('userToken'));
   h.append('Content-Type','application/json; charset=UTF-8');
   h.append('Authorization', await AsyncStorage.getItem('userToken'));
   await fetch(process.env.REACT_APP_API_HOST+"/stats/"+this.state.dni,{
      method: 'GET',
      headers: h
   }).then(response => response.json())
     .then((res) => {
        console.log(res);
        this.setState({user:res, choosenType:"statsUser"})
      })
  }

  statsCategory = async() => {
    const h = new Headers();
    console.log(await AsyncStorage.getItem('userToken'));
    h.append('Content-Type','application/json; charset=UTF-8');
    h.append('Authorization', await AsyncStorage.getItem('userToken'));
    await fetch(process.env.REACT_APP_API_HOST+"/categories",{
       method: 'GET',
       headers: h
    }).then(response => response.json())
      .then((res) => {
         console.log(res);
         let cats = [];
         Object.values(res).forEach(item => {
           cats = cats.concat(item);
         });
         this.setState({choosenType:"category" , chooseType: true, cats: cats})
       })
   }


  render () {
    return (
        <div className="Stats-page">
           <div>
             {this.mostrar()}
           </div>
        </div>
    );
  }
}

export default Stats;
