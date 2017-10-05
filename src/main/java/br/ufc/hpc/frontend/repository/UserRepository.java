package br.ufc.hpc.frontend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufc.hpc.frontend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	public User findByUsernameAndPassword(String username, String password);
	
}
