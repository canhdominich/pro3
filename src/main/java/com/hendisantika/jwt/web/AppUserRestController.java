package com.hendisantika.jwt.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Employee;
import com.hendisantika.jwt.domain.Mark;
import com.hendisantika.jwt.domain.Rollcall;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.Subject;
import com.hendisantika.jwt.domain.Teacher;
import com.hendisantika.jwt.domain.User;
import com.hendisantika.jwt.jsonview.ClassHasStudentJsonView;
import com.hendisantika.jwt.jsonview.ClassJsonView;
import com.hendisantika.jwt.jsonview.MarkJsonView;
import com.hendisantika.jwt.jsonview.RollCallJsonView;
import com.hendisantika.jwt.jsonview.StudentsOfClassJsonView;
import com.hendisantika.jwt.jsonview.SubjectJsonView;
import com.hendisantika.jwt.jsonview.TeacherJsonView;
import com.hendisantika.jwt.jsonview.UserJsonView;
import com.hendisantika.jwt.repository.AppUserRepository;
import com.hendisantika.jwt.repository.EmployeeRepository;
import com.hendisantika.jwt.service.ClassService;
import com.hendisantika.jwt.service.MarkService;
import com.hendisantika.jwt.service.RollCallService;
import com.hendisantika.jwt.service.StudentService;
import com.hendisantika.jwt.service.SubjectService;
import com.hendisantika.jwt.service.TeacherService;
import com.hendisantika.jwt.service.UserService;

import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.Set;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/api")
public class AppUserRestController {
	@Autowired
	private AppUserRepository appUserRepository;
	@Autowired
	private UserService userService;

	@Autowired
	private ClassService classService;

	@Autowired
	private StudentService studentService;

	@Autowired
	private RollCallService rollcallService;

	@Autowired
	private MarkService markService;

	@Autowired
	private TeacherService teacherService;

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private EmployeeRepository employeeService;

