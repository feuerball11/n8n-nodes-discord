import { INodeProperties } from 'n8n-workflow';

export const options: INodeProperties[] = [
	{
		displayName: 'Get from trigger channel',
		name: 'triggerChannel',
		type: 'boolean',
		required: false,
		displayOptions: {
			show: {
				type: ['messages'],
			},
		},
		default: false,
		description: `If active, the information acquired will be from the same channel were the workflow was triggered (but not replace the placeholder if there is one).`,
	},
	{
		displayName: 'Get from',
		name: 'channelId',
		required: false,
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getChannels',
		},
		displayOptions: {
			hide: {
				triggerChannel: [true]
			},
		},
		default: '',
		description: `Let you specify the text channels where you want to get information from. Your credentials must be set and the bot running, you also need at least one text channel available. If you do not meet these requirements, make the changes then close and reopen the modal (the channels list is loaded when the modal opens).`,
	},
	{
		displayName: 'Type',
		name: 'type',
		required: false,
		type: 'options',
		options: [
			{
				name: 'Messages',
				value: 'messages',
				description:
					'This is the default type, it allows you to get a number of messages in the channel.',
			}
		],
		default: 'message',
		description: 'Let you choose the type of information you want to get.',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: false,
		default: '',
		description: '(Coming Soon) Only get messages from this User.',
	},
	{
		displayName: 'Which roles',
		name: 'roleIds',
		required: false,
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getRoles',
		},
		default: [],
		description: `(Coming Soon) Only get messages from these rolls`,
	},
	{
		displayName: 'How many?',
		name: 'messagesNumber',
		type: 'number',
		required: true,
		default: 1,
		description:
			'Number of messages to get. Note: This is before Filtering!',
	},
];
