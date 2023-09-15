import React, { useContext, useEffect, useState } from "react";
import { sendListRequest } from "../../../../services/VariableGroupService";
import { ValueRegexContext } from "../../../../contexts/Contexts";
import "../../../../CSS/style.css";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  KeyRegexContext,
  VariableGroupsContext,
  LoadingContext,
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";

const VariableGroupGetForm = () => {
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setLoading } = useContext(LoadingContext);
  const { organizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(KeyRegexContext);
  const { valueRegex, setValueRegex } = useContext(ValueRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  const [secretIncluded, setSecretIncluded] = useState(false);

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      organizationName: organizationName,
      keyRegex: keyRegex,
      valueRegex: valueRegex,
      setLoading: setLoading,
      secretIncluded: secretIncluded,
    });
  }, [
    projectName,
    pat,
    vgRegex,
    keyRegex,
    valueRegex,
    organizationName,
    setLoading,
    setMessage,
    secretIncluded,
  ]);

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      sendListRequest(
        message,
        valueRegex,
        setVariableGroups,
        projectName === "All"
      );
    }
  };

  return (
      <div className="form">
        <VariableGroupBaseForm />

        <input
          type="text"
          id="key_regex"
          name="key_regex"
          placeholder={"Key (regex) of variable"}
          value={keyRegex}
          onChange={(event) => setKeyRegex(event.target.value)}
        />

        <input
          type="text"
          id="value_regex"
          name="value_regex"
          placeholder={"Value (regex) of variable [OPTIONAL]"}
          value={valueRegex}
          onChange={(event) => setValueRegex(event.target.value)}
        />
        <label className="checkbox-inline" htmlFor="secret_needed">
          Secret included:{" "}
        </label>

        <input
          type="checkbox"
          id="secretNeeded"
          name="secretNeeded"
          onChange={(e) => setSecretIncluded(e.target.checked)}
        />
        <br />
        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
  );
};

export default VariableGroupGetForm;
