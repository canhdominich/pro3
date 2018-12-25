package com.hendisantika.jwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.User;
import com.hendisantika.jwt.repository.AppUserRepository;
import com.hendisantika.jwt.repository.ClassRepository;


@Service
public class ClassroomServiceImpl implements ClassService {
	@Autowired
	private ClassRepository classRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;


	@Override
	public Classroom save(Classroom classroom) {
		// TODO Auto-generated method stub
		return classRepository.save(classroom);
	}



	@Override
	public List<Classroom> findClassroomByClassnameLike(String classname) {
		// TODO Auto-generated method stub
		return classRepository.findByClassnameContaining(classname);
	}

	@Override
	public List<Classroom> findAll() {
		// TODO Auto-generated method stub
		return classRepository.findAll();
	}



	@Override
	public Classroom findById(int id) {
		// TODO Auto-generated method stub
		return classRepository.findByClassid(id);
	}



	@Override
	public Classroom findOneByClassname(String classname) {
		// TODO Auto-generated method stub
		return classRepository.findOneByClassname(classname);
	}



	@Override
	public Classroom findByClassnameAndSchoolyear(String classname, String schoolyear) {
		// TODO Auto-generated method stub
		return classRepository.findByClassnameAndSchoolyear(classname, schoolyear);
	}



	@Override
	public Classroom findByClassId(int id) {
		// TODO Auto-generated method stub
		return classRepository.findByClassid(id);
	}



	@Override
	public void delete(Classroom cl) {
		classRepository.delete(cl);
		
	}
}