package Models;

import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

public class SimpleServer {
	@SuppressWarnings("unused")
	private int port;
	private HttpServer server;

	public void Start(int port) {
		try {
			this.port = port;
			server = HttpServer.create(new InetSocketAddress("localhost",port), 0);
			System.out.println("server started at " + port);
			server.createContext("/", new Handlers.RootHandler());
			server.createContext("/echoHeader", new Handlers.EchoHeaderHandler());
			server.createContext("/echoGet", new Handlers.EchoGetHandler());
			server.createContext("/echoPost", new Handlers.EchoPostHandler());
			server.setExecutor(null);
			server.start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void Stop() {
		server.stop(0);
		System.out.println("server stopped");
	}
}