import React, { Component } from 'react';


class Home extends Component
{
	render()
	{
		return (
			    <p>
			    	Приветствую Вас в TestCRM! Приложение разработано на связке react+react-router+redux.
			    	В верхней части окна находится панель навигации, при помощи которой можно переключаться 
			    	между страницами создания новых записей о физлицах и сделках.
			    </p>
			    );
	}
}

export default Home;