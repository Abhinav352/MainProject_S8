
import React from 'react'

const Veedu = () => {
    
        let user =localStorage.getItem("userType");
        console.log(user);
        if (user==='"volunteer"')
        {
      return (
        <div>
         user is volunteer
        </div>
      )
    }  
    else 
{
  return (
    <div>
     user is non-volunteer
    </div>
    )
  ;
}
  }

export default Veedu
