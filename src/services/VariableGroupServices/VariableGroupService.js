import axios from "axios";
import {
  getBaseUrl,
  handleError,
  getResponseMessage,
  toastErrorPopUp,
  toastSuccessPopUp,
} from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getBaseUrl()}/VariableGroup`;

const sendListVariablesRequest = async (
  message,
  valueRegex,
  callbackForDataSaving
) => {
  await sendListRequest(message, valueRegex, "Get", callbackForDataSaving);
};

const sendListVariableGroupsRequest = async (
  message,
  valueRegex,
  callbackForDataSaving
) => {
  await sendListRequest(
    message,
    valueRegex,
    "GetVariableGroups",
    callbackForDataSaving
  );
};

const sendListRequest = async (
  message,
  valueRegex,
  endpoint,
  callbackForDataSaving
) => {
  let callbackForLoading = message["setLoading"];
  let url = `${variableGroupUrl}/${endpoint}`;
  callbackForLoading(true);
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups =
        endpoint === "GetVariableGroups"
          ? res.data.variableGroups
          : res.data.variables;
      callbackForLoading(false);
      if (status === 0) {
        callbackForDataSaving(variableGroups);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendRequest = async (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariables"];
  callbackForLoading(true);
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.variables;
      callbackForLoading(false);
      callback(false);
      let statusMessage = getResponseMessage(status);
      if (status === 0 || status === 1) {
        callbackForDataSaving(variableGroups);
        toastSuccessPopUp(statusMessage, "secret_requesting", 1500);
      } else {
        toastErrorPopUp(statusMessage, "variable_requesting", 1500);
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
      callback(false);
    });
};

const sendUpdateRequest = async (
  message,
  newValue,
  valueRegex,
  callbackForOnUpdate
) => {
  let body = buildRequestBody(message);
  body["newValue"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Update";
  await sendRequest(endpoint, body, callbackForOnUpdate, message);
};

const sendAddRequest = async (
  message,
  newKey,
  newValue,
  valueRegex,
  callbackForOnAdd
) => {
  let body = buildRequestBody(message);
  body["key"] = newKey;
  body["value"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Add";
  await sendRequest(endpoint, body, callbackForOnAdd, message);
};

const sendDeleteRequest = async (message, valueRegex, callbackForOnDelete) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Delete";
  await sendRequest(endpoint, body, callbackForOnDelete, message);
};

export {
  sendListVariablesRequest,
  sendListVariableGroupsRequest,
  sendAddRequest,
  sendDeleteRequest,
  sendUpdateRequest,
};
