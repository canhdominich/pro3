package com.hendisantika.jwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hendisantika.jwt.domain.User;

/**
 * @author Hendi Santika
 *
 */
public interface AppUserRepository extends JpaRepository<User, Long> {
	public User findOneByUsername(String username);

	public List<User> findAll();

	List<User> findByUsernameContaining(String username);
	
	User findById(int id);
}
