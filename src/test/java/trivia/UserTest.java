package trivia;

import trivia.User;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class UserTest {
  @Before
  public void before(){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/triviavet_test", "franco", "franco");
      System.out.println("UserTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("UserTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }

  @Test
  public void validateTruth() {
    assertEquals("True is true", true, true);
  }

  @Test
  public void validatePresenceOfUsername() {
    User u = new User();
    assertEquals("username can't be blank", u.isValid(), false);
  }
}
