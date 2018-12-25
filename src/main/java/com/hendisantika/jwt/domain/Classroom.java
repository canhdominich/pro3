package com.hendisantika.jwt.domain;
// Generated Dec 18, 2018 10:00:44 PM by Hibernate Tools 5.2.8.Final

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import com.hendisantika.jwt.jsonview.ClassHasStudentJsonView;
import com.hendisantika.jwt.jsonview.ClassJsonView;
import com.hendisantika.jwt.jsonview.StudentsOfClassJsonView;

/**
 * Classroom generated by hbm2java
 */
@Entity
@Table(name = "classroom", catalog = "mydb1")
public class Classroom implements java.io.Serializable {

	@JsonView({ ClassJsonView.Public.class, StudentsOfClassJsonView.Public.class,
			ClassHasStudentJsonView.Public.class })
	private Integer classid;
	@JsonView(ClassJsonView.Public.class)
	private String classname;
	@JsonView(ClassJsonView.Public.class)
	private Integer grade;
	@JsonView(ClassJsonView.Public.class)
	private String schoolyear;
	 @JsonView(ClassHasStudentJsonView.Public.class)
	private Set<Student> students = new HashSet<Student>(0);
	private Set<ClassroomHasEmployee> classroomHasEmployees = new HashSet<ClassroomHasEmployee>(0);
	private Set<ClassroomHasTeacher> classroomHasTeachers = new HashSet<ClassroomHasTeacher>(0);

	public Classroom() {
	}

	public Classroom(String classname, Integer grade, String schoolyear, Set<Student> students,
			Set<ClassroomHasEmployee> classroomHasEmployees, Set<ClassroomHasTeacher> classroomHasTeachers) {
		this.classname = classname;
		this.grade = grade;
		this.schoolyear = schoolyear;
		this.students = students;
		this.classroomHasEmployees = classroomHasEmployees;
		this.classroomHasTeachers = classroomHasTeachers;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "classid", unique = true, nullable = false)
	public Integer getClassid() {
		return this.classid;
	}

	public void setClassid(Integer classid) {
		this.classid = classid;
	}

	@Column(name = "classname", length = 45)
	public String getClassname() {
		return this.classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	@Column(name = "grade")
	public Integer getGrade() {
		return this.grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	@Column(name = "schoolyear", length = 45)
	public String getSchoolyear() {
		return this.schoolyear;
	}

	public void setSchoolyear(String schoolyear) {
		this.schoolyear = schoolyear;
	}

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "classroom_has_student", catalog = "mydb1", joinColumns = {
			@JoinColumn(name = "classid", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "studentid", nullable = false, updatable = false) })
	public Set<Student> getStudents() {
		return this.students;
	}

	public void setStudents(Set<Student> students) {
		this.students = students;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "classroom")
	public Set<ClassroomHasEmployee> getClassroomHasEmployees() {
		return this.classroomHasEmployees;
	}

	public void setClassroomHasEmployees(Set<ClassroomHasEmployee> classroomHasEmployees) {
		this.classroomHasEmployees = classroomHasEmployees;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "classroom")
	public Set<ClassroomHasTeacher> getClassroomHasTeachers() {
		return this.classroomHasTeachers;
	}

	public void setClassroomHasTeachers(Set<ClassroomHasTeacher> classroomHasTeachers) {
		this.classroomHasTeachers = classroomHasTeachers;
	}

}