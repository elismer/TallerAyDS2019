package trivia;
 


import org.javalite.activejdbc.Model;

public class User extends Model {

	static{
		validatePresenceOf("name_user"). message("Por favor, ingrese su nombre de usario");
		validatePresenceOf("last_name"). message("Por favor, ingrese su apellido de usario");
		validatePresenceOf("dni"). message("Por favor, ingrese su dni");
		validatePresenceOf("password"). message("Por favor, ingrese una clave");
	}
	
	/*public static void CreateUser(String name, String lastName, Integer dni, String password){
		User u = new User();
		u.set("name_user", bodyParams.get(name));
		u.set("last_name", bodyParams.get(lastName));
		u.set("dni", bodyParams.get(dni));
		u.set("password", bodyParams.get(password));
		
	}*/

}
