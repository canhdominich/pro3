package com.hendisantika.jwt.domain;
// Generated Dec 18, 2018 10:00:44 PM by Hibernate Tools 5.2.8.Final

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Announcement generated by hbm2java
 */
@Entity
@Table(name = "announcement", catalog = "mydb1")
public class Announcement implements java.io.Serializable {

	private Integer announcementid;
	private User user;
	private String title;
	private String content;
	private Date time;
	private Set<AnnouncementToUser> announcementToUsers = new HashSet<AnnouncementToUser>(0);

	public Announcement() {
	}

	public Announcement(User user, String title, String content, Date time,
			Set<AnnouncementToUser> announcementToUsers) {
		this.user = user;
		this.title = title;
		this.content = content;
		this.time = time;
		this.announcementToUsers = announcementToUsers;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "announcementid", unique = true, nullable = false)
	public Integer getAnnouncementid() {
		return this.announcementid;
	}

	public void setAnnouncementid(Integer announcementid) {
		this.announcementid = announcementid;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "fromuser")
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Column(name = "title", length = 45)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "content", length = 2000)
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Temporal(TemporalType.DATE)
	@Column(name = "time", length = 10)
	public Date getTime() {
		return this.time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "announcement")
	public Set<AnnouncementToUser> getAnnouncementToUsers() {
		return this.announcementToUsers;
	}

	public void setAnnouncementToUsers(Set<AnnouncementToUser> announcementToUsers) {
		this.announcementToUsers = announcementToUsers;
	}

}
