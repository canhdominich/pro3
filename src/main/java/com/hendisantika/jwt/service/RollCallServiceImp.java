package com.hendisantika.jwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hendisantika.jwt.domain.Rollcall;
import com.hendisantika.jwt.repository.AppUserRepository;
import com.hendisantika.jwt.repository.RollCallRepository;
@Service
public class RollCallServiceImp implements RollCallService {
	@Autowired
	private RollCallRepository rollCallRepository;

	@Override
	public List<Rollcall> findByStudentidnameAndTimeContaining(int id, String time) {
		// TODO Auto-generated method stub
		return rollCallRepository.findByStudentidnameAndTimeContaining(id, time);
	}

}
