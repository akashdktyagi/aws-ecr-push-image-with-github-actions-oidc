//import useState hook to create menu collapse state
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import {
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { GiDoctorFace } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./SideHeaderComponent.css";
import ButtonComponent from "../commoncontrols/ButtonComponent";

const SideHeaderComponent = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);
  const dispatchLogin = useDispatch();
    let navigate = useNavigate();

    const logOutHandle = () =>{
      sessionStorage.clear();
      dispatchLogin({type: 'logout'});
      navigate('/');
    }

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const gotoProfile = (actionname) =>{
    if(actionname === 'profile'){
        navigate('/userprofile');
    }else if(actionname === 'findDoctor'){
        navigate('/findadoctor');
    }else if(actionname === 'mybooking'){
        navigate('/mybooking');
    }
    
  }

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {/* <MenuItem active={true} icon={<FiHome />}>
                Home
              </MenuItem> */}
              <MenuItem icon={<CgProfile />} onClick={() => gotoProfile('profile')}><ButtonComponent variant={'primary'} btnName={'My Profile'} btnClass={'w-100'} /></MenuItem>
              <MenuItem icon={<GiDoctorFace />} onClick={() => gotoProfile('findDoctor')}><ButtonComponent variant={'success'} btnName={'Find a Doctor'} btnClass={'w-100'} /></MenuItem>
              <MenuItem icon={<TbBrandBooking />} onClick={() => gotoProfile('mybooking')}><ButtonComponent variant={'info'} btnName={'My Booking'} btnClass={'w-100'} /></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={()=> logOutHandle()}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideHeaderComponent;
