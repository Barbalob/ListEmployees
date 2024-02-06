import { FC } from "react";
import srcMoon from  '../../assets/moon.svg';
import srcSun from '../../assets/sun.svg';
import Switch from "react-switch";

const MySwitch:FC<{
    mobile?:boolean
    flag:boolean
    handleChange:()=>void
}> = ({mobile=false,handleChange, flag}) => {
    return (
        <Switch 
            width={mobile? 47 : 55}
            height={mobile? 22.22 : 26}
            handleDiameter={mobile? 16 : 20}
            checkedIcon={false}
            uncheckedIcon={false}
            checkedHandleIcon={<div style={{width:'100%', height:'100%', display:'flex'}}><img style={{width:"80%", margin:'0 auto'}} src={srcMoon}></img></div>}
            uncheckedHandleIcon={<div style={{width:'100%', height:'100%', display:'flex'}}><img style={{width:"80%", margin:'0 auto'}} src={srcSun}></img></div>}
            offColor='#155DA4'
            onColor='#155DA4'
            onChange={handleChange} 
            checked={flag} 
        />
    );
};

export default MySwitch;