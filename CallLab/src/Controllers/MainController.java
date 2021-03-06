package Controllers;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;


import Models.Main;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;

public class MainController {
	
    @FXML
    private Button startServerBtn;
    
    @FXML
    private Button sentencesBtn;
    
    @FXML
    private Button closeServerBtn;

    @FXML
    private Button textWithQuestionsBtn;
    
    @FXML
    void closeServer(ActionEvent event) {
    	if (Main.httpServer != null)
    		Main.httpServer.Stop();
		System.exit(0);
    }
    
    @FXML
    void startSentences(ActionEvent event) {
    	if (Desktop.isDesktopSupported()) {
			new Thread(() -> {
				try {
					//--------- THIS PART IS FOR WINDOWS --------------
					File file = new File("index.html");
					String path = file.getAbsolutePath();
					file = new File(path);
					file = new File(file.getParent());
					file = new File(file.getParent());
					file = new File(file.getAbsolutePath()+"/Sentences/index.html");
					System.out.println(file.getAbsolutePath());
					
					//--------- THIS PART IS FOR LINUX ----------------
					//file = new File("src/Sentences/index.html");
					Desktop.getDesktop().browse(file.toURI());
					}
				catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}).start();
    	}
    }
    
    @FXML
    void startServer(ActionEvent event) {
    	//File resFile = null;
		//resFile = new File(Main.class.getResource(File.separator+"Call_Lab_Client").toURI());

		if (Desktop.isDesktopSupported()) {
			new Thread(() -> {
				try {
					File file = new File("index.html");
					Desktop.getDesktop().browse(file.toURI());
					}
				catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}).start();
		}
    }
    
    @FXML
    void startMatchingExercise(ActionEvent event) {
    	if (Desktop.isDesktopSupported()) {
			new Thread(() -> {
				try {
					//--------- THIS PART IS FOR WINDOWS --------------
					File file = new File("index.html");
					String path = file.getAbsolutePath();
					file = new File(path);
					file = new File(file.getParent());
					file = new File(file.getParent());
					file = new File(file.getAbsolutePath()+"/MatchingExercise/index.html");
					System.out.println(file.getAbsolutePath());
					
					//--------- THIS PART IS FOR LINUX ----------------
					//file = new File("src/TextWithQuestionsCreator/index.html");
					Desktop.getDesktop().browse(file.toURI());
					}
				catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}).start();
    	}
    }
    
    @FXML
    void startTextWithQuestions(ActionEvent event) {
    	if (Desktop.isDesktopSupported()) {
			new Thread(() -> {
				try {
					//--------- THIS PART IS FOR WINDOWS --------------
					File file = new File("index.html");
					String path = file.getAbsolutePath();
					file = new File(path);
					file = new File(file.getParent());
					file = new File(file.getParent());
					file = new File(file.getAbsolutePath()+"/TextWithQuestionsCreator/index.html");
					System.out.println(file.getAbsolutePath());
					
					//--------- THIS PART IS FOR LINUX ----------------
					//file = new File("src/TextWithQuestionsCreator/index.html");
					Desktop.getDesktop().browse(file.toURI());
					}
				catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}).start();
    	}
    }
    
}
