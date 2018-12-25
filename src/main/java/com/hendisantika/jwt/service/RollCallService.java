package com.hendisantika.jwt.service;

import java.util.List;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Rollcall;
import com.hendisantika.jwt.domain.User;


public interface RollCallService {
	List<Rollcall> findByStudentidnameAndTimeContaining(int id,String time);
}