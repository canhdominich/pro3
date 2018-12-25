package com.hendisantika.jwt.service;

import java.util.List;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Mark;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.User;


public interface MarkService {
	// Mark save(Mark classroom);

//    Classroom findOneByClassname(String classname);
    
    List<Mark> findAll();
    
    List<Mark>  findByStudentId(int id);
    
    List<String> findDistinctSchoolyear();
    
    List<Mark>  findByStudentidAndSubjectAndSchoolyearAndSemester(Integer id, String sub, String year, String se);
}