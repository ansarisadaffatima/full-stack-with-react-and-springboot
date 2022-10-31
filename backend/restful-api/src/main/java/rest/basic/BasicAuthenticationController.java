package rest.basic;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:4200")
public class BasicAuthenticationController {

    @GetMapping("/basicAuth")
    AuthenticationBean helloBean(){
        return new AuthenticationBean("You are Authenticated.");
    }

}
