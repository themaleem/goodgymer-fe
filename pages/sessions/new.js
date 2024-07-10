import authWrapper from "../../containers/hoc/authWrapper";
import NewSession from "../../components/sessions/newSession";
import DashboardLayout from "../../components/layout/dashboard";

const SessionsIndexPage = ({ auth }) => {
  return (
    <DashboardLayout auth={auth}>
      <NewSession auth={auth} />
    </DashboardLayout>
  );
};

SessionsIndexPage.propTypes = {};

export default authWrapper(SessionsIndexPage);
