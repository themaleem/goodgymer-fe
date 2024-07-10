import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";
import RegisteredSessions from "../../components/sessions/registeredSessions";

const RegisteredSessionsPage = ({ auth }) => {
  return (
    <DashboardLayout auth={auth}>
      <RegisteredSessions auth={auth} />
    </DashboardLayout>
  );
};

RegisteredSessionsPage.propTypes = {};

export default authWrapper(RegisteredSessionsPage);
