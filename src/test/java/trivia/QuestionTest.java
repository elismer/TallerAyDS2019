package trivia;

import trivia.Question;

import org.javalite.activejdbc.Base;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class QuestionTest {
  @Before
  public void before(){
      Base.open("com.mysql.jdbc.Driver", "jdbc:mysql://localhost:3306/trivia_test", "root", "root");
      System.out.println("QuestionTest setup");
      Base.openTransaction();
  }

  @After
  public void after(){
      System.out.println("QuestionTest tearDown");
      Base.rollbackTransaction();
      Base.close();
  }
