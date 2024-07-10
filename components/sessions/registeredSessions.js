import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { connect, useDispatch } from "react-redux";

import useSWR from "swr";
import SessionItem from "./SessionItem";
import { getPath } from "../../config/urls";
import { createStringifiedUrl } from "../../lib/objects";
import getSessions from "../../actions/sessions/getSessions";

const Sessions = ({ getSessions }) => {
  const dispatch = useDispatch();

  const baseUrl = useMemo(() => {
    return createStringifiedUrl(getPath("sessionsPath").as, {
      type: "for_registered",
    });
  }, []);

  const { data, mutate } = useSWR(baseUrl, getSessions);

  const mutateResources = () => mutate(baseUrl);

  const sessionsCount = Object.keys(data || {}).length;

  const renderSessionsList = () => {
    // @todo makeshift for now, review swr mutate promise
    // or write a custom mutate component to prevent rerender
    if (sessionsCount === 0 || !(data instanceof Array))
      return <p>No Sessions</p>;

    return (
      <>
        {data.map((session) => {
          return (
            <SessionItem
              key={session.id}
              session={session}
              dispatch={dispatch}
              mutateResources={mutateResources}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <h2>Registered Sessions</h2>
      {renderSessionsList()}
    </>
  );
};

Sessions.propTypes = {
  getSessions: PropTypes.func.isRequired,
};

export default connect(null, { getSessions })(Sessions);
