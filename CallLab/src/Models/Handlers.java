package Models;

import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
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

	public static class TextWithQuestionsPostHandler implements HttpHandler {

		@Override
		public void handle(HttpExchange he) throws IOException {
			String thefeedbacks="";
			String thequestions="";
			String thetitle="";
			String thetext="";
			String filename="";
			String number="";
			String theimage = "";
			String parNum = "";
			String imageName = "";
			he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

		    if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
		            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
		            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
		            he.sendResponseHeaders(204, -1);
		            return;
		        }
			System.out.println("Served by /TextWithQuestionsPostHandler");
			// parse request
			Map<String, Object> parameters = new HashMap<String, Object>();
			InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "UTF-8");
			BufferedReader br = new BufferedReader(isr);
			String query = br.readLine();
			parseQuery(query, parameters);
			// send response
			String response = "";
			for (String key : parameters.keySet()) {
				//response += key + " = " + parameters.get(key) + "\n";
				if (key.equals("title"))
					thetitle+=parameters.get(key);
				else if (key.equals("text"))
					thetext+= parameters.get(key);
				else if (key.equals("fileName"))
					filename+= parameters.get(key);
				else if (key.equals("questions"))
					thequestions+= parameters.get(key);
				else if (key.equals("feedbacks"))
					thefeedbacks+= parameters.get(key);
				else if (key.equals("numOfQuestions"))
					number+= parameters.get(key);
				else if (key.equals("image"))
					theimage+= parameters.get(key);
				else if (key.equals("parNum")) 
					parNum+= parameters.get(key);
				else if (key.equals("imageName"))
					imageName += parameters.get(key);
					
			}
			InputStream in1 = getClass().getResourceAsStream("/templateTWQT.html"); 
			BufferedReader reader1 = new BufferedReader(new InputStreamReader(in1));
			String html="";
			String line1;
		    while ((line1 = reader1.readLine()) != null) {
		        html += line1+"\n";
		    }
			String htmlString = html;
			htmlString = htmlString.replace("$theTitle", thetitle);
			htmlString = htmlString.replace("$theText", thetext);
			htmlString = htmlString.replace("$thequestions", thequestions);
			htmlString = htmlString.replace("$thefeedbacks", thefeedbacks);
			htmlString = htmlString.replace("$numOfQuestions", number);
			htmlString = htmlString.replace("$theimage", theimage);
			htmlString = htmlString.replace("$parNum", parNum);
			htmlString = htmlString.replace("$imageName", imageName);
			File newHtmlFile = new File("path/"+filename+".html");
			FileUtils.writeStringToFile(newHtmlFile, htmlString,"UTF-8");
			Desktop.getDesktop().open(new File("path"));
			he.sendResponseHeaders(200, response.length());
			OutputStream os = he.getResponseBody();
			os.write(response.toString().getBytes());
			os.close();

		}
	}
	public static class ClozeCreationPostHandler implements HttpHandler {

		@Override
		public void handle(HttpExchange he) throws IOException {
			String thefunctions="";
			String thefeedbacks="";
			String theanswers="";
			String thetitle="";
			String numberOfQuestions = "";
			String fileName = "";
			String bgcolor = "";
			String theimage = "";
			String imageWidth = "";
			String imageHeight = "";
			he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

		    if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
		            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
		            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
		            he.sendResponseHeaders(204, -1);
		            return;
		        }
			System.out.println("Served you by /ClozeCreationPostHandler");
			// parse request
			Map<String, Object> parameters = new HashMap<String, Object>();
			InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "UTF-8");
			System.out.println("encoding is" +isr.getEncoding());
			BufferedReader br = new BufferedReader(isr);
			String query = new String((br.readLine()).getBytes(), isr.getEncoding());
			query = new String(query.getBytes(),"UTF-8");
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
				else if (key.equals("image")) 
					theimage+=parameters.get(key);
				else if (key.equals("imageWidth"))
					imageWidth+=parameters.get(key);
				else if (key.equals("imageHeight"))
					imageHeight+=parameters.get(key);
			}
			InputStream in = getClass().getResourceAsStream("/functions.txt"); 
			BufferedReader reader = new BufferedReader(new InputStreamReader(in));
			String functions="";
			String line;
		    while ((line = reader.readLine()) != null) {
		        functions += line+"\n";
		    }
			thefunctions =functions;
			InputStream in1 = getClass().getResourceAsStream("/template.html"); 
			BufferedReader reader1 = new BufferedReader(new InputStreamReader(in1));
			String html="";
			String line1;
		    while ((line1 = reader1.readLine()) != null) {
		        html += line1+"\n";
		    }
			String htmlString = html;
			//testing
			System.out.println(response);
			char x = '’';
			System.out.println((int)(x)+" "+ (int)('\''));
			//htmlString = htmlString.replace("’", "'");
			for (int i=0; i< response.length();i++) {
				int s = (int) response.charAt(i);
				if (s == 1490) {
					if ((int)response.charAt(i+2) == 8482)
						response = response.substring(0, i)+'\''+response.substring(i+3);
					else if ((int)response.charAt(i+2) == 65533) {
						response = response.substring(0, i)+'\"'+response.substring(i+3);
					}
					else if ((int)response.charAt(i+2) == 8221 || (int)response.charAt(i+2) == 8220) {
						response = response.substring(0, i)+" "+'-'+" "+response.substring(i+3);
					}
				}
			}
			System.out.println(response);
			htmlString = htmlString.replace("$thebody", response);
			htmlString = htmlString.replace("$correctanswersarray", theanswers);
			htmlString = htmlString.replace("$feedbackarray", thefeedbacks);
			htmlString = htmlString.replace("$thescript", thefunctions);
			htmlString = htmlString.replace("$theTitle", thetitle);
			htmlString = htmlString.replace("$numOfQuestions", numberOfQuestions);
			htmlString = htmlString.replace("$bgcolor", bgcolor);
			htmlString = htmlString.replace("$theimage", theimage);
			htmlString = htmlString.replace("$imageWidth", imageWidth);
			htmlString = htmlString.replace("$imageHeight", imageHeight);
			
			//System.out.print("html is: \n" + htmlString);
			File newHtmlFile = new File("path/"+fileName+".html");
			//FileUtils.writeStringToFile(newHtmlFile, htmlString,"UTF-8");
			Writer out = new BufferedWriter(new OutputStreamWriter(
				    new FileOutputStream(newHtmlFile), "UTF-8"));
				try {
				    out.write(htmlString);
				} finally {
				    out.close();
				}
			String finished = "Finished";
			Desktop.getDesktop().open(new File("path/"));
			he.sendResponseHeaders(200, finished.length());
			OutputStream os = he.getResponseBody();
			os.write(finished.getBytes());
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