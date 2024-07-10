import Link from "next/link";
import PropTypes from "prop-types";

import { getPath } from "../../config/urls";
import useSignOut from "../../containers/hooks/useSignOut";

const sessionsPath = getPath("sessionsPath").href;
const newSessionPath = getPath("newSessionPath").href;
const registeredSessionPath = getPath("registeredSessionPath").href;

const DashboardLayout = ({ auth, children }) => {
  const { onSignOut } = useSignOut(auth);

  const onLogoutClick = async () => {
    onSignOut();
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Logo</div>
        <nav>
          <Link passHref href={sessionsPath}>
            All Sessions
          </Link>
          <Link passHref href={registeredSessionPath}>
            Registered Sessions
          </Link>
          <Link passHref href={newSessionPath}>
            Create New Session
          </Link>
        </nav>

        <button
          type="button"
          className="logout"
          onClick={onLogoutClick}
          disabled={auth.signingOut}
        >
          Logout
        </button>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default DashboardLayout;
