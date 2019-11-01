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
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      System.out.println("UserTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("UserTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }

//  @Test
//  public void validateTruth() {
//    assertEquals("True is true", true, true);
//  }

  @Test
  public void validatePresenceOfUsername() {
    User u = new User();
    assertEquals("username can't be blank", u.isValid(), false);
  }

  @Test
  public void validatePresenceOfDni() {
    User u = new User();
    assertEquals("dni can't be blank", u.isValid(), false);
  }

  @Test
  public void validatePresenceOfPassword() {
    User u = new User();
    assertEquals("password can't be blank", u.isValid(), false);
  }

  @Test
  public void validatePresenceOfLastNameUser() {
    User u = new User();
    assertEquals("user last name can't be blank", u.isValid(), false);
  }

  /*@Test
  public void validateNotEqualDni() {
  	User u= new User();
  	assertEquals("this dni is already loaded", u.checkDni(), true); /*checkDni sera un metodo que se fije si un dni ingresado ya se encuentra en la base de datos*/




}
