package restful.api.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import restful.api.helloworld.HelloWorldBean;

@RestController
@CrossOrigin("http://localhost:4200")
public class Controller {

    @GetMapping("/hello-world")
    String hello(){
        return "Hello World";
    }

    @GetMapping("/hello-world-bean")
    HelloWorldBean helloBean(){
        return new HelloWorldBean("Hello World Bean");
    }

    @GetMapping("/hello-world/path-variable/{name}")
    HelloWorldBean hello(@PathVariable String name){
        // throw new RuntimeException("Runtime Exception");
        return new HelloWorldBean("Hello "+name);
    }
}
