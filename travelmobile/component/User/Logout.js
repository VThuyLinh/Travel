import { Button } from "react-native-paper"


const Logout =(navigation)=>{
    return (
        <Button title="Log out" onPress={()=>navigation.navigate("login")}/>
    )
}
export default Logout;