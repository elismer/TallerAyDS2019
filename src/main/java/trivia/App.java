package trivia;


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
import trivia.Question;
import trivia.Option;
import trivia.Game;
import trivia.Level;
import trivia.Stat;
import trivia.Category;
import trivia.Comment;

import com.google.gson.Gson;
import java.util.Map;

class QuestionParam
{
  String description;
  ArrayList<Option> options;
  Boolean active;
  Boolean answered;
  String category_id;
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

      get("/hello/:name", (req, res) -> {
        return "hello" + req.params(":name");
      });
      
      System.out.println("hola mundo");

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
