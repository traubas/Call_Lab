package Controllers;

import java.awt.Desktop;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;

import org.apache.commons.io.FileUtils;

import Models.Main;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import utils.ResourceExtractor;

public class MainController {
	
    @FXML
    private Button startServerBtn;

    @FXML
    private Button closeServerBtn;

    @FXML
    void closeServer(ActionEvent event) {
    	if (Main.httpServer != null)
    		Main.httpServer.Stop();
		System.exit(0);
    }
    
    @FXML
    void startServer(ActionEvent event) {
    	File resFile = null;
		//resFile = new File(Main.class.getResource(File.separator+"Call_Lab_Client").toURI());
		final File fileToCopy = resFile;
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
		 
//		Process proc;
//		try {
//			String os = System.getProperty("os.name").toLowerCase();
//			if (os.contains("win")){
//			    //Operating system is based on Windows
//			}
//			else if (os.contains("osx")){
//			    //Operating system is Apple OSX based
//			}      
//			else if (os.contains("nix") || os.contains("aix") || os.contains("nux")){
//			    //Operating system is based on Linux/Unix/*AIX
//				proc = new ProcessBuilder("google-chrome","index.html").start();
//				int result = proc.waitFor();
//			}
//			
//		} catch (IOException | InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
    }
    
}
