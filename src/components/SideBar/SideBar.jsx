import React from "react";
import { sidebarMenu } from "./SidebarNavigation";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SideBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      {/* sidebar menu */}
      <div className="space-y-8 pl-5 ">
        <div>
          <span className="logo font-bold text-xl ">QJ Social</span>
        </div>

        <div className="space-y-8 ">
          {sidebarMenu.map((item) => (
            <div className="cursor-pointer flex space-x-3 items-center">
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Divider />

        {/* user widget */}
        <div className=" pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src="./logo192.png" />
            <div>
              <p className="font-bold">Cheryl</p>
              <p className="opacity-70">@cheryl</p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default SideBar;
