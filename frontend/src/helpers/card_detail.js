export const is_owner = (is_owner,name)=>{
    if (is_owner){
       return "You"
    }
    else{
       return name
    }
 }

 export const is_owner_or_admin = (is_owner, is_admin = false) => {
    return is_owner || is_admin;
};