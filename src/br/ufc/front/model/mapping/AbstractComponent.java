package br.ufc.front.model.mapping;

public class AbstractComponent {
	
	public int id;
	public String name;
	public String path;
	public String supertype;
	
	public AbstractComponent(int id, String name, String path,String supertype) {
		super();
		this.id = id;
		this.name = name;
		this.path = path;
		this.supertype = supertype;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getSupertype() {
		return supertype;
	}
	public void setSupertype(String supertype) {
		this.supertype = supertype;
	}
	
	
	
}
