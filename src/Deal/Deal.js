import React, { Component } from 'react';
import {TextField, RadioButton, RadioButtonGroup, SelectField, MenuItem, RaisedButton} from 'material-ui';
import InputMask from 'react-input-mask';

import Person from '../Person/Person';
import { connect } from "react-redux";

import { Redirect } from "react-router";


class Deal extends Component
{
	constructor(props)
	{
		super(props);
		this.state={typeOfDeal:'product',
	                dealMemberType:'customer',
	                personNum:0,
	                persons:this.props.persons,
	                // persons:[
	                /*{lastName:'Melnikov',
	                 firstName:'Eugene',
	                 middleName:'Leonidovich',
	                 dateOfBirth:new Date(1986,10,28)},
	                 {lastName:'Ivanov',
	                 firstName:'Petr',
	                 middleName:'Alexandrovich',
	                 dateOfBirth:new Date(1981,11,18)},
	                 {lastName:'Panov',
	                 firstName:'Alexander',
	                 middleName:'Vladimirovich',
	                 dateOfBirth:new Date(1976,1,2)},*/
	                // ],
	                addPersonModeOn:false,
	                positionNameCtrlError:'',
	                positionDescriptionCtrlError:'',
	                positionDescription:'',
	                positionName:'',
	                isDealSaved:false,
	                isPersonCreatedInDeal:false
	            };

	    this.isPersonCreatedInDealOn.bind(this);

	}

	ComponentWillUpdate()
	{
		this.setState({persons:this.props.persons});
	}
	
	handlePersonNumChange(e,index,value)
	{
		this.setState({personNum:value});
	}

	getPersonsMenuItems()
	{
		return this.state.persons.map((item,index)=>{
			return <MenuItem value={index} key={index} primaryText={item.lastName}/>
		});
	}

	btnAddPersonClick()
	{
		this.setState({addPersonModeOn:true});
	}

	cancelBtnClick()
	{
		this.setState({addPersonModeOn:false});
	}

	positionNameChange(e)
	{
		this.setState({positionName:e.target.value});
	}

	positionDescriptionChange(e)
	{
		this.setState({positionDescription:e.target.value});
	}

	isPersonCreatedInDealOn()
	{
		//this.setState({isPersonCreatedInDeal:true});
		console.log('isPersonCreatedInDealOn');
		console.log(this);
	}

	validationTest()
	{
		var errMsg='';
		
        var positionNameMatch, positionDescriptionMatch;

		positionNameMatch=this.state.positionName.match(/^\w+/g);
		if (positionNameMatch==null) 
		{
			this.setState({positionNameCtrlError:'Название должно содержать хотя бы один символ!'});
            errMsg+='\nНазвание должно содержать хотя бы один символ!';
			//throw new Error('Фамилия должна состоять из минимум двух букв русского или английского алфавита!');
		}
		else 
		{
			this.setState({positionNameCtrlError:''});	
		}
		//console.log('lastNameMatch',lastNameMatch);

		positionDescriptionMatch=this.state.positionDescription.match(/\w+/g);
		console.log('positionDescriptionMatch');
		console.log(positionDescriptionMatch);
		if (positionDescriptionMatch.length<4) 
		{
			this.setState({positionDescriptionCtrlError:'Описание должно содержать минимум 4 слова!'});
			//throw new Error('Имя должно состоять из минимум двух букв русского или английского алфавита!');
			errMsg+='\nОписание должно содержать минимум 4 слова!';
		}
		else 
		{
			this.setState({positionDescriptionCtrlError:''});	
		}

		
        errMsg+=this.state.positionNameCtrlError+this.state.positionDescriptionCtrlError;
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
		this.saveDealToStore();
	}

	saveDealToStore()
	{
		const deal={
			typeOfDeal:this.state.typeOfDeal,
			dealMemberType:this.state.dealMemberType,
			person:this.state.persons[this.state.personNum],
			positionName:this.state.positionName,
			positionDescription:this.state.positionDescription
		};
		this.props.onAddDeal(deal);
		console.log('Сделка сохранена:')
		console.log(deal);
		this.setState({isDealSaved:true});
	}

