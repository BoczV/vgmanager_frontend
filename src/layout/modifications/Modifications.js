import React, {useContext} from "react";
import { ModificationsForm } from "./Forms/ModificationsForm";
import { ModificationsTable } from "./Results/ModificationsTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChangesContext, PaginationCounterContext } from "../../contexts/Contexts";

export const Modifications = () => {
  const { setChanges } = useContext(ChangesContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        id="back_to_main"
        onClick={() => {
          setChanges([]);
          setPaginationCounter(0);
          navigate("/");
        }}
      >
        Back to main
      </Button>
      <ModificationsForm />
      <ModificationsTable />
    </>
  );
};
