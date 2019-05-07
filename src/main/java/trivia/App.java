package trivia;

import static spark.Spark.get;
import static spark.Spark.post;

import static spark.Spark.before;
import static spark.Spark.after;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.User;

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
        user.set("lastName",bodyParams.get("lastName"));
        user.saveIt();

        res.type("application/json");

        return user.toJson(true);
        
      });
      
      post("/categories", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Category category = new Category();
      	category.set("numCategory", bodyParams.get("numCategory");
      	category.saveIt();
      	
      	res.type("application/json");
      	
      	return category.toJson(true);	
      });
      
      post("/questions", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Question question = new Question();
      	question.set("description", bodyParams.get("description"));
      	question.add(category);
      	question.saveIt();
      	
      	res.type("application/json");
      	
      	return question.toJson(true);	
      });
     
      post("/options", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
		
		Option option = new Option();
		option.set("description", bodyParams.get("description");
		option.set("type", bodyParams.get("type");
		option.add(question);
		option.saveIt();
		
		res.type("application/json");
      	
      	return option.toJson(true);
      });
      
      post("/comments", (req, res) -> {
      	Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      	
      	Comment comment = new Comment();
      	comment.set("description", bodyParams.get("description");
      	comment.add(user);
      	comment.saveIt();
      	
      	res.type("application/json");
      	
      	return comment.toJson(true);
      	
    }
}
