package com.hendisantika.jwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Subject;
import com.hendisantika.jwt.domain.User;

/**
 * @author Hendi Santika
 *
 */
public interface SubjectRepository extends JpaRepository<Subject, Long> {
//	public Classroom findOneByClassname(String username);

	public List<Subject> findAll();

	List<Subject> findByNameContaining(String classname);
	
	Subject findBySubjectid(int id);
}
