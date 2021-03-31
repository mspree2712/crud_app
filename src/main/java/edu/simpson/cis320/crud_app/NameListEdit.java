package edu.simpson.cis320.crud_app;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit", value = "/api/name_list_edit")

public class NameListEdit extends HttpServlet {
    private final static Logger log = Logger.getLogger(FormTestJSONServlet.class.getName());

    private Pattern nameValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern phoneNumberValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEdit(){
        nameValidationPattern = Pattern.compile("^[A-Za-z]{1,10}$");
        emailValidationPattern = Pattern.compile("^\\S+@\\S+$");
        phoneNumberValidationPattern = Pattern.compile("^[0-9()-]+$");
        birthdayValidationPattern = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        log.log(Level.INFO, "doPost for NameListEdit");

        // You can output in any format, text/JSON, text/HTML, etc. We'll keep it simple
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Log the string we got as a request, just as a check
        log.log(Level.INFO, requestString);

        // Great! Now we want to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Jsonb jsonb = JsonbBuilder.create();
        Person person = jsonb.fromJson(requestString, Person.class);

        /*String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String emailAddress = request.getParameter("emailAddress");
        String phoneNumber = request.getParameter("phoneNumber");
        String birthday = request.getParameter("birthday");

        Matcher f = nameValidationPattern.matcher(firstName);
        if (f.find( )){
            out.println("success");
        } else {
            out.println("error");
        }

        Matcher l = nameValidationPattern.matcher(lastName);
        if (l.find( )){
            out.println("success");
        } else {
            out.println("error");
        }

        Matcher e = emailValidationPattern.matcher(emailAddress);
        if (e.find( )){
            out.println("success");
        } else {
            out.println("error");
        }

        Matcher p = phoneNumberValidationPattern.matcher(phoneNumber);
        if (p.find( )){
            out.println("success");
        } else {
            out.println("error");
        }

        Matcher b = nameValidationPattern.matcher(birthday);
        if (b.find( )){
            out.println("success");
        } else {
            out.println("error");
        }*/

        PersonDAO.addPerson(person);
    }
}
