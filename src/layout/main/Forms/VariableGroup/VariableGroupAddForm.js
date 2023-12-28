import React, { useContext, useEffect } from "react";
import { sendListVariableGroupsRequest } from "../../../../services/VariableGroupServices/VariableGroupService";

import {
  PATContext,
  ProjectNameContext,
  VGNameRegexContext,
  OrganizationContext,
  MessageContext,
  LoadingContext,
  OnAddContext,
  VariableNewKeyContext,
  VariableNewValueContext,
  PaginationCounterContext,
  SingleOperationContext,
  SingleModificationContext,
  VariableKeyIsRegexContext,
  VariableGroupsContext,
  VariablesContext,
  ProfileNameContext,
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";
import {
  checkRequiredInputs,
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

import { Button, Box, Input } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VariableGroupAddForm = () => {
  const { setOnAdd } = useContext(OnAddContext);
  const { setLoading } = useContext(LoadingContext);
  const { setVariables } = useContext(VariablesContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGNameRegexContext);
  const { organizationName } = useContext(OrganizationContext);
  const { message, setMessage } = useContext(MessageContext);
  const { newKey, setNewKey } = useContext(VariableNewKeyContext);
  const { newValue, setNewValue } = useContext(VariableNewValueContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { setKeyIsRegex } = useContext(VariableKeyIsRegexContext);
  const { profileName } = useContext(ProfileNameContext);

  const mandatoryFields = [pat, projectName, vgRegex, newKey, newValue];

  useEffect(() => {
    let keyIsRegexHelper = true;
    setKeyIsRegex(keyIsRegexHelper);
    setMessage({
      projectName: projectName,
      pat: pat,
      userName: profileName,
      vgRegex: vgRegex,
      keyRegex: newKey,
      organizationName: organizationName,
      setLoading: setLoading,
      setVariables: setVariables,
      secretIncluded: false,
      keyIsRegex: keyIsRegexHelper,
    });
  }, [
    projectName,
    pat,
    vgRegex,
    organizationName,
    setLoading,
    setVariables,
    setKeyIsRegex,
    setMessage,
    profileName,
    newKey
  ]);

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "addform", 1500);
    if (!incorrectFill) {
      await sendListVariableGroupsRequest(message, "", setVariableGroups);
      setPaginationCounter(0);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setOnAdd(true);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <VariableGroupBaseForm />

      <Input
        fullWidth
        type="text"
        id="new_key"
        name="new_key"
        placeholder={"New variable's key"}
        value={newKey}
        onChange={(event) => setNewKey(event.target.value)}
      />
      <br />
      <br />

      <Input
        fullWidth
        type="text"
        id="new_value"
        name="new_value"
        placeholder={"New variable's value"}
        value={newValue}
        onChange={(event) => setNewValue(event.target.value)}
      />
      <br />
      <br />

      <Box>
        <Button id="submit_button" onClick={send} variant="contained">
          Send request
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default VariableGroupAddForm;
