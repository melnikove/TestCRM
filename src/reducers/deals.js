export default function deals(state=[], action)
{
	if (action.type==='ADD_DEAL')
	{
		return [
					...state,
					action.payload
		        ];
	}

	return state;
}