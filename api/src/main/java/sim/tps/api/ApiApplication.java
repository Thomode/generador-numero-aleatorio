package sim.tps.api;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class ApiApplication {
	@Resource
	private Environment env;

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@PostConstruct
	public void init() {
		// Show the Swagger UI URL after the app starts
		String port = env.getProperty("server.port");
		String newLines = "\n".repeat(3);

		// Local url
		System.out.printf("%sLocal url: http://localhost:%s/swagger-ui/index.html%s", newLines, port, newLines);
	}
}