	// /**
	// * Web service for getting all the appUsers in the application.
	// *
	// * @return list of all AppUser
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public ResponseEntity<String> users() throws JsonProcessingException {
		List<User> list = userService.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writerWithView(UserJsonView.Public.class).writeValueAsString(list);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	// * @return list of all class
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/class", method = RequestMethod.GET)
	public ResponseEntity<String> classes() throws JsonProcessingException {
		List<Classroom> list = classService.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writerWithView(ClassJsonView.Public.class).writeValueAsString(list);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	// * @return list of all student
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/student", method = RequestMethod.GET)
	public ResponseEntity<String> students() throws JsonProcessingException {
		List<Student> list = studentService.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writerWithView(StudentsOfClassJsonView.Public.class).writeValueAsString(list);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	// * @return list of all teacher
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/teacher", method = RequestMethod.GET)
	public ResponseEntity<String> teacher() throws JsonProcessingException {
		List<Teacher> list = teacherService.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writerWithView(TeacherJsonView.Public.class).writeValueAsString(list);
		System.out.println("list teacher:" + result);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	// * @return list of all employee
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/employee", method = RequestMethod.GET)
	public ResponseEntity<String> employee() throws JsonProcessingException {
		List<Employee> list = employeeService.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writerWithView(TeacherJsonView.Public.class).writeValueAsString(list);
		System.out.println("list employee:" + result);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	// * @return list of all subject
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/subject", method = RequestMethod.GET)
	public ResponseEntity<String> subject() throws JsonProcessingException {
		List<Subject> list = subjectService.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writerWithView(SubjectJsonView.Public.class).writeValueAsString(list);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	// * @return list of all subject
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/schoolyear", method = RequestMethod.GET)
	public ResponseEntity<String> schoolYear() throws JsonProcessingException {
		List<String> list = markService.findDistinctSchoolyear();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writeValueAsString(list);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ResponseEntity<String> search(@RequestParam(value = "table", required = false) String table,
			@RequestParam(value = "q", required = false) String q, HttpServletResponse response) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
		if (table.equalsIgnoreCase("user")) {
			List<User> usersearch = userService.findUserByUsernameLike("%" + q + "%");
			System.out.println("query in :" + table + " with :" + q + " :" + usersearch.size());
			String result = mapper.writerWithView(UserJsonView.Public.class).writeValueAsString(usersearch);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} else if (table.equalsIgnoreCase("student")) {
			List<Student> stdsearch = studentService.findByStudentnameContaining("%" + q + "%");
			System.out.println("query in :" + table + " with :" + q + " :" + stdsearch.size());

			String result = mapper.writerWithView(StudentsOfClassJsonView.Public.class).writeValueAsString(stdsearch);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		}

		return new ResponseEntity<String>("No result", HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/class/{id}/student", method = RequestMethod.GET)
	public ResponseEntity<String> userById(@PathVariable int id) throws JsonProcessingException {
		Classroom classroom = classService.findById(id);
		if (classroom == null) {
			return new ResponseEntity<String>("No result", HttpStatus.NO_CONTENT);
		} else {
			ObjectMapper mapper = new ObjectMapper();
			mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			String result = mapper.writerWithView(ClassHasStudentJsonView.Public.class).writeValueAsString(classroom);
			System.out.println("class " + id + ":" + result);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		}
	}

	// add students to class
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/class/{id}/student/add", method = RequestMethod.POST)
	public ResponseEntity<String> addStudentsToClass(@PathVariable int id, @RequestBody List<Student> liststd)
			throws JsonProcessingException, URISyntaxException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
		String result = mapper.writeValueAsString(liststd);
		System.out.println(result);
		studentService.addListStudent(id, liststd);
		// HttpHeaders headers = new HttpHeaders();
		// final URI newurl = new URI("/api/class/" + id + "/student");
		// headers.setLocation(newurl);
		// return new ResponseEntity<String>(headers, HttpStatus.OK);

		Classroom classroom = classService.findById(id);
		if (classroom == null) {
			return new ResponseEntity<String>("No result", HttpStatus.NO_CONTENT);
		} else {
			String result1 = mapper.writerWithView(ClassHasStudentJsonView.Public.class).writeValueAsString(classroom);
			return new ResponseEntity<String>(result1, HttpStatus.OK);
		}
	}

	// minus student of classroom
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/class/{id}/student/minus", method = RequestMethod.PUT)
	public ResponseEntity<String> minus(@PathVariable int id, @RequestBody Student std) throws JsonProcessingException {
		System.out.println("minus std:" + std.getStudentname());
		Classroom classroom = classService.findById(id);
		if (classroom == null) {
			System.out.println("class null");
			return new ResponseEntity<String>("No result", HttpStatus.NO_CONTENT);
		} else {
			ObjectMapper mapper = new ObjectMapper();
			mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

			String result = mapper.writerWithView(ClassHasStudentJsonView.Public.class).writeValueAsString(classroom);
			System.out.println("std of class " + id + ":" + result);
			Set<Student> liststd = classroom.getStudents();
			for (Student stock : liststd) {
				if (stock.getStudentid() == std.getStudentid()) {
					liststd.remove(stock);
					break;
				}
			}
			classroom.setStudents(liststd);
			String result1 = mapper.writerWithView(ClassHasStudentJsonView.Public.class).writeValueAsString(classroom);
			System.out.println("std of class after minus " + id + ":" + result1);
			classService.save(classroom);
			return new ResponseEntity<String>(result1, HttpStatus.OK);
		}
	}

	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/student/{id}/{time}", method = RequestMethod.GET)
	public ResponseEntity<String> rollCallByStudentId(@PathVariable int id, @PathVariable String time)
			throws JsonProcessingException {
		List<Rollcall> rollcalls = rollcallService.findByStudentidnameAndTimeContaining(id, time);
		if (rollcalls == null) {
			return new ResponseEntity<String>("No result", HttpStatus.NO_CONTENT);
		} else {
			ObjectMapper mapper = new ObjectMapper();
			mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			String result = mapper.writerWithView(RollCallJsonView.Public.class).writeValueAsString(rollcalls);
			System.out.println(result);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		}
	}

	// mark of student
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/student/{id}/mark", method = RequestMethod.GET)
	public ResponseEntity<String> markByStudentId(@PathVariable int id) throws JsonProcessingException {
		List<Mark> mark = markService.findByStudentId(id);
		if (mark == null) {
			return new ResponseEntity<String>("No result", HttpStatus.NO_CONTENT);
		} else {
			ObjectMapper mapper = new ObjectMapper();
			mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			String result = mapper.writerWithView(MarkJsonView.Public.class).writeValueAsString(mark);
			System.out.println("mark" + result);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		}
	}

	// mark of student
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/student/{id}/mark/search", method = RequestMethod.GET)
	public ResponseEntity<String> searchMarkOfStudent(@PathVariable int id, @RequestParam String query)
			throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, String> map = new HashMap<String, String>();
		// convert JSON string to Map
		map = mapper.readValue(query, new TypeReference<Map<String, String>>() {
		});

		List<Mark> mark = markService.findByStudentidAndSubjectAndSchoolyearAndSemester(id, map.get("subjectid"),
				map.get("schoolyear"), map.get("semester"));
		if (mark == null) {
			return new ResponseEntity<String>("No result", HttpStatus.NO_CONTENT);
		} else {
			mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			String result = mapper.writerWithView(MarkJsonView.Public.class).writeValueAsString(mark);
			System.out.println("mark search:" + result);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		}

	}

	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/delete/{table}/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> delete(@PathVariable String table, @PathVariable int id)
			throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
		if (table.equalsIgnoreCase("user")) {
			User appUser = userService.findOneById(id);
			String result = mapper.writerWithView(UserJsonView.Public.class).writeValueAsString(appUser);
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			String loggedUsername = auth.getName();
			if (appUser == null) {
				return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
			} else if (appUser.getUsername().equalsIgnoreCase(loggedUsername)) {
				throw new RuntimeException("You cannot delete your account");
			} else {
				userService.delete(appUser);
				return new ResponseEntity<String>(result, HttpStatus.OK);
			}

		} else if (table.equalsIgnoreCase("student")) {
			Student std = studentService.findByStudentid(id);
			String result = mapper.writerWithView(StudentsOfClassJsonView.Public.class).writeValueAsString(std);
			if (std == null) {
				return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
			} else {
				studentService.delete(std);
				return new ResponseEntity<String>(result, HttpStatus.OK);
			}
		} else if (table.equalsIgnoreCase("classroom")) {
			Classroom std = classService.findByClassId(id);
			String result = mapper.writerWithView(StudentsOfClassJsonView.Public.class).writeValueAsString(std);
			if (std == null) {
				return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
			} else {
				classService.delete(std);
				return new ResponseEntity<String>(result, HttpStatus.OK);
			}
		}
		return new ResponseEntity<String>(HttpStatus.NO_CONTENT);

	}

	//
	// /**
	// * Web service for getting a user by his ID
	// *
	// * @param id appUser ID
	// * @return appUser
	// */
	// @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	// @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	// public ResponseEntity<AppUser> userById(@PathVariable Long id) {
	// AppUser appUser = appUserRepository.findOne(id);
	// if (appUser == null) {
	// return new ResponseEntity<AppUser>(HttpStatus.NO_CONTENT);
	// } else {
	// return new ResponseEntity<AppUser>(appUser, HttpStatus.OK);
	// }
	// }
	//
	// /**
	// * Method for deleting a user by his ID
	// *
	// * @param id
	// * @return
	// */
	// @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	// @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	// public ResponseEntity<AppUser> deleteUser(@PathVariable Long id) {
	// AppUser appUser = appUserRepository.findOne(id);
	// Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	// String loggedUsername = auth.getName();
	// if (appUser == null) {
	// return new ResponseEntity<AppUser>(HttpStatus.NO_CONTENT);
	// } else if (appUser.getUsername().equalsIgnoreCase(loggedUsername)) {
	// throw new RuntimeException("You cannot delete your account");
	// } else {
	// appUserRepository.delete(appUser);
	// return new ResponseEntity<AppUser>(appUser, HttpStatus.OK);
	// }
	//
	// }
	//
	// /**
	// * Method for adding a appUser
	// *
	// * @param appUser
	// * @return
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/user/create", method = RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User appUser) {
		if (userService.findOneByUsername(appUser.getUsername()) != null) {
			throw new RuntimeException("Username already exist");
		}
		return new ResponseEntity<User>(userService.save(appUser), HttpStatus.CREATED);
	}

	// create classroom
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/class/create", method = RequestMethod.POST)
	public ResponseEntity<Classroom> createUser(@RequestBody Classroom classroom) {
		Classroom dub = classService.findByClassnameAndSchoolyear(classroom.getClassname(), classroom.getSchoolyear());
		if (dub != null) {
			throw new RuntimeException("Class already exist");
		}
		return new ResponseEntity<Classroom>(classService.save(classroom), HttpStatus.CREATED);
	}

	// update classroom
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/class/update", method = RequestMethod.PUT)
	public Classroom updateClass(@RequestBody Classroom classroom) {
		Classroom dub = classService.findByClassnameAndSchoolyear(classroom.getClassname(), classroom.getSchoolyear());
		if (dub != null && dub.getClassid() != classroom.getClassid()) {
			throw new RuntimeException("Class already exist");
		}
		return classService.save(classroom);
	}

	// create student
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/student/create", method = RequestMethod.POST)
	public ResponseEntity<Student> createStudent(@RequestBody Student appUser) throws JsonProcessingException {

		if (userService.findOneByUsername(appUser.getUser().getUsername()) != null) {
			throw new RuntimeException("Username already exist");
		}

		User user = userService.save(appUser.getUser());
		appUser.setUser(user);
		Student std = studentService.save(appUser);

		int id = 0;
		for (Classroom stock : appUser.getClassrooms()) {
			id = stock.getClassid();
		}
		Classroom room = classService.findById(id);
		room.getStudents().add(std);
		classService.save(room);

		return new ResponseEntity<Student>(std, HttpStatus.CREATED);
	}

	// add list users

	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/listusers", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<String> createListUser(@RequestBody List<User> appUser) throws JsonProcessingException {
		// for (User user : appUser) {
		// if (userService.findOneByUsername(user.getUsername()) != null) {
		// throw new RuntimeException("Username already exist:" + user.getUsername());
		// } else {
		// userService.save(user);
		// }
		// }
		userService.addListStudent(appUser);
		List<User> list = appUserRepository.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);

		String result = mapper.writerWithView(UserJsonView.Public.class).writeValueAsString(list);
		return new ResponseEntity<String>(result, HttpStatus.OK);

	}

	// /**
	// * Method for editing an user details
	// *
	// * @param appUser
	// * @return modified appUser
	// */
	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/user/update", method = RequestMethod.PUT)
	public User updateUser(@RequestBody User appUser) {
		if (userService.findOneByUsername(appUser.getUsername()) != null
				&& userService.findOneByUsername(appUser.getUsername()).getId() != appUser.getId()) {
			throw new RuntimeException("Username already exist");
		}
		return userService.save(appUser);
	}

	@PreAuthorize("hasAuthority('school')")
	@RequestMapping(value = "/student/update", method = RequestMethod.PUT)
	public void updateStudent(@RequestBody Student student) {
		// System.out.println("std id"+student.getStudentid());
		Student std = studentService.findByStudentid(student.getStudentid());
		student.setUser(std.getUser());

		studentService.save(student);
	}
}
