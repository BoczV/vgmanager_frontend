import React, { useContext, useEffect, useState } from "react";
import { sendListVariablesRequest } from "../../../../services/VariableGroupServices/VariableGroupService";
import {
  PaginationCounterContext,
  SingleModificationContext,
  SingleOperationContext,
  ValueRegexContext,
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  KeyRegexContext,
  VariableGroupsContext,
  LoadingContext,
  KeyIsRegexContext,
} from "../../../../contexts/Contexts";
import "../../../../CSS/style.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VariableGroupBaseForm from "./VariableGroupBaseForm";
import {
  checkRequiredInputs,
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

import {
  Button,
  Box,
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

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
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { keyIsRegex, setKeyIsRegex } = useContext(KeyIsRegexContext);

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
      keyIsRegex: keyIsRegex,
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
    keyIsRegex,
  ]);

  const send = () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "getform");
    if (!incorrectFill) {
      sendListVariablesRequest(message, valueRegex, setVariableGroups);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <VariableGroupBaseForm />

      <Input
        fullWidth
        type="text"
        id="key_regex"
        name="key_regex"
        placeholder={"Key of variable"}
        value={keyRegex}
        onChange={(event) => setKeyRegex(event.target.value)}
      />
      <br />
      <br />

      <Input
        fullWidth
        type="text"
        id="value_regex"
        name="value_regex"
        placeholder={"Value (regex) of variable [OPTIONAL]"}
        value={valueRegex}
        onChange={(event) => setValueRegex(event.target.value)}
      />
      <br />
      <br />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => setSecretIncluded(e.target.checked)}
              value={secretIncluded}
              id="secretNeeded"
              name="secretNeeded"
            />
          }
          label="Secret included"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => setKeyIsRegex(e.target.checked)}
              value={keyIsRegex}
              id="keyRegexOrNot"
              name="keyRegexOrNot"
            />
          }
          label="Key's name should be regex"
        ></FormControlLabel>
      </FormGroup>
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

export default VariableGroupGetForm;
