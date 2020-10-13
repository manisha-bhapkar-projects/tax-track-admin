import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

import { bindActionCreators } from "redux";
import { callDashboardAPI } from "../../actions/UserAction";

import { connect } from "react-redux";
import Users from "../Users/Users";
import Tasks from "../Tasks/Tasks";
import { getUserDetails } from "../../utils/storage";

const Dashboard = (props) => {
  const [dashboardCount, setDashboard] = useState("");

  useEffect(() => {
    dashboard();
  }, []);

  const dashboard = () => {
    props
      .callDashboardAPIAction()
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          setDashboard([]);
        } else {
          setDashboard(response.data.result);
        }
      })
      .catch(() => {
        setDashboard({});
      });
  };

  return (
    <>
      <div className="row">
        <Card
          title="USERS"
          value={dashboardCount.usersCount || "0"}
          dotClass="black-dot"
          colorName="Information of USERS"
        />
        <Card
          title="TASKS"
          value={dashboardCount.tasksCount || "0"}
          dotClass="black-dot"
          colorName="Information of TASKS"
        />
        {getUserDetails().role === 2 ? (
          <Card
            title="STAFF"
            value={dashboardCount.staffCount || "0"}
            dotClass="black-dot"
            colorName="Information of STAFF"
          />
        ) : (
          <></>
        )}
        <Card
          title="MESSAGES"
          value={dashboardCount.messageCount || "0"}
          dotClass="black-dot"
          colorName="Information of MESSAGES"
        />
        <Card
          title="JOB UNDER REVIEW"
          value={dashboardCount.job_under_review || "0"}
          dotClass="job-under-review-dot"
          colorName="BLUE"
        />
        <Card
          title="JOB UNDER QUERY"
          value={dashboardCount.job_in_query || "0"}
          dotClass="job-in-query-dot"
          colorName="YELLOW"
        />
        <Card
          title="JOB UNDER PROCESS"
          value={dashboardCount.job_in_progress || "0"}
          dotClass="job-in-progress-dot"
          colorName="ORANGE"
        />
        <Card
          title="JOB COMPLETED"
          value={dashboardCount.job_complete || "0"}
          dotClass="job-complete-dot"
          colorName="GREEN"
        />
        <Card
          title="JOB NOT STARTED"
          value={dashboardCount.job_not_started || "0"}
          dotClass="job-not-started-dot"
          colorName="RED"
        />
      </div>

      <Tasks tableLimit={5} />
      <Users tableLimit={5} />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callDashboardAPIAction: callDashboardAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Dashboard);
