package trivia;

import org.javalite.activejdbc.Model;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.halt;
import static spark.Spark.before;
import static spark.Spark.after;
import static spark.Spark.put;
import static spark.Spark.options;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Base64;

import org.javalite.activejdbc.LazyList;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import trivia.*;

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

public class App {

  static User currentUser;

  public static void main(String[] args) {
    before((request, response) -> {
  if(!Base.hasConnection()){
    Base.open();
  }
  if (request.requestMethod() != "OPTIONS"){
      System.out.println(request.headers());
      System.out.println("autorizado?"+request.headers("Authorization"));
      String headerToken = (String) request.headers("Authorization");
      if (headerToken == null || headerToken.isEmpty() || !BasicAuth.authorize(headerToken)){
        halt(401);
      }
      currentUser = BasicAuth.getUser(headerToken);
  }

});

//Lo que se ejecuta despues de todo
after((request, response) -> {
  if (Base.hasConnection()) {
    Base.close();
  }
  response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      response.header("Access-Control-Allow-Headers","Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin");

});

    options("/*",
        (req, response) -> {
          return "OK";
        }
    );


    post("/loginAdmin", (req,res) -> {
         if(!currentUser.getBoolean("admin")){
           currentUser=null;
           halt(401);
         }
         return currentUser.toJson(true);
    });

    post("/login", (req, res) -> {
      res.type("application/json");
      // if there is currentUser is because headers are correct, so we only
      // return the current user here
      return currentUser.toJson(true);
    });

    // post para cargar usuario
    post("/users", (req, res) -> {
      Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);

      User user = new User();
      user.set("first_name", bodyParams.get("first_name"));
      user.set("dni", bodyParams.get("dni"));
      user.set("username", bodyParams.get("username"));
      user.set("last_name", bodyParams.get("last_name"));
      user.set("password", bodyParams.get("password"));
      user.set("year", bodyParams.get("year"));
      user.saveIt();
      Game game = new Game();
      Stat stat = new Stat();
      user.add(game);
      stat.set("cant_total_questions", 0);
      stat.set("cant_incorrect_questions", 0);
      stat.set("cant_correct_questions", 0);
      stat.set("cant_unknown_questions", 0);
      user.add(stat);
      res.type("application/json");

      return user.toJson(true);

    });

    get("/users", (req, res) -> { // retorna todos los usuarios
      LazyList<User> user = User.findAll();
      for (User u : user)
        System.out.println("Su username es: " + u.get("username") + ", su dni es: " + u.get("dni"));
      return user;
    });
    // get para jugar segun la categoria elegida
    get("/game/:category_id", (req, res) -> {
      Category category = Category.findById(req.params("category_id"));
      LazyList<Game> games = currentUser.getAll(Game.class);// Sacamos el juego del usuario
      Game game = games.get(0);
      LazyList<Option> optionsCorrects = game.get(Option.class, "type = ?", "CORRECT");// Obtenemos las respuestas
                                                                                       // que fueron correctas
      HashSet<Integer> idsOfQuestions = new HashSet<Integer>();// Creamos un conjunto para tener los id's de las
                                                               // preguntas
      for (Option o : optionsCorrects) {
        idsOfQuestions.add((int) o.get("question_id"));// Agragamos los id's al conjunto
      }
      LazyList<Question> unansweredQuestions = category.getAll(Question.class);// Creamos un copia de todas las
      // preguntas
      for (int i = 0; i < unansweredQuestions.size(); i++) {// Para todas las preguntas de la categoria
        Question q = unansweredQuestions.get(i);
        if (idsOfQuestions.contains(q.get("id"))) {// Si su id esta en el conjunto de las respondidas
          unansweredQuestions.remove(i);// Lo sacamos del conjunto de las no respondidas
          i--;
        }
      }
      Question question = new Question(); // creamos una nueva question
      if (!unansweredQuestions.isEmpty()) { // Si la lista no es vacia
        int cant = (int) (Math.random() * unansweredQuestions.size()); // Le damos una pregunta al azar
        question = unansweredQuestions.get(cant); // en el caso que sea vacia la lista la pregunta va a quedar
                                                  // en blanco, eso
                                                  // significa que la categoria esta completada
      }
      return question.toJson(true);
    });
    // post para cargar preguntas con sus respectivas opciones
    post("/questions", (req, res) -> {
      QuestionParam bodyParams = new Gson().fromJson(req.body(), QuestionParam.class);
      Question question = new Question();
      Category category = Category.findById(bodyParams.category_id);
      question.set("description", bodyParams.description);
      category.add(question);

      question.saveIt();

      for (Option item : bodyParams.options) {
        Option option = new Option();
        option.set("description", item.description);
        option.set("type", item.type);
        question.add(option);
      }

      return question.toJson(true);
    });

