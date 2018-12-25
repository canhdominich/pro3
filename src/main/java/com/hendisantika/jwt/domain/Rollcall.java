package com.hendisantika.jwt.domain;
// Generated Dec 18, 2018 10:00:44 PM by Hibernate Tools 5.2.8.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonView;
import com.hendisantika.jwt.jsonview.RollCallJsonView;

/**
 * Rollcall generated by hbm2java
 */
@Entity
@Table(name = "rollcall", catalog = "mydb1")
public class Rollcall implements java.io.Serializable {

	@JsonView(RollCallJsonView.Public.class)
	private int rollcalid;
	@JsonView(RollCallJsonView.Public.class)
	private Employee employee;
	@JsonView(RollCallJsonView.Public.class)
	private Student student;
	@JsonView(RollCallJsonView.Public.class)
	private String time;
	@JsonView(RollCallJsonView.Public.class)
	private String meal;
	@JsonView(RollCallJsonView.Public.class)
	private Boolean ischecked;

	public Rollcall() {
	}

	public Rollcall(Student student) {
		this.student = student;
	}

	public Rollcall(Employee employee, Student student, String time, String meal, Boolean ischecked) {
		this.employee = employee;
		this.student = student;
		this.time = time;
		this.meal = meal;
		this.ischecked = ischecked;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "rollcalid", unique = true, nullable = false)
	public Integer getRollcalid() {
		return this.rollcalid;
	}

	public void setRollcalid(Integer rollcalid) {
		this.rollcalid = rollcalid;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "employeerid")
	public Employee getEmployee() {
		return this.employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "studentid", nullable = false)
	public Student getStudent() {
		return this.student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	@Column(name = "time", length = 45)
	public String getTime() {
		return this.time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Column(name = "meal", length = 10)
	public String getMeal() {
		return this.meal;
	}

	public void setMeal(String meal) {
		this.meal = meal;
	}

	@Column(name = "ischecked")
	public Boolean getIschecked() {
		return this.ischecked;
	}

	public void setIschecked(Boolean ischecked) {
		this.ischecked = ischecked;
	}

}