package br.ufc.hpc.frontend.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import br.ufc.hpc.frontend.constant.Constants;
import br.ufc.hpc.frontend.model.User;

@Component
public class InterceptorGeneral extends HandlerInterceptorAdapter{

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String uri = request.getRequestURI();
		User u = (User) request.getSession().getAttribute(Constants.USER_LOGGED_IN);

		if(uri.endsWith("/") || uri.endsWith("/logout") || uri.endsWith("/login")){
			return true; 
		}else if(u==null){
			response.sendRedirect("/?error=Você precisa realizar login");
			return false; 
		}
		return true;
	}
	
}
