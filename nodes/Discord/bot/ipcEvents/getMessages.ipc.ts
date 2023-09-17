import Ipc from 'node-ipc';
import {
	Client,
	Channel,
} from 'discord.js';
import { addLog } from '../helpers';
import state from '../state';
import { IDiscordGetNodeMessageParameters } from '../../DiscordGet.node';

export default async function (ipc: typeof Ipc, client: Client) {
	ipc.server.on(
		'get:messages',
		async (nodeParameters: IDiscordGetNodeMessageParameters, socket: any) => {
			try {
				if (state.ready) {
					const executionMatching = state.executionMatching[nodeParameters.executionId];
					let channelId: string = '';
					if (nodeParameters.triggerChannel)
						channelId = executionMatching.channelId;
					else channelId = nodeParameters.channelId;

					client.channels
						.fetch(channelId)
						.then(async (channel: Channel | null) => {
							if (!channel || !channel.isTextBased()) return;

							addLog(`get:messages from ${channelId}`, client);

							channel.messages.fetch({limit: nodeParameters.messagesNumber})
								.then(messages => {
									let data = messages.map(message => {
										return {author: message.author.displayName, content: message.content}
									});
									ipc.server.emit(socket, 'get:messages', {messages: data});
								})
								.catch((e: any) => {
									addLog(`${e}`, client);
									ipc.server.emit(socket, 'get:messages', false);
								});
						});
				}
			} catch (e) {
				addLog(`${e}`, client);
				ipc.server.emit(socket, 'get:messages', false);
			}
		},
	);
}
