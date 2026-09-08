import { useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Profile() {
  const savedProfile = JSON.parse(
    localStorage.getItem("jobPortalProfile")
  );

  const [profile, setProfile] = useState(
    savedProfile || {
      name: "Manisha Upprety",
      email: "manisha@example.com",
      phone: "9876543210",
      location: "Guwahati, Assam",
      role: "Web Developer",
      skills: "HTML, CSS, JavaScript, React",
      bio: "BCA student interested in web development and modern technologies.",
    }
  );

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "jobPortalProfile",
      JSON.stringify(profile)
    );

    setEditing(false);

    alert("Profile saved successfully!");
  };

  return (
    <section className="profile-page">

      {/* Sprint 7 - Reusable PageTitle */}
      <PageTitle
        title="My Profile"
        subtitle="Manage your professional information and keep your profile updated."
      />

      {/* Profile Header */}
      <div className="profile-header">

        <div className="profile-avatar">
          {profile.name.charAt(0)}
        </div>

        <div>
          <p className="small-title">MY PROFILE</p>
          <h1>{profile.name}</h1>
          <p>{profile.role}</p>
        </div>

        {/* Sprint 7 - Reusable Button */}
        <Button
          onClick={() =>
            editing
              ? saveProfile()
              : setEditing(true)
          }
        >
          {editing ? "Save Profile" : "Edit Profile"}
        </Button>

      </div>

      {/* Sprint 7 - Reusable Card */}
      <Card
        title="Personal Information"
        description="Update your personal and professional details."
      >

        <div className="profile-grid">

          <div className="input-group">
            <label>Full Name</label>

            <input
              name="name"
              value={profile.name}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Phone</label>

            <input
              name="phone"
              value={profile.phone}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Location</label>

            <input
              name="location"
              value={profile.location}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Professional Role</label>

            <input
              name="role"
              value={profile.role}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Skills</label>

            <input
              name="skills"
              value={profile.skills}
              disabled={!editing}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="input-group">

          <label>About Me</label>

          <textarea
            name="bio"
            rows="5"
            value={profile.bio}
            disabled={!editing}
            onChange={handleChange}
          />

        </div>

      </Card>

    </section>
  );
}

export default Profile;