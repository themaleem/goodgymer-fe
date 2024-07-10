import Sessions from "../../components/sessions";
import authWrapper from "../../containers/hoc/authWrapper";
import DashboardLayout from "../../components/layout/dashboard";

const SessionsIndexPage = ({ auth }) => {
  return (
    <DashboardLayout auth={auth}>
      <Sessions auth={auth} />
    </DashboardLayout>
  );
};

SessionsIndexPage.propTypes = {};

export default authWrapper(SessionsIndexPage);
