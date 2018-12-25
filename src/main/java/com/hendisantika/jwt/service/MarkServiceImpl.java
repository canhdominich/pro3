package com.hendisantika.jwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Mark;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.User;
import com.hendisantika.jwt.repository.AppUserRepository;
import com.hendisantika.jwt.repository.ClassRepository;
import com.hendisantika.jwt.repository.MarkRepository;
import com.hendisantika.jwt.repository.StudentRepository;

@Service
public class MarkServiceImpl implements MarkService {
	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private MarkRepository markReposity;
	// @Autowired
	// private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public List<Mark> findAll() {
		// TODO Auto-generated method stub
		return markReposity.findAll();
	}

	@Override
	public List<Mark> findByStudentId(int id) {
		// TODO Auto-generated method stub

		return markReposity.findByStudentId(id);
	}

	@Override
	public List<String> findDistinctSchoolyear() {
		// TODO Auto-generated method stub
		return markReposity.findDistinctSchoolyear();
	}

	@Override
	public List<Mark> findByStudentidAndSubjectAndSchoolyearAndSemester(Integer id, String sub, String year,
			String se) {
		// TODO Auto-generated method stub

		if (sub != null) {
			if (year != null) {
				if (se != null) {
					return markReposity.findByStudentidAndSubjectAndSchoolyearAndSemester(id, Integer.parseInt(sub),
							year, Integer.parseInt(se));
				} else {
					return markReposity.findByStudentidAndSubjectAndSchoolyear(id, Integer.parseInt(sub), year);
				}
			} else {
				if (se != null) {
					return markReposity.findByStudentidAndSubjectAndSemester(id, Integer.parseInt(sub),
							Integer.parseInt(se));
				} else {
					return markReposity.findByStudentidAndSubject(id, Integer.parseInt(sub));
				}
			}
		} else {
			if (year != null) {
				if (se != null) {
					return markReposity.findByStudentidAndSchoolyearAndSemester(id, year, Integer.parseInt(se));
				} else {
					return markReposity.findByStudentidAndSchoolyear(id, year);
				}
			} else {
				if (se != null) {
					return markReposity.findByStudentidAndSemester(id, Integer.parseInt(se));
				} else {
					return markReposity.findByStudentId(id);
				}
			}
		}

	}

}