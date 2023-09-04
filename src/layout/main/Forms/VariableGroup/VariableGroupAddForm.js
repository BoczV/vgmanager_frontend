import React, { useContext, useEffect, useState } from "react";
import { sendAddRequest } from "../../../../Services/VariableGroupService";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  LoadingContext,
  VariableGroupsContext,
  OnAddContext
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";

const VariableGroupAddForm = () => {
  const {setOnAdd} = useContext(OnAddContext);
  const {setLoading} = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { organizationName } = useContext(OrganizationContext);
  const { message, setMessage } = useContext(MessageContext);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const mandatoryFields = [pat, projectName, vgRegex, newKey, newValue];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      keyRegex: ".*",
      organizationName: organizationName,
      setLoading: setLoading,
      setVariableGroups: setVariableGroups
    });
  }, [
    projectName,
    pat,
    vgRegex,
    organizationName,
    setLoading,
    setVariableGroups,
    setMessage,
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
      sendAddRequest(message, newKey, newValue, "", setOnAdd);
    }
  };

  return (
    <div>
      <div id="form">
        <VariableGroupBaseForm/>
        
        <input
          type="text"
          id="new_key"
          name="new_key"
          placeholder={"New variable's key"}
          value={newKey}
          onChange={(event) => setNewKey(event.target.value)}
        />

        <input
          type="text"
          id="new_value"
          name="new_value"
          placeholder={"New variable's value"}
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
        />

        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
    </div>
  );
};

export default VariableGroupAddForm;
