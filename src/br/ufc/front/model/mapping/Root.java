package br.ufc.front.model.mapping;

import java.util.ArrayList;
import java.util.List;

public class Root {
	
	private List<AbstractComponent> abstract_component = new ArrayList();

	public Root(List<AbstractComponent> abstract_component) {
		super();
		this.abstract_component = abstract_component;
	}

	public List<AbstractComponent> getAbstractComponent() {
		return abstract_component;
	}

	public void setAbstractComponent(List<AbstractComponent> abstract_component) {
		this.abstract_component = abstract_component;
	}
	
	
}
