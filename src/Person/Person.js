import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import InputMask from 'react-input-mask';

import { connect } from "react-redux";

import { Redirect } from "react-router";

class Person extends Component
{
	constructor(props)
	{
		super(props);
		this.state={lastName:'',
	                firstName:'',
	                middleName:'',
	                dateOfBirth:'',
	                firstNameCtrlError:'',
	                lastNameCtrlError:'', 
	                middleNameCtrlError:'',
	                dateOfBirthCtrlError:'',
	                isPersonSaved:false};
		console.log(this.state);
	}

	lastNameChange(e)
	{
		this.setState({lastName:e.target.value});
	}

	firstNameChange(e)
	{
		this.setState({firstName:e.target.value});
	}

	middleNameChange(e)
	{
		this.setState({middleName:e.target.value});
	}

	dateOfBirthChange(e)
	{
		this.setState({dateOfBirth:e.target.value});
	}

	validationTest()
	{
		var errMsg='';
		var errMsgDay='';
		var errMsgMonth='';
		var errMsgYear='';
        var lastNameMatch, firstNameMatch, middleNameMatch;
        var day, month, year;

		lastNameMatch=this.state.lastName.match(/^[А-ЯЁA-Z][а-яёa-z]+$/g);
		if (lastNameMatch==null) 
		{
			this.setState({lastNameCtrlError:'Фамилия должна состоять из минимум двух букв русского или английского алфавита! Первая буква должна быть заглавной!'});
            errMsg+='\nФамилия должна состоять из минимум двух букв русского или английского алфавита! Первая буква должна быть заглавной!';
			//throw new Error('Фамилия должна состоять из минимум двух букв русского или английского алфавита!');
		}
		else 
		{
			this.setState({lastNameCtrlError:''});	
		}
		//console.log('lastNameMatch',lastNameMatch);

		firstNameMatch=this.state.firstName.match(/^[А-ЯЁA-Z][а-яёa-z]+$/g);
		//console.log('firstNameMatch',firstNameMatch);
		if (firstNameMatch==null) 
		{
			this.setState({firstNameCtrlError:'Имя должно состоять из минимум двух букв русского или английского алфавита! Первая буква должна быть заглавной!'});
			//throw new Error('Имя должно состоять из минимум двух букв русского или английского алфавита!');
			errMsg+='\nИмя должно состоять из минимум двух букв русского или английского алфавита! Первая буква должна быть заглавной!';
		}
		else 
		{
			this.setState({firstNameCtrlError:''});	
		}

		middleNameMatch=this.state.middleName.match(/^[А-ЯЁA-Z][а-яёa-z]+$/g);
		//console.log('lastNameMatch',middleNameMatch);
		if ((middleNameMatch==null)&&(this.state.middleName!=''))
		{
			this.setState({middleNameCtrlError:'Отчество должно состоять из минимум двух букв русского или английского алфавита! Первая буква должна быть заглавной!'});
			//throw new Error('Отчество должно состоять из минимум двух букв русского или английского алфавита! Первая буква должна быть заглавной!');
			errMsg+='\nОтчество должно состоять из минимум двух букв русского или английского алфавита! Первая буква должна быть заглавной!';
		}
		else 
		{
			this.setState({middleNameCtrlError:''});	
		}

		day=this.state.dateOfBirth.slice(0,2);
		month=this.state.dateOfBirth.slice(3,5);
		year=this.state.dateOfBirth.slice(6,10);
		console.log('day',day);
		console.log('month',month);
		console.log('year',year);
        this.state.dateOfBirthCtrlError='';
        if ((day<1) || (day>31)) 
       	{
       		//this.setState({dateOfBirthCtrlError:'Ошибка при указании дня!'});
			//throw new Error('Ошибка при указании дня!');
			errMsgDay='\nОшибка при указании дня! ';
			this.state.dateOfBirthCtrlError+=errMsgDay;
			this.setState({dateOfBirthCtrlError:this.state.dateOfBirthCtrlError});
        }
        if ((month<1) || (month>12)) 
        {
        	//this.setState({dateOfBirthCtrlError:'Ошибка при указании месяца!'});
			//throw new Error('Ошибка при указании месяца!');
			errMsgMonth='\nОшибка при указании месяца! ';
			this.state.dateOfBirthCtrlError+=errMsgMonth;
			this.setState({dateOfBirthCtrlError:this.state.dateOfBirthCtrlError});
        }
        if ((year<1900) || (year>2018)) 
        {
        	//this.setState({dateOfBirthCtrlError:'Ошибка при указании года!'});
			//throw new Error('Ошибка при указании года!');
			errMsgYear='\nОшибка при указании года! ';
			this.state.dateOfBirthCtrlError+=errMsgYear;
			this.setState({dateOfBirthCtrlError:this.state.dateOfBirthCtrlError});
        }
        errMsg+=errMsgDay+errMsgMonth+errMsgYear;
        if (errMsg!='')
        {
        	throw new Error(errMsg);
        }
	}

