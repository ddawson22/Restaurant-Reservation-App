import React from "react";


function Finish({ table, handleFinish }) {
   return (
     <button 
     data-table-id-finish={table.table_id}
     type="button" 
     onClick={handleFinish} 
     className="btn btn-light"
     >
       Finish
     </button>
   );
 }


 export default Finish;