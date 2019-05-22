package trivia;
 


import org.javalite.activejdbc.Model;

public class User extends Model {

	static{
		validatePresenceOf("name_user"). message("Por favor, ingrese su nombre de usario");
		validatePresenceOf("last_name"). message("Por favor, ingrese su apellido de usario");
		validatePresenceOf("dni"). message("Por favor, ingrese su dni");
		validatePresenceOf("password"). message("Por favor, ingrese una clave");
	}
	
}
