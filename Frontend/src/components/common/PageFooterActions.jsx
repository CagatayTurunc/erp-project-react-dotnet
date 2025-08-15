import React, { useState } from 'react';
import { Box, Button, Paper, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// Component artık 'addMenuItems' adında bir prop alıyor.
export default function PageFooterActions({ addMenuItems = {} }) {
  const [mainAnchorEl, setMainAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const mainOpen = Boolean(mainAnchorEl);
  const subMenuOpen = Boolean(subMenuAnchorEl);

  const handleMainMenuClick = (event) => {
    setMainAnchorEl(event.currentTarget);
  };

  const handleSubMenuEnter = (event, subMenuKey) => {
    setSubMenuAnchorEl(event.currentTarget);
    setActiveSubMenu(subMenuKey);
  };

  const handleClose = () => {
    setMainAnchorEl(null);
    setSubMenuAnchorEl(null);
    setActiveSubMenu(null);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
    setActiveSubMenu(null);
  };

  // Eğer menü verisi yoksa veya boşsa, menüyü gösterme
  const hasMenu = addMenuItems.main && addMenuItems.main.length > 0;

  return (
    <Paper 
      elevation={3} 
      sx={{ p: 1, mt: 2, backgroundColor: '#f0f0f0', borderTop: '1px solid #ccc', display: 'flex', gap: 1 }}
    >
      {/* Diğer Butonlar */}
      <Button variant="contained" startIcon={<CheckIcon />} sx={{ backgroundColor: '#607d8b' }}>Seç</Button>
      
      {/* "Ekle" butonu artık menü verisi varsa gösteriliyor */}
      {hasMenu && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleMainMenuClick}
        >
          Ekle
        </Button>
        
      )}
      
      <Button variant="contained" startIcon={<EditIcon />}>Değiştir</Button>
      <Button variant="contained" startIcon={<SearchIcon />}>İncele</Button>
      <Button variant="contained" startIcon={<PrintIcon />} sx={{ backgroundColor: '#c62828' }}>Yazdır</Button>
      <Button variant="contained" startIcon={<MoreHorizIcon />} sx={{ backgroundColor: '#673ab7' }}>Diğer</Button>
      <Box sx={{ flexGrow: 1 }} /> 
      <Button variant="contained" startIcon={<CloseIcon />} sx={{ backgroundColor: '#757575' }}>Vazgeç</Button>
      
      {/* Ana "Ekle" Menüsü */}
      {hasMenu && (
        <Menu
          anchorEl={mainAnchorEl}
          open={mainOpen}
          onClose={handleClose}
        >
          {addMenuItems.main.map((item) => (
            <MenuItem
              key={item.label}
              onClick={!item.subMenuKey ? handleClose : undefined}
              onMouseEnter={item.subMenuKey ? (e) => handleSubMenuEnter(e, item.subMenuKey) : undefined}
            >
              <ListItemText>{item.label}</ListItemText>
              {item.subMenuKey && <ListItemIcon><ArrowRightIcon fontSize="small" /></ListItemIcon>}
            </MenuItem>
          ))}
        </Menu>
      )}

      {/* Alt Menü */}
      {hasMenu && activeSubMenu && (
        <Menu
          anchorEl={subMenuAnchorEl}
          open={subMenuOpen}
          onClose={handleSubMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          MenuListProps={{ onMouseLeave: handleSubMenuClose }}
        >
          {addMenuItems[activeSubMenu].map((subItem) => (
            <MenuItem key={subItem.label} onClick={handleClose}>
              {subItem.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Paper>
  );
}
