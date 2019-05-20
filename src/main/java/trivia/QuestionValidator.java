package trivia;

import org.javalite.activejdbc.LazyList;
import org.javalite.activejdbc.Model;
import org.javalite.activejdbc.validation.ValidatorAdapter;

public class QuestionValidator extends ValidatorAdapter {
  //Validador para la cantidad y los tipos de las opciones
  @Override
  public void validate(Model m) {
    LazyList <Option> opciones = m.getAll(Option.class);
    if(opciones.size()==5){
      int cantidadDeCorrectas = 0;
      int cantidadDeIncorrectas = 0;
      int cantidadDeUnknow = 0;
      Option opcion = new Option();
      for(int i= 0; i<5; i++){
        opcion = opciones.get(i);
        if(opcion.get("type").equals("CORRECT")){cantidadDeCorrectas++;}
        if(opcion.get("type").equals("INCORRECT")){cantidadDeIncorrectas++;}
        if(opcion.get("type").equals("UNKNOW")){cantidadDeUnknow++;}
      }
      if(cantidadDeCorrectas!=1 && cantidadDeIncorrectas!=3 && cantidadDeUnknow!=1){
        String string = "Los tipos de las opciones estan desbalanceados, Correctas= ";
        m.addValidator(this, string + cantidadDeCorrectas + " Incorrectas= " + cantidadDeIncorrectas);
      }
    }
    else{
      m.addValidator(this, "cantidad incorrecta de opciones");
    }
    
  }
}