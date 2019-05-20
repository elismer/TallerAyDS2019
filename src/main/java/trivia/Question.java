package trivia;
import java.util.ArrayList;

import org.javalite.activejdbc.Model;

public class Question extends Model {
	String description;
	public static ArrayList<Option> options;
	String category_id;
	Boolean active;
	Boolean answered;
}
