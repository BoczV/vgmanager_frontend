import React, { useContext } from "react";
import {
  sendDeleteRequest,
  sendAddRequest,
  sendUpdateRequest,
} from "../../../../Services/VariableGroupService";

import {
  OnDeleteContext,
  OnAddContext,
  OnUpdateContext,
  MessageContext,
  NewKeyContext,
  NewValueContext,
  TableTypeContext,
  VariableGroupsContext,
} from "../../../../contexts/Contexts";

const ActionButtons = () => {
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { variableGroups } = useContext(VariableGroupsContext);
  const { tableType } = useContext(TableTypeContext);
  const { onAdd, setOnAdd } = useContext(OnAddContext);
  const { onUpdate, setOnUpdate } = useContext(OnUpdateContext);
  const { message } = useContext(MessageContext);
  const { newKey } = useContext(NewKeyContext);
  const { newValue } = useContext(NewValueContext);

  const deleteVariables = () => {
    sendDeleteRequest(message, "", setOnDelete);
  };

  const addVariables = () => {
    sendAddRequest(message, newKey, newValue, "", setOnAdd);
  };

  const updateVariables = () => {
    console.log(newValue);
    console.log(message);
    sendUpdateRequest(message, newValue, "", setOnUpdate);
  };

  return (
    <>
      {tableType === "VG" && variableGroups.length > 0? (
        onDelete | onAdd | onUpdate ? (
          <div>
            <p>
              Are you sure you want to{" "}
              {onDelete ? "delete" : onAdd ? "add" : "update"} variables?
            </p>
            <br />
            <button
              onClick={() => {
                if (onDelete) {
                  deleteVariables();
                } else if (onAdd) {
                  addVariables();
                } else {
                  updateVariables();
                }
              }}
            >
              Yes
            </button>
            <button>No</button>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default ActionButtons;