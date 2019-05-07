package trivia;


import static spark.Spark.get;
import static spark.Spark.post;

import static spark.Spark.before;
import static spark.Spark.after;

import org.javalite.activejdbc.LazyList;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;
import trivia.Answer;
import trivia.Question;
import trivia.Option;
import trivia.Game;
import trivia.Level;
import trivia.Stat;
import trivia.Category;
import trivia.Comment;

import com.google.gson.Gson;
import java.util.Map;

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

      get("/hello/:name", (req, res) -> {
        return "hello" + req.params(":name");
      });

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
      
      
      post("/categories", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Category category = new Category();
      	category.set("numCategory", bodyParams.get("numCategory"));
      	category.saveIt();
      	
      	res.type("application/json");
      	
      	return category.toJson(true);	
      });
      
      post("/questions", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Question question = new Question();
      	question.set("description", bodyParams.get("description"));
      	//question.add(category);
      	question.saveIt();
      	
      	res.type("application/json");
      	
      	return question.toJson(true);	
      });
     
      post("/options", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
		
		Option option = new Option();
		option.set("description", bodyParams.get("description"));
		option.set("type", bodyParams.get("type"));
		//option.add(question);
		option.saveIt();
		
		res.type("application/json");
      	
      	return option.toJson(true);
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
      
      post("/levels", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Level level = new Level();
      	//level.set("number_level"), bodyParams.get("number_level");
      	//level.add(category);
      	level.saveIt();
      	
      	res.type("application/json");
      	
      	return level.toJson(true);
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
