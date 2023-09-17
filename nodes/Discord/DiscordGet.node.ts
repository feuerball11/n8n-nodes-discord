import {
	IExecuteFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { options } from './DiscordGet.node.options';
import {
	connection,
	getChannels as getChannelsHelper,
	getRoles as getRolesHelper,
	ipcRequest,
	ICredentials,
} from './bot/helpers';

const nodeDescription: INodeTypeDescription = {
	displayName: 'Discord Get',
	name: 'discordGet',
	group: ['discord'],
	version: 1,
	description: 'Gets information from Discord',
	defaults: {
		name: 'Discord Get',
	},
	icon: 'file:discordGet.svg',
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'discordApi',
			required: true,
		},
	],
	properties: options,
};

export interface IDiscordGetNodeMessageParameters {
	executionId: string;
	token: string;
	triggerChannel: boolean;
	channelId: string;
	userId?: string;
	mentionRoles: string[];
	roleIds?: string[] | string;
	messagesNumber: number;
}

export class DiscordGet implements INodeType {
	description: INodeTypeDescription = nodeDescription;

	methods = {
		loadOptions: {
			async getChannels(): Promise<INodePropertyOptions[]> {
				return await getChannelsHelper(this).catch((e) => e);
			},
			async getRoles(): Promise<INodePropertyOptions[]> {
				return await getRolesHelper(this).catch((e) => e);
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// @ts-ignore
		const executionId = this.getExecutionId();
		const returnData: INodeExecutionData[] = [];

		// connection
		const credentials = (await this.getCredentials('discordApi').catch(
			(e : any) => e,
		)) as any as ICredentials;
		await connection(credentials).catch((e) => {
			throw new Error(e);
		});

		// execution
		const items: INodeExecutionData[] = this.getInputData();
		for (let itemIndex: number = 0; itemIndex < items.length; itemIndex++) {
			const nodeParameters: any = {};
			Object.keys(this.getNode().parameters).forEach((key) => {
				nodeParameters[key] = this.getNodeParameter(key, itemIndex, '') as any;
			});
			nodeParameters.executionId = executionId;
			nodeParameters.apiKey = credentials.apiKey;
			nodeParameters.baseUrl = credentials.baseUrl;
			nodeParameters.token = credentials.token;

			if (nodeParameters.channelId || nodeParameters.executionId) {
				// return the interaction result if there is one
				const res = await ipcRequest(
					`get:${nodeParameters.type}`,
					nodeParameters,
				).catch((e) => {
					throw new Error(e);
				});

				returnData.push({
					json: {
						messages : res.messages,
					},
				});
			}

			if (nodeParameters.placeholder) await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		return this.prepareOutputData(returnData);
	}
}