	static getDerivedStateFromProps(nextProps, prevState)
	{
		if (nextProps.persons.length>prevState.persons.length)
			return {persons: nextProps.persons,
			        addPersonModeOn:!prevState.addPersonModeOn};
	}

	typeOfDealChange(event,value)
	{
		this.setState({typeOfDeal:value});
	}

	dealMemberTypeChange(event,value)
	{
		this.setState({dealMemberType:value});
	}

	render()
	{   
		console.log('persons:');
		console.log(this.state.persons);

		console.log('personNum:');
		console.log(this.state.personNum);

		console.log("PersonsMenuItems");
		console.log(this.getPersonsMenuItems());
        
		console.log('this.state.addPersonModeOn');
        console.log(this.state.addPersonModeOn);
        this.state.isPersonCreatedInDeal===true ? this.setState({personNum:--this.state.persons.length}) : null;
		return (<div>
					{(this.state.isDealSaved===true) ? <Redirect to="/"/> : null}
					<span>Тип сделки:</span>
					<RadioButtonGroup defaultSelected={this.state.typeOfDeal} 
					                  name="typeOfDeal"
					                  onChange={this.typeOfDealChange.bind(this)}
					                  disabled={this.state.addPersonModeOn}>
						<RadioButton value="product" label="Товар" disabled={this.state.addPersonModeOn}/>
						<RadioButton value="service" label="Услуга" disabled={this.state.addPersonModeOn}/>
					</RadioButtonGroup>
					<span>Ваша роль в сделке:</span>
					<RadioButtonGroup defaultSelected={this.state.dealMemberType} 
					                  name="dealMemberType"
					                  onChange={this.dealMemberTypeChange.bind(this)}
					                  disabled={this.state.addPersonModeOn}>
						<RadioButton value="customer" label="Покупатель" disabled={this.state.addPersonModeOn}/>
						<RadioButton value="vendor" label="Продавец" disabled={this.state.addPersonModeOn}/>
					</RadioButtonGroup>
					<SelectField floatingLabelText="Вы будете участвовать в сделке как:"
                                 value={this.state.personNum}
                                 onChange={this.handlePersonNumChange.bind(this)}
                                 style={{width:"300px"}}
                                 disabled={this.state.addPersonModeOn}>
                                 {
                                 	this.state.persons.map((item,index)=>{
											return <MenuItem value={index} key={index} primaryText={item.person.lastName}/>
										})
                                 }
					</SelectField><br/>
					{
						this.state.addPersonModeOn === true ? <Person method={this.isPersonCreatedInDealOn}/>
						                                                : <RaisedButton label="Добавить физическое лицо"
			    	                                                                    onClick={this.btnAddPersonClick.bind(this)}/>
			    	}<br/>
			    	<TextField errorText={this.state.positionNameCtrlError}
			    	           floatingLabelText={this.state.typeOfDeal=="product" ? "Название товара" : "Название услуги"}
			    	           floatingLabelFixed={true}
			    	           onChange={this.positionNameChange.bind(this)}
			    	           value={this.state.positionName}
			    	           disabled={this.state.addPersonModeOn}/><br/>
			    	<TextField errorText={this.state.positionDescriptionCtrlError}
			    	           floatingLabelText={this.state.typeOfDeal=="product" ? "Описание товара" : "Описание услуги"}
			    	           floatingLabelFixed={true}
			    	           onChange={this.positionDescriptionChange.bind(this)}
			    	           value={this.state.positionDescription}
			    	           disabled={this.state.addPersonModeOn}/><br/>
			    	<RaisedButton 
			    	         label="Сохранить"
			    	         onClick={this.btnSaveClick.bind(this)}
			    	         disabled={this.state.addPersonModeOn}/><br/>

		       </div>);
	}
}

export default connect(
	state=>({persons:state.persons}),
	dispatch=>({
		onAddDeal:(deal)=>{
			const payload={id: Date.now().toString(),
			               deal};
			dispatch({type:'ADD_DEAL',payload});
		},
	})
	)(Deal);