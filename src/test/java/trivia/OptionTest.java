package trivia;

import trivia.Option;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class OptionTest {
  @Before
  public void before(){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("OptionTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }

  @Test
  public void validatePresenceOfDescription() {
    Option o = new Option();
    assertEquals("description can't be blank", o.isValid(), false);
  }
}
