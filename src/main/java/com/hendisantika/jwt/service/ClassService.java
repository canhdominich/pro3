package com.hendisantika.jwt.service;

import java.util.List;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.User;


public interface ClassService {
    Classroom save(Classroom classroom);

    Classroom findOneByClassname(String classname);
    
    List<Classroom> findAll();
    
    List<Classroom> findClassroomByClassnameLike( String username);
    Classroom findById(int id);
    
    Classroom findByClassnameAndSchoolyear(String classname,String schoolyear);
    
    Classroom findByClassId(int id);
    
    void delete(Classroom cl);
}