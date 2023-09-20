import React, { useContext, useState } from "react";
import { sendListSecretRequest } from "../../../../services/SecretService";
import KeyVaultBaseForm from "./BaseForms/KeyVaultBaseForm";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  LoadingContext,
  SecretContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  PaginationCounterContext,
  SingleModificationContext,
  SingleOperationContext,
} from "../../../../contexts/Contexts";
import { setOnSingleModificationBack, setSingleOperationBack } from "../../../../services/CommonService";

const KeyVaultGetForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const [deleted, setDeleted] = useState(false);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { setSingleOperation } = useContext(SingleOperationContext);

  const mandatoryFields = [
    tenantId,
    clientId,
    clientSecret,
    keyVaultName,
    secretRegex,
  ];

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });

    if (!incorrectFill) {
      let message = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        keyVaultName: keyVaultName,
        secretRegex: secretRegex,
      };

      sendListSecretRequest(message, setSecrets, setLoading, deleted);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <KeyVaultBaseForm />

      <input
        type="text"
        id="keyVaultName"
        name="keyVaultName"
        placeholder="Name of key vault"
        value={keyVaultName}
        onChange={(event) => setKeyVaultName(event.target.value)}
      />

      <input
        type="text"
        id="filter"
        name="filter"
        placeholder={"Secret name (regex)"}
        value={secretRegex}
        onChange={(event) => setSecretRegex(event.target.value)}
      />

      <label className="checkbox-inline" htmlFor="secret_needed">
        Get deleted secrets:{" "}
      </label>

      <input
        type="checkbox"
        id="getDeletedSecrets"
        name="getDeletedSecrets"
        onChange={(e) => setDeleted(e.target.checked)}
      />
      <br />

      <button id="submit_button" onClick={() => send()}>
        Send request
      </button>
    </div>
  );
};

export default KeyVaultGetForm;
