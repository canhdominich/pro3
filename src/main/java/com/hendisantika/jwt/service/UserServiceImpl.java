package com.hendisantika.jwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.hendisantika.jwt.domain.User;
import com.hendisantika.jwt.exception.TransactionException;
import com.hendisantika.jwt.repository.AppUserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private AppUserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public User save(User user) {

		user.setPass(bCryptPasswordEncoder.encode(user.getPass()));
		return userRepository.save(user);
	}

	@Override
	public User findOneByUsername(String username) {
		return userRepository.findOneByUsername(username);
	}

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public List<User> findUserByUsernameLike(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsernameContaining(username);
	}

	@Override
	public void delete(User id) {
		userRepository.delete(id);

	}

	@Override
	public User findOneById(int id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = TransactionException.class)
	public void addListStudent(List<User> list) {
		for (User user : list) {
			if (findOneByUsername(user.getUsername()) != null) {
				throw new RuntimeException("Username already exist:" + user.getUsername());
			} else {
				save(user);
			}
		}

	}
}