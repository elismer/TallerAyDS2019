package trivia;

import org.javalite.activejdbc.Base;
import org.javalite.activejdbc.DB;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static spark.Spark.after;
import static spark.Spark.before;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Base64;

import org.junit.After;
import org.junit.Before;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import trivia.User;
import spark.utils.IOUtils;

import spark.Spark;

import java.io.OutputStreamWriter;

import com.google.gson.Gson;

public class UserIntegrationTest {
    private static int PORT = 4567;
    private static String ADMIN_USERNAME = "admin";
    private static String ADMIN_PASSWORD = "admin";

    @AfterClass
    public static void tearDown() {
        Spark.stop();
    }

    @After
    public void clear() {
    }


    @Before
    public void beforeTest() {
    }

    @BeforeClass
    public static void setup() {
        App.main(null);

        Spark.awaitInitialization();

        // Create an admin user to log into system using Basic Auth before run the test
	if (Base.hasConnection()) {
        	Base.close();
      	}        
	Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_dev", "root", "root");
        User u = new User();
        u.set("username", ADMIN_USERNAME);
        u.set("password", ADMIN_PASSWORD);
        u.set("dni", "23009456");
        u.set("first_name","admin");
        u.set("last_name","lopes");
	//u.set("admin","TRUE");
        u.saveIt();
        Base.close();
    }

    @Test
    public void canCreateUser() {
      String username = "Alan";
      String nick_name = "ConCas";
      String last_name = "Turing";
      String dni = "23456789";
      String password= "abc";

      Map<String, String> parameters = new HashMap<>();
      parameters.put("username", username);
      parameters.put("password", password);
      parameters.put("last_name",last_name);
      parameters.put("dni",dni);
      parameters.put("first_name", nick_name);

      UrlResponse response = doRequest("POST", "/users", parameters);
      Map<String, Object> jsonResponse = new Gson().fromJson(response.body, Map.class);

      assertNotNull(response);
      assertNotNull(response.body);
      assertEquals(200, response.status);
      assertEquals(jsonResponse.get("username"), username);
    }

    private static UrlResponse doRequest(String requestMethod, String path, Map body) {
        UrlResponse response = new UrlResponse();

        try {
            getResponse(requestMethod, path, body, response);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return response;
    }

    private static void getResponse(String requestMethod, String path, Map body, UrlResponse response)
            throws MalformedURLException, IOException, ProtocolException {
      URL url = new URL("http://localhost:" + PORT + path);

      // This is the point where the connection is opened.
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      // Set User to get Authorized request
      String userCredentials = ADMIN_USERNAME + ":" + ADMIN_PASSWORD;
      String basicAuth = "Basic " + new String(
        Base64.getEncoder().encode(userCredentials.getBytes())
      );
      connection.setRequestProperty("Authorization", basicAuth);

      // set connection output to true (needs to be true since this request
      // is carrying an input (response) body.)
      connection.setDoOutput(true);

      // set connection verb to user
      connection.setRequestMethod(requestMethod);

      // write parameters into connection
      OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
      writer.write(body.toString());
      writer.close();

      // Open communications link (network traffic occurs here).
      connection.connect();

      //  Retrieve the response body as an InputStream.
      String res = IOUtils.toString(connection.getInputStream());

      // Build the response to return
      response.body = res;
      response.status = connection.getResponseCode();
      response.headers = connection.getHeaderFields();
    }

    // Represent a Response
    private static class UrlResponse {
      public Map<String, List<String>> headers;
      private String body;
      private int status;
    }
}
