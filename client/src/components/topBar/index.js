import {Box, IconButton, styled, useTheme} from "@mui/material";
import {useContext} from "react";
import {ColorModeContext, tokens} from "../../theme";
import {InputBase} from "@mui/material";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const SideBar = () => {
    const theme = useTheme();
    const color = tokens(theme.palette.mode);
    const colorMode= useContext(ColorModeContext)

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: color.primary["400"],
                    borderRadius: '3px'
                }}
            >
            </Box>
            {/*ICON*/}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode ==='dark'?(<DarkModeOutlinedIcon/>):(<LightModeOutlinedIcon/>)}
                </IconButton>
                <IconButton>
                    <PersonOutlineOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>)
}

export default SideBar
