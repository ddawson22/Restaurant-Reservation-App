import React from 'react';
 import ErrorAlert from './ErrorAlert';

function LoadDashboard({error}){
     return (
         <div>
             <ErrorAlert error={error} />
             <h1>Loading...</h1>
         </div>
     );

 }

 export default LoadDashboard;