package trivia;

import org.javalite.activejdbc.Model;

public class Option extends Model {
	static{
		validatePresenceOf("description"). message("Por favor, ingrese la opción");
	}
	
	String description;
	String type;
	
}
