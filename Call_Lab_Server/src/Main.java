import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main {
	public static int port = 4444;
	public static void main(String[] args) {
//		// start http server
//		SimpleHttpServer httpServer = new SimpleHttpServer();
//		httpServer.Start(port);
		
		// start https server
		SimpleServer httpServer = new SimpleServer();
		//httpServer.Start(port);
		
		JFrame frame = new JFrame("FrameDemo");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		//frame.getContentPane().add(emptyLabel, BorderLayout.CENTER);
		frame.pack();
		frame.setVisible(true);
		JButton button = new JButton("Start Server!");
		JButton button2 = new JButton("Close Server!");
		button.addActionListener(new ActionListener()
		{
		  public void actionPerformed(ActionEvent e)
		  {
		    httpServer.Start(port);
		  }
		});
		button2.addActionListener(new ActionListener()
		{
		  public void actionPerformed(ActionEvent e)
		  {
		    httpServer.Stop();
		  }
		});
        JPanel panel = new JPanel();

        // Add button to JPanel
        panel.add(button);
        panel.add(button2);;
        // And JPanel needs to be added to the JFrame itself!
        frame.add(panel);
		
//		System.out.println(System.getProperty("user.dir"));
//		System.out.println(Main.class.getClassLoader().getResource("").getPath());
		
	}
}
