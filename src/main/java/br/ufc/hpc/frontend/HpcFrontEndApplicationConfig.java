package br.ufc.hpc.frontend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import br.ufc.hpc.frontend.interceptor.InterceptorGeneral;

@Configuration
public class HpcFrontEndApplicationConfig extends WebMvcConfigurerAdapter{

	@Autowired
	private InterceptorGeneral interceptorGeneral;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(interceptorGeneral);
	}
	
}