	btnSaveClick()
	{
		try
		{
			this.validationTest();
		}
		catch(e)
		{
			console.log('error:');
			console.log(e);
			return;
		}
		console.log('Сохраняем');
		this.savePersonToStore();
	}

	savePersonToStore()
	{
		const person={
			lastName:this.state.lastName,
			firstName:this.state.firstName,
			middleName:this.state.middleName,
			dateOfBirth:new Date(this.state.dateOfBirth.slice(6,10),
				                 (parseInt(this.state.dateOfBirth.slice(3,5))-1),
				                 (parseInt(this.state.dateOfBirth.slice(0,2))+1),0,0,0)
		}
		this.props.onAddPerson(person);
		console.log('Физлицо сохранено:')
		console.log(person);
        this.setState({isPersonSaved:true});
        if (this.props.method!=null)
        {
        	this.props.method();
        }
	}

	

	render()
	{
		console.log('from route:');
		console.log(this.props.fromRoute);
		return (
			    <div>
			    	{((this.state.isPersonSaved===true)&&(this.props.fromRoute===true)) ? <Redirect to="/"/> : null}
			    	<TextField
			    		   errorText={this.state.lastNameCtrlError}
			    	       floatingLabelText="Фамилия"
			    	       floatingLabelFixed={true}
			    	       onChange={this.lastNameChange.bind(this)}
			    	       value={this.state.lastName}/><br/>

			    	<TextField
                           errorText={this.state.firstNameCtrlError}
			    	       floatingLabelText="Имя"
			    	       floatingLabelFixed={true}
			    	       onChange={this.firstNameChange.bind(this)}
			    	       value={this.state.firstName}/><br/>

			    	<TextField
			    	       errorText={this.state.middleNameCtrlError}
			    	       floatingLabelText="Отчество"
			    	       floatingLabelFixed={true}
			    	       onChange={this.middleNameChange.bind(this)}
			    	       value={this.state.middleName}/><br/>

			    	<TextField
			    	       errorText={this.state.dateOfBirthCtrlError}
			    	       floatingLabelText="Дата рождения"
			    	       errorStyle={{size:100}}
			    	       floatingLabelFixed={true}
			    	       onChange={this.dateOfBirthChange.bind(this)}
			    	       value={this.state.dateOfBirth}>
			    	       <InputMask mask="99.99.9999"/>
			    	</TextField><br/>
			    	<RaisedButton 
			    	         label="Сохранить"
			    	         onClick={this.btnSaveClick.bind(this)}/><br/>
			    </div>
			    );
	}
}

export default connect(
	state=>({}),
	dispatch=>({
		onAddPerson:(person)=>{
			const payload={id: Date.now().toString(),
			               person};
			dispatch({type:'ADD_PERSON',payload})
		}
	})
	)(Person);