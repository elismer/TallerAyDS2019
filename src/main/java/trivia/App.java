package trivia;

import org.javalite.activejdbc.Model;
import static spark.Spark.get;
import static spark.Spark.post;

import static spark.Spark.before;
import static spark.Spark.after;

import java.util.ArrayList;
import org.javalite.activejdbc.LazyList;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;
import trivia.Answer;
import trivia.QuestionParam;
import trivia.Option;
import trivia.Game;
import trivia.Level;
import trivia.Stat;
import trivia.Category;
import trivia.Comment;

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

public class App
{
    public static void main( String[] args )
    {
      before((request, response) -> {
        Base.open();
      });

      after((request, response) -> {
        Base.close();
      });

      /*get("/hello/:name", (req, res) -> {
        return "hello" + req.params(":name");
      });
      
      System.out.println("hola mundo");*/

      post("/users", (req, res) -> {
        Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

        User user = new User();
        user.set("dni", bodyParams.get("dni"));
        user.set("name_user", bodyParams.get("name_user"));
        user.set("last_name",bodyParams.get("last_name"));
        user.set("password",bodyParams.get("password"));
        user.saveIt();

        res.type("application/json");

        return user.toJson(true);
        
      });
      
      get("/users", (req, res) -> { //retorna todos los usuarios
      	LazyList<User> user = User.findAll();
      	for (User u: user)
      		System.out.println("Su username es: " + u.get("name_user") + ", su dni es: " + u.get("dni"));
      	return user;
      });
      
      
      
      post("/questions", (req, res) -> {
      	QuestionParam bodyParams = new Gson().fromJson(req.body(), QuestionParam.class);
      	//Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	//ArrayList<Option> os = new Gson().fromJson(req.body(), ArrayList.class);
      	
      	
      	/*System.out.println(" Start -------------------- ");
      	System.out.println(bodyParams);
      	System.out.println(req.body());
      	System.out.println( req.params("options"));
  
      	System.out.println(req.body().getClass().getName());
  
      	System.out.println("bodyParams.description ");
      	System.out.println(bodyParams.description);
      
      	System.out.println("accediendo a options");
      	System.out.println(bodyParams.options);
		System.out.println(bodyParams.getOptions());
            System.out.println(bodyParams.get("options"));
      	
      	System.out.println(question.get("options"));
      	
      	Object options = question.get("options");
      	
      	System.out.println(options);
      	
      	System.out.println(" End -------------------- "); */
      	
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
     
      get("/questions", (req, res) -> { //retorna todas las preguntas
      	LazyList<Question> question = Question.findAll();
      	for (Question q: question)
      		System.out.println("Descripcion de la pregunta: " + q.get("description"));
      		LazyList<Option> option = q.getAll(Option.class);
      		for (Option o: option)
      			System.out.println("Descripcion de la opcion: " + o.get("description") + " tipo de la opcion: " + o.get("type"));
      	return question;
      });
      
      post("/comments", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Comment comment = new Comment();
      	comment.set("description", bodyParams.get("description"));
      	//comment.add(user);
      	comment.saveIt();
      	
      	res.type("application/json");
      	
      	return comment.toJson(true);
      });
      
      
       post("/stats", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Stat stat = new Stat();
      	//stat.add(user);
      	stat.saveIt();
      	
      	res.type("application/json");
      	
      	return stat.toJson(true);
      });
      
       post("/answers", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Answer answer = new Answer();
      	//answer.add(game);
      	//answer.add(option);
      	answer.saveIt();
      	
      	res.type("application/json");
      	
      	return answer.toJson(true);
      });
      
    }
}
