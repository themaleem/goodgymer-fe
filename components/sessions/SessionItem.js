import { useState } from "react";
import pluralize from "pluralize";
import PropTypes from "prop-types";

import { showNotification } from "../notification";
import { supportedAreas, sessionTypes } from "../../lib/objects";
import registerSession from "../../actions/sessions/registerSession";
import unregisterSession from "../../actions/sessions/unregisterSession";

const SessionItem = ({ dispatch, session, mutateResources }) => {
  const [registering, setRegistering] = useState(false);

  const handleRegisterSession = () => {
    setRegistering(true);
    const data = { id: session.id };

    return dispatch(registerSession(data))
      .then((res) => {
        const { error } = res.data;
        if (error) {
          showNotification({ detail: error });
        } else {
          showNotification({
            severity: "success",
            detail: "You have successfully registered for the session",
          });
          mutateResources();
        }
      })
      .catch((err) => {
        // showNotification({ detail: err });
      })
      .finally(() => setRegistering(false));
  };

  const handleUnRegisterSession = () => {
    setRegistering(true);
    const data = { id: session.id };

    return dispatch(unregisterSession(data))
      .then((res) => {
        showNotification({
          severity: "success",
          detail: "You have successfully unregistered for the session",
        });
        mutateResources();
      })
      .catch(() => {})
      .finally(() => setRegistering(false));
  };

  return (
    <div className="event-box">
      <div className="tags">
        <span className="tag">{supportedAreas[session.area_id].label}</span>
        <span className="tag">{sessionTypes[session.session_type].label}</span>
      </div>
      <h3>{session.name}</h3>
      <p>{session.description}</p>
      <p>{session.address}</p>
      <p>{session.date}</p>
      <p>
        {`${pluralize("person", session.registration_count, true)}`} registered
      </p>

      {session.is_registered ? (
        <button
          type="button"
          disabled={registering}
          onClick={handleUnRegisterSession}
        >
          Unregister
        </button>
      ) : (
        <button
          type="button"
          disabled={registering}
          onClick={handleRegisterSession}
        >
          Register
        </button>
      )}
    </div>
  );
};

SessionItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.instanceOf(Object).isRequired,
};

export default SessionItem;
