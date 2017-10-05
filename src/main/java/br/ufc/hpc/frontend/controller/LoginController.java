package br.ufc.hpc.frontend.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufc.hpc.frontend.constant.Constants;
import br.ufc.hpc.frontend.model.User;
import br.ufc.hpc.frontend.repository.UserRepository;

@Controller
public class LoginController {

	@Autowired
	private UserRepository user;
	
	@RequestMapping(value={"/login"}, method=RequestMethod.POST)
	public String login(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session){
		User u = (User) user.findByUsernameAndPassword(username, password); 
		if(u != null){
			session.setAttribute(Constants.USER_LOGGED_IN, u);
			return "redirect:home";
		}else{
			return "redirect:?error=Usuário ou senha incorretos";
		}
	}
	
	@RequestMapping(value="/getUserLogged", method=RequestMethod.GET)
	@ResponseBody
	public String userLogged(HttpSession session){
		User u = (User) session.getAttribute(Constants.USER_LOGGED_IN);
		String user = "{\"username\":\""+u.getUsername()+"\",\"email\":\""+u.getEmail()+"\", \"id\":\""+u.getId()+"\"}";
		return user;
	}
	
	@RequestMapping(value={"/logout"}, method=RequestMethod.GET)
	public String logout(HttpSession session){
		session.invalidate();
		return "redirect:";
	}
}
