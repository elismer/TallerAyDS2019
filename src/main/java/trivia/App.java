package trivia;

import org.javalite.activejdbc.Model;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.halt;
import static spark.Spark.before;
import static spark.Spark.after;
import static spark.Spark.options;

import java.util.ArrayList;
import org.javalite.activejdbc.LazyList;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;
import trivia.GamesOptions;
import trivia.QuestionParam;
import trivia.Option;
import trivia.Game;
import trivia.Level;
import trivia.Stat;
import trivia.Category;
import trivia.Comment;
import trivia.BasicAuth;

import com.google.gson.Gson;
import java.util.Map;
import java.util.List;


class QuestionParam {
	String description;
	ArrayList<Option> options;
	String category_id;
	Boolean active;
	Boolean answered;
}

public class App{

    static LazyList <Option> options;

    static User currentUser; 
    public static void main( String[] args ){
    
     before((request, response) -> {
        Base.open();

        String headerToken = (String) request.headers("Authorization");

        if (
          headerToken == null ||
          headerToken.isEmpty() ||
          !BasicAuth.authorize(headerToken)
        ) {
          halt(401);
        }

        currentUser = BasicAuth.getUser(headerToken);
      });

      after((request, response) -> {
        Base.close();
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        response.header("Access-Control-Allow-Headers",
          "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,");
      });

      options("/*", (request, response) -> {
        return "OK";
      });

      
       post("/login", (req, res) -> {
        res.type("application/json");

        // if there is currentUser is because headers are correct, so we only
        // return the current user here
        return currentUser.toJson(true);
      });
      
      /*get("/hello/:name", (req, res) -> {
        return "hello" + req.params(":name");
      });
      
      System.out.println("hola mundo");*/

      post("/users", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = new User();
        user.set("nick_name", bodyParams.get("nick_name"));
        user.set("dni", bodyParams.get("dni"));
        user.set("name_user", bodyParams.get("name_user"));
        user.set("last_name",bodyParams.get("last_name"));
        user.set("password",bodyParams.get("password"));
        user.set("year",bodyParams.get("year"));
        user.saveIt();
        
        Game game = new Game();
        user.add(game);

        res.type("application/json");

        return user.toJson(true);
        
      });
      
      get("/users", (req, res) -> { //retorna todos los usuarios
      	LazyList<User> user = User.findAll();
      	for (User u: user)
      		System.out.println("Su username es: " + u.get("name_user") + ", su dni es: " + u.get("dni"));
      	return user;
      });
      
      get("/game", (req, res) -> {
      	LazyList <Question> questions = Question.where("category_id = ?", 1);
      	Question question = questions.get(0);
      	System.out.println("Descripcion de la pregunta: " + question.get("description"));
      	options = question.getAll(Option.class);
      	for (Option o: options)
      		System.out.println(o.get("description"));
      	return options;
      	
      });
      
      
      post("/questions", (req, res) -> {
      	QuestionParam bodyParams = new Gson().fromJson(req.body(), QuestionParam.class);
      	Question question = new Question();
      	question.set("description", bodyParams.description);
      	question.set("category_id", bodyParams.category_id);
      	
      	question.saveIt();
      	
      	for(Option item: bodyParams.options) {
          		Option option = new Option();
          		option.set("description", item.description);
          		option.set("type", item.type);
          		question.add(option);
        	}
      	
      	return question;	
      });
     
      get("/questions/options", (req, res) -> { //retorna todas las preguntas con sus opciones
      	LazyList<Question> question = Question.findAll();
      	for (Question q: question){
      		System.out.println("Descripcion de la pregunta: " + q.get("description"));
      		LazyList<Option> option = q.getAll(Option.class);
      		for (Option o: option)
      			System.out.println("Descripcion de la opcion: " + o.get("description") + " tipo de la opcion: " + o.get("type"));}
      	return question;
      });
      
      post("/comments", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Comment comment = new Comment();
      	comment.set("description", bodyParams.get("description"));
      	currentUser.add(comment);
      	      	
      	res.type("application/json");
      	
      	return comment.toJson(true);
      });

      get("/comments", (req, res) -> {
      	
      	for(Comment comment : currentUser.getAll(Comment.class)){
          System.out.println(comment.toString());
        }
          	
      	return comment.toJson(true);
      });
      
      
      post("/stats", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Stat stat = new Stat();
      	user.add(stat);
				
      	
      	res.type("application/json");
      	
      	return stat.toJson(true);
      });

      
       post("/answers", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	int place = Integer.parseInt((String)bodyParams.get("chosen_option"));
      	GamesOptions answer = new GamesOptions();
      	LazyList<Game> games= currentUser.getAll(Game.class);
      	Game game= games.get(0);
      	Option option = options.get(place - 1);
      	game.add(option);
				if (option.get("type").equals("CORRECT")){
					System.out.println("Tu respuesta es correcta");
				}else if (option.get("type").equals("INCORRECT")) System.out.println("Te vemos el año que viene");
				
      	res.type("application/json");
      	
      	return answer.toJson(true);
      });
      
    }
}
