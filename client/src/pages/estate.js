import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { AiOutlineSync, AiOutlineCalendar } from "react-icons/ai";
import { BsFillGeoAltFill } from "react-icons/bs";
import Loading from "../components/Loading";

const Estate = () => {
  const [estates, setEstates] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEstate = () => {
      axios
        .get("/api/estate/real-estate")
        .then((response) => {
          setLoading(false);
          setEstates(response.data.estates);
          setUser(response.data.userData);
        })
        .catch((error) => console.log(error.message));
    };
    getEstate();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="Container_404">
          <Loading />
        </div>
      ) : (
        <div className="Container_about">
          <div className="user-content">
            <div className="real-user-card" style={{ paddingBottom: 20 }}>
              <div className="estate-item">
                <div>
                  <div style={{ marginBottom: 10 }}>
                    <img
                      src={user.profile_image_url}
                      style={{ width: 100, borderRadius: "50%" }}
                      alt="logo"
                    />
                  </div>
                  <div style={{ marginBottom: 0 }}>
                    <span
                      style={{ color: "black", fontWeight: 600, fontSize: 18 }}
                    >
                      {user.name}
                    </span>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <span
                      style={{
                        color: "#403d3d",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      @{user.screen_name}
                    </span>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <span
                      style={{ color: "black", fontWeight: 500, fontSize: 14 }}
                    >
                      {user.description}
                    </span>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <span
                      style={{
                        color: "black",
                        fontWeight: 600,
                        fontSize: 14,
                        marginRight: 10,
                      }}
                    >
                      <BsFillGeoAltFill
                        style={{ color: "black", marginRight: 3 }}
                      />
                      {user.location}
                    </span>
                    <span
                      style={{ color: "black", fontWeight: 600, fontSize: 14 }}
                    >
                      <AiOutlineCalendar
                        style={{ color: "black", marginRight: 3 }}
                      />
                      Joined {moment(user.created_at).format("MMMM YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="content"
            style={{ paddingTop: 30, paddingBottom: 30 }}
          >
            {estates.map((estate, index) => {
              return (
                <div className="real-estate-card" key={index}>
                  {estate.retweeted_status ? (
                    <div className="estate-item">
                      <div style={{ paddingBottom: 10, display: "flex" }}>
                        <AiOutlineSync
                          style={{ color: "#545151", marginRight: 3 }}
                        />
                        <span
                          style={{
                            color: "#545151",
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          Real Estate Retweeted
                        </span>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: 10 }}>
                          <img
                            src={estate.retweeted_status.user.profile_image_url}
                            style={{ width: 50, borderRadius: "50%" }}
                            alt="logo"
                          />
                        </div>
                        <div style={{ marginLeft: 10 }}>
                          <div>
                            <span
                              style={{
                                color: "black",
                                fontWeight: 600,
                                fontSize: 14,
                              }}
                            >
                              {estate.retweeted_status.user.name}
                            </span>
                            <span
                              style={{
                                color: "#1f1da1",
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              {" "}
                              @{estate.retweeted_status.user.screen_name}
                            </span>
                            <span
                              style={{
                                color: "black",
                                fontWeight: 600,
                                fontSize: 14,
                              }}
                            >
                              {" "}
                              {moment(
                                estate.retweeted_status.created_at
                              ).format("MMM DD YYYY")}
                            </span>
                          </div>

                          <div style={{ paddingTop: 10 }}>
                            <a
                              rel="noreferrer"
                              href={
                                estate.retweeted_status.entities.urls.length !==
                                0
                                  ? estate.retweeted_status.entities.urls[0]
                                      .expanded_url
                                  : "#"
                              }
                              style={{
                                textDecoration: "none",
                                color: "black",
                                fontSize: 14,
                              }}
                              target="_blank"
                            >
                              {estate.retweeted_status.text}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="estate-item">
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: 10 }}>
                          <img
                            src={estate.user.profile_image_url}
                            style={{ width: 50, borderRadius: "50%" }}
                            alt="logo"
                          />
                        </div>
                        <div style={{ marginLeft: 10 }}>
                          <div>
                            <span
                              style={{
                                color: "black",
                                fontWeight: 600,
                                fontSize: 14,
                              }}
                            >
                              {estate.user.name}
                            </span>
                            <span
                              style={{
                                color: "#1f1da1",
                                fontWeight: 600,
                                fontSize: 13,
                              }}
                            >
                              {" "}
                              @{estate.user.screen_name}
                            </span>
                            <span
                              style={{
                                color: "black",
                                fontWeight: 600,
                                fontSize: 14,
                              }}
                            >
                              {" "}
                              {moment(estate.created_at).format("MMM DD YYYY")}
                            </span>
                          </div>
                          <div style={{ paddingTop: 10 }}>
                            <a
                              href="#"
                              rel="noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "black",
                                fontSize: 14,
                              }}
                            >
                              {estate.text}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Estate;
