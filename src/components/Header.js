import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [section, setSection] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://backend.not-a-boring-blog.net/category/list_categories/`)
      .then(response => {
        setSection(response.data); 
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
      });
  }, []);

  const handleClick = (category_name) => {
    console.log('Chip clicked!', category_name);
    navigate(`/posts/${category_name}`)
  };
  

  return (
    <React.Fragment>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{  justifyContent: 'space-evenly', overflowX: 'auto', mt: 2}}
      >
        {section.map((section) => (
          <Chip label={section.category_name} variant="outlined" color="primary" onClick={() => handleClick(section.category_name)} />
        ))}
      </Toolbar>
    </React.Fragment>
  );
}


export default Header;