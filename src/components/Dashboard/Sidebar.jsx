import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import SidebarMode from "../SidebarComponents/SidebarMode";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const [toggle3, setToggle3] = useState(false);

  const [expanded, setExpaned] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo" style={{ marginBottom: "2rem" }}>
          <img src={Logo} alt="logo" />
          <span>Aanchal</span>
        </div>
        <SidebarMode
          title="Focus Mode"
          toggle={toggle1}
          setToggle={setToggle1}
        />
        <SidebarMode
          title="Bed Time"
          toggle={toggle2}
          setToggle={setToggle2}
          repeat="no"
        />
        <SidebarMode
          title="App Lock"
          toggle={toggle3}
          setToggle={setToggle3}
          repeat="no"
          time="no"
        />
      </motion.div>
    </>
  );
};

export default Sidebar;
