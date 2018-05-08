export default function persons(state=[], action)
{
	if (action.type==='ADD_PERSON')
	{
		return [
					...state,
					action.payload
		        ];
	}

	return state;
}