    // get para obtener las opciones de una pregunta
    get("/options/:question_id", (req, res) -> {
      Question question = Question.findById(req.params("question_id"));
      LazyList<Option> options = question.getAll(Option.class);
      return options.toJson(true);
    });

    get("/option/:id", (req, res) -> {
      Option option = Option.findById(req.params("id"));
      Question question = option.parent(Question.class);
      return question.toJson(true);
    });

    get("/questions/options", (req, res) -> { // retorna todas las preguntas con sus opciones
      LazyList<Question> question = Question.findAll();
      for (Question q : question) {
        System.out.println("Descripcion de la pregunta: " + q.get("description"));
        LazyList<Option> option = q.getAll(Option.class);
        for (Option o : option)
          System.out
              .println("Descripcion de la opcion: " + o.get("description") + " tipo de la opcion: " + o.get("type"));
      }
      return question.toJson(true);
    });
    // post para cargar comentario
    post("/comments", (req, res) -> {
      Map<String, String> bodyParams = new Gson().fromJson(req.body(), Map.class);

      Comment comment = new Comment();
      //String description = (String)bodyParams.get("description");
      comment.set("description", bodyParams.get("description"));

      currentUser.add(comment);

      res.type("application/json");

      return comment.toJson(true);
    });
    // get para obtener todos los comentarios
    get("/comments", (req, res) -> {
      LazyList<Comment> com = Comment.findAll();
      for (Comment comment : com) {
        System.out.println(comment);
      }
      res.type("application/json");
      return com.toJson(true);
    });

    // get para obtener las categorias
    get("/categories", (req, res) -> {
      LazyList<Category> cat = Category.findAll();
      String aux="{";
      int i=1;
      for (Category category : cat) {
        aux=aux+"\"cat"+i+"\":"+category.toJson(true);
        if(i!=cat.size()){
          aux=aux+",";
        }
        i++;
      }
              aux=aux+"}";
      return aux;
    });

    get("/stats", (req, res) -> {

      LazyList<Stat> stats = currentUser.getAll(Stat.class);
      Stat stat = stats.get(0);
      res.type("application/json");

      return stat.toJson(true);
    });

    get("/stats/:dni", (req, res) -> {
      User user= User.findFirst("dni=?", req.params(":dni"));
      if (!(user == null)){
          LazyList<Stat> stats = user.getAll(Stat.class);
          Stat stat = stats.get(0);
          res.type("application/json");
          return stat.toJson(true);
      }
      else {
        return "{}";
      }
    });

    get("/record/:type", (req, res) -> {
      LazyList<Game> games = currentUser.getAll(Game.class);
      Game game = games.get(0);
      String typeOptions = req.params("type");
      LazyList<Option> options = null;
      if (!typeOptions.equals("ALL")) {
        options = game.get(Option.class, "type = ?", typeOptions);
      }
      else{
        options = game.getAll(Option.class);
      }
      res.type("application/json");

      return options.toJson(true);
    });

    // post para contestar
    post("/answers", (req, res) -> {
      Map<String, Object> bodyParams = new Gson().fromJson(req.body(), Map.class);
      Answer answer = new Answer();
      LazyList<Stat> stats = currentUser.getAll(Stat.class);
      Stat stat = stats.get(0);
      LazyList<Game> games = currentUser.getAll(Game.class);
      Game game = games.get(0);
      Option option = Option.findById(bodyParams.get("chosen_option"));
      Question q = Question.findById(option.getInteger("question_id"));
      Category c = Category.findById(q.getInteger("category_id"));
      game.add(option);
      int cant = 0;
      if (option.get("type").equals("CORRECT")) {
        c.set("cat_corrects", c.getInteger("cat_corrects")+1);
        c.saveIt();
        cant = (int) stat.get("cant_correct_questions") + 1;
        stat.set("cant_correct_questions", cant);
        System.out.println("Tu respuesta es correcta");
      } else if (option.get("type").equals("INCORRECT")) {
        c.set("cat_incorrects", c.getInteger("cat_incorrects")+1);
        c.saveIt();
        cant = (int) stat.get("cant_incorrect_questions") + 1;
        stat.set("cant_incorrect_questions", cant);
        System.out.println("Respuesta incorrecta");
      } else {
        c.set("cat_unknow", c.getInteger("cat_unknow")+1);
        c.saveIt();
        cant = (int) stat.get("cant_unknown_questions") + 1;
        stat.set("cant_unknown_questions", cant);
      }
      cant = (int) stat.get("cant_total_questions") + 1;
      stat.set("cant_total_questions", cant);
      stat.saveIt();
      res.type("application/json");

      return answer.toJson(true);
    });

  }
}
