package com.hendisantika.jwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.User;

/**
 * @author Hendi Santika
 *
 */
public interface ClassRepository extends JpaRepository<Classroom, Long> {
//	public Classroom findOneByClassname(String username);

	public List<Classroom> findAll();

	List<Classroom> findByClassnameContaining(String classname);
	
	Classroom findByClassid(int id);
	
	Classroom findOneByClassname(String classname);
	
	Classroom findByClassnameAndSchoolyear(String classname, String schoolyear);
}
