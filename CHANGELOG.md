# Changelog

## Released (2023-09-17 0.5.17)

### Bug fixes

- Add Partial for Channels, to avoid v8 discord API error with DMs.

## Released (2023-09-17 0.5.16)

### New Features

- Add DMs to the intents, to support DMs.

## Released (2023-09-17 0.5.15)

### Bug fixes

- Dont call client.destroy() for resetting client anymore. 

## Released (2023-09-17 0.5.14)

### Bug fixes

- Only reset login state, if not currently logging in

## Released (2023-09-17 0.5.13)

### Bug fixes

- Remove command building during credentials.

## Released (2023-09-17 0.5.12)

### Bug fixes

- remove Commands to test if they caused issues with Authentication.

## Released (2023-09-17 0.5.11)

### New Features

- Add a new node to get Messages from a channel

## Released (2023-09-16 0.5.10)

### Bug fixes

- add option to name files

## Released (2023-09-16 0.5.9)

### Bug fixes

- trying to re-release, as the previous version apparently contained old code


## Released (2023-09-16 0.5.8)

### Bug fixes

- remove failing code in index, adding token for re-login, checking token in client on credentials call

## Released (2023-09-13 0.5.7)

### Bug fixes

- circumventing redefine issue

## Released (2023-09-13 0.5.6)

### Bug fixes

- going brute-force and logging every access to token

## Released (2023-09-13 0.5.5)

### Bug fixes

- logging active token before re-trying

## Released (2023-09-13 0.5.4)

### Bug fixes

- implement fail-over login for sendMessage

## Released (2023-09-13 0.5.3)

### Bug fixes

- log discord.js debug logs. 

## Released (2023-09-13 0.5.2)

### Bug fixes

- Port fixes from https://github.com/minhlucvan/n8n-nodes-discord

## Released (2023-09-13 0.5.1)

### Bug fixes

- Update dependencies
- Fixed some Typescript Errors

## Released (2023-01-18 0.5.0)

### New Features

- Trigger workflow using slash commands (can be restricted to specific roles, pass a parameter)

### Improvements/refactoring

- bot/index.ts refactored into multiple files (discordClientEvents/..., ipcEvents/...)
- Discord Send node will now loop over items
- Triggers can ben listened from all (text) channels if none is specified

## Released (2022-12-16 0.4.2)

### Bug fixes

- Fix attachments webhook checking

## Released (2022-12-13 0.4.1)

### New Features

- Trigger: Attachments field

## Released (2022-11-27 0.4.0)

### New Features

- Trigger: Interaction
- Send: Persistent button/select

## Released (2022-11-26 0.3.1)

### Bug fixes

- User mention notifications are now sent

## Released (2022-11-25 0.3.0)

### New Features

- Trigger: User joins the server
- Trigger: User leaves the server
- Trigger: User presence update
- Trigger: User role added
- Trigger: User role removed
- Action : Add role to user
- Action : Remove role from user

### Bug fixes

- Bot crash when a non-administrator try to use bot "/" commands

## Released (2022-11-06 0.2.0)

### New Features

- base64 on embeds & files
- more context returned by executed nodes (trigger/send)
- type "Action" added on the Discord Send node, with one action possible at the moment: "Remove messages"
- bot customization (activity, activity type, status)

### Improvements/refactoring

- You can now send embeds without "content"

### Bug Fixes

- Error when using prompt if no placeholderId

## Released (2022-10-26 0.1.3)

### Bug Fixes

- Fix subdomain regex

## Released (2022-10-26 0.1.2)

### Improvements/refactoring

- prevent bot crashes

### Bug Fixes

- fix baseUrl
- fix placeholder animation

## Released (2022-10-26 0.1.1)

### Improvements/refactoring

- Added base url field to Discord credentials, so there is no need to use env var and have conflict with different formats
