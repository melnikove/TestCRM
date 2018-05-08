import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, TextField, RaisedButton} from 'material-ui';
import { Link } from 'react-router-dom';

class Header extends Component
{
	render()
	{
		return (
			    <Toolbar>
			    	<ToolbarGroup firstChild={true}>
			    		<ToolbarTitle text="Test CRM" />
			    		<ToolbarSeparator />
			    		<Link to="/person"><RaisedButton label="Создать физлицо"/></Link>
			    		<ToolbarSeparator />
			    		<Link to="/deal"><RaisedButton label="Создать сделку"/></Link>
			    	</ToolbarGroup>
			    </Toolbar>
			    );
	}
}

export default Header;

