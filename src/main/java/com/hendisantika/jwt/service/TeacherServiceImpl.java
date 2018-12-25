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
import com.hendisantika.jwt.domain.Teacher;
import com.hendisantika.jwt.domain.User;
import com.hendisantika.jwt.exception.TransactionException;
import com.hendisantika.jwt.repository.AppUserRepository;
import com.hendisantika.jwt.repository.ClassRepository;
import com.hendisantika.jwt.repository.StudentRepository;
import com.hendisantika.jwt.repository.SubjectRepository;
import com.hendisantika.jwt.repository.TeacherRepository;


@Service
public class TeacherServiceImpl implements TeacherService {

	@Autowired
	private TeacherRepository teacherRepository;
	@Override
	public List<Teacher> findAll() {
		// TODO Auto-generated method stub
		return teacherRepository.findAll();
	}
	

}