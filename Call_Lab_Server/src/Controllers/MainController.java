package Controllers;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;

import Models.Main;
import Models.SimpleServer;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;

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
		if (Desktop.isDesktopSupported()) {
			new Thread(() -> {
				try {
					File file = new File("../Call_Lab_Client/index.html");
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
