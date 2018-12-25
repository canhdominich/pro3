package com.hendisantika.jwt.service;

import java.util.List;

import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.User;



public interface UserService {
    User save(User user);

    User findOneByUsername(String username);
    
    User findOneById(int id);
    
    List<User> findAll();
    
    List<User> findUserByUsernameLike( String username);
    
    void delete(User id);	
    
    void addListStudent(List<User> list);
}