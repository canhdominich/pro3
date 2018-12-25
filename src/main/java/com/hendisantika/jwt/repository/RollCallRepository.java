package com.hendisantika.jwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Rollcall;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.User;

/**
 * @author Hendi Santika
 *
 */
public interface RollCallRepository extends JpaRepository<Rollcall, Long> {
//	public Classroom findOneByClassname(String username);

	// public List<Student> findAll();
 
	@Query("SELECT e FROM Rollcall e WHERE e.student.studentid=?1 AND e.time LIKE %?2%")
	List<Rollcall> findByStudentidnameAndTimeContaining(int id,String time);
	
}
