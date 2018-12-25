package com.hendisantika.jwt.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.User;
import com.hendisantika.jwt.exception.TransactionException;
import com.hendisantika.jwt.repository.AppUserRepository;
import com.hendisantika.jwt.repository.ClassRepository;
import com.hendisantika.jwt.repository.StudentRepository;


@Service
public class StudentServiceImpl implements StudentService {
	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private UserService userService;
	
	@Autowired
	private ClassService classService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public Student save(Student std) {
		// TODO Auto-generated method stub
		return studentRepository.save(std);
	}

	@Override
	public List<Student> findAll() {
		// TODO Auto-generated method stub
		return studentRepository.findAll();
	}

	@Override
	public List<Student> findByStudentnameContaining(String username) {
		// TODO Auto-generated method stub
		return studentRepository.findByStudentnameContaining(username);
	}

	@Override
	public Student findByStudentid(int id) {
		// TODO Auto-generated method stub
		return studentRepository.findByStudentid(id);
	}

	@Override
	public void delete(Student std) {
		studentRepository.delete(std);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW,
    rollbackFor = TransactionException.class)
	public void addListStudent(int classid,List<Student> list) {
		Classroom classroom= classService.findByClassId(classid);
		Set<Student> myList = new HashSet<>();
		for (Student std : list) {
			int ran=(int)(Math.random() * 1000001);
			User user= new User();
			user.setUsername(std.getStudentname()+ran);
			user.setPass(std.getStudentname());
			if (userService.findOneByUsername(user.getUsername()) != null) {
				throw new RuntimeException("Username already exist:" + std.getStudentname());
			} else {
				userService.save(user);
				std.setUser(user);
				studentRepository.save(std);
				classroom.getStudents().add(std);
			}
		}
		
		classService.save(classroom);
	}




}