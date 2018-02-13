package Models;

import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;
import org.apache.commons.io.FileUtils;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class Handlers {
	public static class RootHandler implements HttpHandler {

		@Override
		public void handle(HttpExchange he) throws IOException {
			String response = "<h1>Server start success if you see this message</h1>" + "<h1>Port: " + Main.port + "</h1>";
			he.sendResponseHeaders(200, response.length());
			OutputStream os = he.getResponseBody();
			os.write(response.getBytes());
			os.close();
		}
	}

	public static class EchoHeaderHandler implements HttpHandler {

		@Override
		public void handle(HttpExchange he) throws IOException {
			Headers headers = he.getRequestHeaders();
			Set<Map.Entry<String, List<String>>> entries = headers.entrySet();
			String response = "";
			for (Map.Entry<String, List<String>> entry : entries)
				response += entry.toString() + "\n";
			he.sendResponseHeaders(200, response.length());
			OutputStream os = he.getResponseBody();
			os.write(response.toString().getBytes());
			os.close();
		}
	}

	public static class EchoGetHandler implements HttpHandler {

		@Override
		public void handle(HttpExchange he) throws IOException {
			// parse request
			Map<String, Object> parameters = new HashMap<String, Object>();
			URI requestedUri = he.getRequestURI();
			String query = requestedUri.getRawQuery();
			parseQuery(query, parameters);
			// send response
			String response = "";
			for (String key : parameters.keySet())
				response += key + " = " + parameters.get(key) + "\n";
			he.sendResponseHeaders(200, response.length());
			OutputStream os = he.getResponseBody();
			os.write(response.toString().getBytes());
			os.close();
		}

	}

	public static class EchoPostHandler implements HttpHandler {

		@Override
		public void handle(HttpExchange he) throws IOException {
			String thefunctions="";
			String thefeedbacks="";
			String theanswers="";
			String thetitle="";
			String numberOfQuestions = "";
			String fileName = "";
			String bgcolor = "";
			he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

		    if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
		            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
		            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
		            he.sendResponseHeaders(204, -1);
		            return;
		        }
			System.out.println("Served by /echoPost handler...");
			// parse request
			Map<String, Object> parameters = new HashMap<String, Object>();
			InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
			BufferedReader br = new BufferedReader(isr);
			String query = br.readLine();
			parseQuery(query, parameters);
			// send response
			String response = "";
			for (String key : parameters.keySet()) {
				//response += key + " = " + parameters.get(key) + "\n";
				if (key.equals("html"))
					response+=parameters.get(key);
				else if (key.equals("feedbacks"))
					thefeedbacks+=parameters.get(key);
				else if (key.equals("correctanswers"))
					theanswers+=parameters.get(key);
				else if (key.equals("title"))
					thetitle+=parameters.get(key);
				else if (key.equals("numOfQuestions"))
					numberOfQuestions+= parameters.get(key);
				else if (key.equals("fileName"))
					fileName+= parameters.get(key);
				else if (key.equals("bgcolor")) 
					bgcolor+=parameters.get(key);
			}
			System.out.println("file name is: "+fileName);
			thefunctions =readFile("src/functions.txt");
			File htmlTemplateFile = new File("src/template.html");
			String htmlString = FileUtils.readFileToString(htmlTemplateFile,"UTF-8");
			htmlString = htmlString.replace("$thebody", response);
			htmlString = htmlString.replace("$correctanswersarray", theanswers);
			htmlString = htmlString.replace("$feedbackarray", thefeedbacks);
			htmlString = htmlString.replace("$thescript", thefunctions);
			htmlString = htmlString.replace("$theTitle", thetitle);
			htmlString = htmlString.replace("$numOfQuestions", numberOfQuestions);
			htmlString = htmlString.replace("$bgcolor", bgcolor);
			System.out.println(thetitle);
			File newHtmlFile = new File("path/"+fileName+".html");
			FileUtils.writeStringToFile(newHtmlFile, htmlString,"UTF-8");
			Desktop.getDesktop().open(new File("/home/ofir/projects/Call_Lab/Call_Lab_Server/path"));
			he.sendResponseHeaders(200, response.length());
			OutputStream os = he.getResponseBody();
			os.write(response.toString().getBytes());
			os.close();

		}
	}

	@SuppressWarnings("unchecked")
	public static void parseQuery(String query, Map<String, Object> parameters) throws UnsupportedEncodingException {

		if (query != null) {
			String pairs[] = query.split("[&]");

			for (String pair : pairs) {
				String param[] = pair.split("[=]");

				String key = null;
				String value = null;
				if (param.length > 0) {
					key = URLDecoder.decode(param[0], System.getProperty("file.encoding"));
				}

				if (param.length > 1) {
					value = URLDecoder.decode(param[1], System.getProperty("file.encoding"));
				}

				if (parameters.containsKey(key)) {
					Object obj = parameters.get(key);
					if (obj instanceof List<?>) {
						List<String> values = (List<String>) obj;
						values.add(value);
					} else if (obj instanceof String) {
						List<String> values = new ArrayList<String>();
						values.add((String) obj);
						values.add(value);
						parameters.put(key, values);
					}
				} else {
					parameters.put(key, value);
				}
			}
		}
	}
	private static String readFile(String pathname) throws IOException {

	    File file = new File(pathname);
	    StringBuilder fileContents = new StringBuilder((int)file.length());
	    Scanner scanner = new Scanner(file);
	    String lineSeparator = System.getProperty("line.separator");

	    try {
	        while(scanner.hasNextLine()) {
	            fileContents.append(scanner.nextLine() + lineSeparator);
	        }
	        return fileContents.toString();
	    } finally {
	        scanner.close();
	    }
	}
}