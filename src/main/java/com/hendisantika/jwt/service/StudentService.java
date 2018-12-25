package com.hendisantika.jwt.service;

import java.util.List;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.User;


public interface StudentService {
    Student save(Student classroom);

//    Classroom findOneByClassname(String classname);
    
    List<Student> findAll();
    
    List<Student> findByStudentnameContaining( String username);
    Student findByStudentid(int id);
    
    void delete(Student std);
    
    void addListStudent(int classid,List<Student> list);
}