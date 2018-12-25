package com.hendisantika.jwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Subject;
import com.hendisantika.jwt.domain.User;
import com.hendisantika.jwt.repository.AppUserRepository;
import com.hendisantika.jwt.repository.ClassRepository;
import com.hendisantika.jwt.repository.SubjectRepository;


@Service
public class SubjectServiceImpl implements SubjectService {
	@Autowired
	private SubjectRepository subjectRepository;

	@Override
	public Subject save(Subject sub) {
		// TODO Auto-generated method stub
		return subjectRepository.save(sub);
	}

	@Override
	public List<Subject> findAll() {
		// TODO Auto-generated method stub
		return subjectRepository.findAll();
	}

	@Override
	public List<Subject> findSubjectByNameContaing(String name) {
		// TODO Auto-generated method stub
		return subjectRepository.findByNameContaining(name);
	}

	@Override
	public Subject findBySubjectid(int id) {
		// TODO Auto-generated method stub
		return subjectRepository.findBySubjectid(id);
	}



}