package trivia;
import java.util.ArrayList;

import org.javalite.activejdbc.Model;

public class Question extends Model {
    static{
        validatePresenceOf("description").message("Por favor ingrese una descripcion a su pregunta");
    }
    String description;
	public static ArrayList<Option> options;
	String category_id;
	Boolean active;
	Boolean answered;
}
