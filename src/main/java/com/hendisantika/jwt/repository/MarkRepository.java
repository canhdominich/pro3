package com.hendisantika.jwt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hendisantika.jwt.domain.Classroom;
import com.hendisantika.jwt.domain.Mark;
import com.hendisantika.jwt.domain.Student;
import com.hendisantika.jwt.domain.User;

/**
 * @author Hendi Santika
 *
 */
public interface MarkRepository extends JpaRepository<Mark, Long> {
	// public Classroom findOneByClassname(String username);

	public List<Mark> findAll();

	// List<Mark> findByNameContaining(String classname);

	// List<Mark> findByStudent(Student id);

	@Query("SELECT u FROM Mark u WHERE u.student.studentid = ?1")
	List<Mark> findByStudentId(int id);

	@Query("SELECT DISTINCT t.schoolyear FROM Mark t")
	List<String> findDistinctSchoolyear();

	@Query("SELECT t FROM Mark t WHERE t.student.studentid=?1 AND t.test.subject.subjectid=?2 AND t.schoolyear=?3 AND t.semester=?4")
	List<Mark> findByStudentidAndSubjectAndSchoolyearAndSemester(int id, int sub, String year, int se);
	
	@Query("SELECT t FROM Mark t WHERE t.student.studentid=?1 AND t.test.subject.subjectid=?2 AND t.schoolyear=?3")
	List<Mark> findByStudentidAndSubjectAndSchoolyear(int id, int sub, String year);
	
	@Query("SELECT t FROM Mark t WHERE t.student.studentid=?1 AND t.test.subject.subjectid=?2 AND t.semester=?3")
	List<Mark> findByStudentidAndSubjectAndSemester(int id, int sub, int se);
	
	@Query("SELECT t FROM Mark t WHERE t.student.studentid=?1 AND t.schoolyear=?2 AND t.semester=?3")
	List<Mark> findByStudentidAndSchoolyearAndSemester(int id, String year, int se);
	
	@Query("SELECT t FROM Mark t WHERE t.student.studentid=?1 AND t.test.subject.subjectid=?2")
	List<Mark> findByStudentidAndSubject(int id, int sub);
	
	@Query("SELECT t FROM Mark t WHERE t.student.studentid=?1 AND t.schoolyear=?2")
	List<Mark> findByStudentidAndSchoolyear(int id, String year);
	
	@Query("SELECT t FROM Mark t WHERE t.student.studentid=?1 AND t.semester=?2")
	List<Mark> findByStudentidAndSemester(int id, int se);

}
