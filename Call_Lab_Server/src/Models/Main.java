package Models;


import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;


public class Main extends Application{
	public static int port = 4444; 
	public static Stage stage;
	public static SimpleServer httpServer = new SimpleServer();
	public static void main(String[] args) {
		
		httpServer.Start(port);
		launch(args);
	}
	@Override
	public void start(Stage primaryStage) throws Exception {
		primaryStage.setTitle("Hello World!");
		Parent root = FXMLLoader.load(getClass().getResource("/FXML/main_page.fxml"));
		Scene scene = new Scene(root, 600, 390);
        stage=primaryStage;
        primaryStage.setScene(scene);
        primaryStage.show();
		
	}
	@Override
	public void stop() {
		httpServer.Stop();
	}
	
}
