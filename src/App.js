import './CSS/App.css';
import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./layout/main/Main";
import { LastChange } from "./layout/last_changes/LastChange";
import { 
  ActionTypeContext, 
  KeyRegexContext, 
  KeyVaultNameContext, 
  LoadingContext, 
  MessageContext, 
  OnAddContext, 
  OnDeleteContext, 
  OnUpdateContext, 
  OrganizationContext, 
  PATContext, 
  ProjectNameContext, 
  ProjectsContext, 
  SecretContext, 
  SecretRegexContext, 
  TableTypeContext, 
  VGAuthorizedContext, 
  VGRegexContext, 
  ValueRegexContext,
  VariableGroupsContext
 } from "./contexts/Contexts";

function App() {
  const [keyVaultName, setKeyVaultName] = useState("");
  const [actionType, setActionType] = useState("List");
  const [tableType, setTableType] = useState("KV");
  const [pat, setPat] = useState("");
  const [projectName, setProjectName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [valueRegex, setValueRegex] = useState("");
  const [vgRegex, setVgRegex] = useState("");
  const [secretRegex, setSecretRegex] = useState("");
  const [keyRegex, setKeyRegex] = useState("");
  const [variableGroups, setVariableGroups] = useState([]);
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [message, setMessage] = useState({});
  const [projects, setProjects] = useState([]);
  const [vgAuthorized, setVgAuthorized] = useState(false);

  return (
    <KeyVaultNameContext.Provider value={{keyVaultName, setKeyVaultName}}>
      <ActionTypeContext.Provider value={{actionType, setActionType}}>
        <TableTypeContext.Provider value={{tableType, setTableType}}>
          <PATContext.Provider value={{pat, setPat}}>
            <ProjectNameContext.Provider value={{projectName, setProjectName}}>
              <ValueRegexContext.Provider value={{valueRegex, setValueRegex}}>
                <VGRegexContext.Provider value={{vgRegex, setVgRegex}}>
                  <SecretRegexContext.Provider value={{secretRegex, setSecretRegex}}>
                    <KeyRegexContext.Provider value={{keyRegex, setKeyRegex}}>
                      <VariableGroupsContext.Provider value={{variableGroups, setVariableGroups}}>
                        <LoadingContext.Provider value={{ loading, setLoading }}>
                          <OnUpdateContext.Provider value={{onUpdate, setOnUpdate}}>
                            <OnAddContext.Provider value={{onAdd, setOnAdd}}>
                              <OnDeleteContext.Provider value={{onDelete, setOnDelete}}>
                                <SecretContext.Provider value={{secrets, setSecrets}}>
                                  <MessageContext.Provider value={{message, setMessage}}>
                                    <OrganizationContext.Provider value={{organizationName, setOrganizationName}}>
                                      <ProjectsContext.Provider value={{projects, setProjects}}>
                                      <VGAuthorizedContext.Provider value={{vgAuthorized, setVgAuthorized}}>
                                          <BrowserRouter>
                                            <Routes>
                                              <Route path="/" element={<Main/>}/>
                                              <Route path="/last-change" element={<LastChange/>}/>
                                            </Routes>
                                          </BrowserRouter>
                                        </VGAuthorizedContext.Provider>
                                      </ProjectsContext.Provider>
                                    </OrganizationContext.Provider>
                                  </MessageContext.Provider>
                                </SecretContext.Provider>
                              </OnDeleteContext.Provider>
                            </OnAddContext.Provider>
                          </OnUpdateContext.Provider>
                        </LoadingContext.Provider>
                      </VariableGroupsContext.Provider>
                    </KeyRegexContext.Provider>
                  </SecretRegexContext.Provider>
                </VGRegexContext.Provider>
              </ValueRegexContext.Provider>
            </ProjectNameContext.Provider>
          </PATContext.Provider>
        </TableTypeContext.Provider>
      </ActionTypeContext.Provider>
    </KeyVaultNameContext.Provider>
  );
}

export default App;
