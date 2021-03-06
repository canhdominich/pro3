package com.hendisantika.jwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Employee;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.Teacher;
import com.hendisantika.jwt.domain.User;

/**
 * @author Hendi Santika
 *
 */
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//	public Classroom findOneByClassname(String username);

	public List<Employee> findAll();

//	List<Student> findByStudentnameContaining(String name);
//	
//	Student findByStudentid(int id);
}
