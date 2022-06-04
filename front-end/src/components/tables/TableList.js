import React from "react";
 import Table from "./Table";

function TableList({tables}){
     const tableMap = tables.map((table) => <Table key={table.table_id} table={table} />);
     return (
         <table className="table">
         <thead>
           <tr>
             <th scope="col">#</th>
             <th scope="col">Name</th>
             <th scope="col">Capacity</th>
             <th scope="col">Reservation #</th>
             <th scope="col">Table Status</th>
           </tr>
         </thead>
         <tbody>{tableMap}</tbody>
       </table>
     );
 } 

 export default TableList;