import React, { useState } from 'react';
import { completeTable } from "../../utils/api";
import Finish from "../FinishButton";
import ErrorAlert from "../../layout/ErrorAlert";
import {useHistory} from "react-router-dom"
import "./Tables.css";

 function Table({table}){
  const [error, setError] = useState(null);
   const history = useHistory();
   const handleFinish = async (event) => {
     event.preventDefault();
     try {
       if (
         window.confirm(
           "Is this table ready to seat new guests? This cannot be undone."
         )
       ) {
         await completeTable(table.table_id);
         history.go(0);
       }
     } catch (error) {
       setError(error);
     }
   };
   return (
     <>
       <ErrorAlert error={error} />
       <tr>
         <th scope="row">{table.table_id}</th>
         <td>{table.table_name}</td>
         <td>{table.capacity}</td>
         <td>{table.reservation_id}</td>
         <td data-table-id-status={table.table_id}>{table.reservation_id ? "occupied" : "free"}</td>
         <td>
           {table.reservation_id ? (
             <Finish table={table} handleFinish={handleFinish} />
           ) : null}
         </td>
       </tr>
     </>
   );
 }

export default Table;