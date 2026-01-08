import React, { useEffect, useState } from 'react';
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from '../../utils/useAxios';
import { API } from '../../utils/apiRoutes';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useAxios();

  useEffect(() => {
    api.get(API.INSTRUCTOR_STUDENTS).then(res => {
      setStudents(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          <Header />
          <div className="row mt-0 mt-md-4">
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <div className="card mb-4">
                <div className="p-4 d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="mb-0">My Students</h3>
                    <span>Students enrolled in your courses.</span>
                  </div>
                </div>
              </div>

              {loading && <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>}
              
              {!loading && students.length === 0 && (
                 <div className="alert alert-info">No students enrolled yet.</div>
              )}

              <div className="row">
                {students.map(student => (
                  <div className="col-lg-4 col-md-6 col-12" key={student.id}>
                    <div className="card mb-4 shadow-sm border-0">
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            src={student.image || "https://geeksui.codescandy.com/geeks/assets/images/avatar/avatar-1.jpg"} // Fallback if no specific image field
                            className="rounded-circle avatar-xl mb-3"
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            alt="avatar"
                          />
                          <h4 className="mb-1">{student.full_name || student.username}</h4>
                          <p className="mb-0 small text-muted">
                            <i className="fas fa-envelope me-1" /> {student.email}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between py-2 mt-4 fs-6 border-top">
                          <span>Joined</span>
                          <span className="text-dark">{new Date(student.date_joined).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Students;
