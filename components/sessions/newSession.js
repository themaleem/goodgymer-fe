import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";

import TextArea from "../inputs/textarea";
import { getPath } from "../../config/urls";
import TextInput from "../inputs/textInput";
import DatePicker from "../inputs/datepicker";
import SelectInput from "../inputs/selectInput";
import { FORM_SUBSCRIPTION } from "../../config/form";
import createSession from "../../actions/sessions/createSession";
import { required, sessionTypes, supportedAreas } from "../../lib/objects";

const sessionsPath = getPath("sessionsPath").href;

const sessionTypeOptions = Object.values(sessionTypes);
const supportedAreaOptions = Object.values(supportedAreas);

const NewSession = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const data = {
      address: values.address,
      name: values.session_name,
      area_id: values.area_id.value,
      description: values.description,
      session_type: values.session_type.value,
      registration_limit: values.registration_limit,
      session_date_time: values.session_date_time[0],
    };

    return dispatch(createSession(data))
      .then(() => {
        return router.push(sessionsPath);
      })
      .catch();
  };

  return (
    <div className="container">
      <Form
        onSubmit={onSubmit}
        subscription={FORM_SUBSCRIPTION}
        render={({ submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <form onSubmit={handleSubmit} className="auth-form">
              <h2>Create Event</h2>
              <label htmlFor="event-name">Name</label>
              <Field
                id="name"
                type="text"
                name="session_name"
                component={TextInput}
              />
              <label htmlFor="event-description">Event Description</label>
              <Field
                name="description"
                validate={required}
                component={TextArea}
                placeholder="Session description"
              />
              <label htmlFor="event-type">Event Type</label>
              <Field
                clearable
                searchable
                name="session_type"
                validate={required}
                component={SelectInput}
                options={sessionTypeOptions}
                placeholder="Select Session Type"
              />

              <label htmlFor="event-city">City</label>

              <Field
                clearable
                searchable
                name="area_id"
                validate={required}
                component={SelectInput}
                options={supportedAreaOptions}
                placeholder="Select Area (City)"
              />

              <label htmlFor="event-name">Registration Limit</label>
              <Field
                id="name"
                type="number"
                component={TextInput}
                name="registration_limit"
              />

              <label htmlFor="event-date">Event Date</label>
              <Field
                withTime
                autoComplete={false}
                component={DatePicker}
                name="session_date_time"
                options={{ allowInput: true }}
              />

              <label htmlFor="event-address">Event Address</label>
              <Field
                name="address"
                validate={required}
                component={TextInput}
                placeholder="Address"
              />
              <button
                disabled={submitting || hasValidationErrors}
                type="submit"
              >
                Create Event
              </button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default NewSession;
