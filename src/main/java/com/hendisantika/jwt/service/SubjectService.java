package com.hendisantika.jwt.service;

import java.util.List;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Subject;
import com.hendisantika.jwt.domain.User;


public interface SubjectService {
    Subject save(Subject classroom);

//    Classroom findOneByClassname(String classname);
    
    List<Subject> findAll();
    
    List<Subject> findSubjectByNameContaing( String username);
    Subject findBySubjectid(int id);
}