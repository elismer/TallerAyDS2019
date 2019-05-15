package trivia;
import java.util.ArrayList;

import org.javalite.activejdbc.Model;

public class Question extends Model {
	String description;
	String category_id;
	Boolean active;
	Boolean answered;
	public static ArrayList<Option> options;
}
