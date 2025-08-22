<p align="center">
  <h1 align="center">Twilio Twitter Spaces Mesaging</h1>
</p>

## About

When hosting a Twitter Space, we face a challenge in engaging effectively with our audience. While the platform allows for live conversations, there are key limitations that impact both us as hosts and our audiences as listeners.

So we built this WhatsApp messaging, so that during a live Twitter Space, audience members send questions or comments via a dedicated WhatsApp number (Twilio API) (QR code linked in the Twitter space or similar).

Participants can submit questions anytime, even if they’re not “speaking” in the Space.

If you want to learn more about how this project was started, check out the this blog post:

> [Serving Coffee with Twilio Programmable SMS and React](https://www.twilio.com/en-us/blog/serving-coffee-with-sms-and-react-html)


## Features

- Receive messages using [Twilio Messaging]
- Store orders and real-time synchronization them between back-end and front-end using [Twilio Sync]
- Easy dynamic application configuration using [Twilio Sync]
- Managing message threads using [Twilio Conversations]
- Permission management based on [Twilio Sync]
- Easy way to reset the application from the admin interface
- Support multiple events that happen in parallel
- Query for location in the queue as well as canceling the order as a user
- All combined into a single [NextJS](https://nextjs.org/) web application


### Channels

The current [Twilio Channels] are:

- [WhatsApp][twilio whatsapp]
- [SMS][twilio messaging]

## Setup

### Requirements

- [Node.js] version 20 or higher
- [pnpm]
- A Twilio account - [Sign up here](https://www.twilio.com/try-twilio)

## Setup

1. Install the project's dependencies
   ```bash
   pnpm install
   ```
2. Create a `.env.local` files with, at least, the following

   ```
   # Application related values
   MIXOLOGIST_LOGIN=someuser:password
   ADMIN_LOGIN=someadmin:password
   KIOSK_LOGIN=somekiosk:somepassword
   SERVICE_INSTANCE_PREFIX=Mixologist
   ACTIVE_CUSTOMERS_MAP=ActiveCustomers
   UNLIMITED_ORDERS=CommaSeparatedNumbersToWhichTheLimitDoesNotApply

   # NGROK URL GOES HERE
   PUBLIC_BASE_URL=https://mobert.ngrok.io

   # Twilio related values
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   TWILIO_API_KEY=
   TWILIO_API_SECRET=

   SEGMENT_SPACE_ID="your_segment_space_id"
   SEGMENT_PROFILE_KEY="your_segment_profile_key"
   SEGMENT_TRAIT_CHECK="your_segment_trait_check"
   ```

   Go into the [Twilio Console] and [generate an API Key and Secret](https://www.twilio.com/console/dev-tools/api-keys). Make sure to store the information safely.

3. Run the setup script

   ```bash
   pnpm run create-twilio-res
   ```

4. Now you can manually add all the senders you need to the Messaging Services that was just created for you. This can be done in the [Twilio Console](https://twilio.com/console/messaging/services/)

5. Go to the Verify service and make sure it is able to [Send Email Verifications with Verify and Twilio SendGrid](https://www.twilio.com/docs/verify/email)

6. Connect your Messaging Service to your Conversation Service in the Twilio console.
   1. Turn on 'Handle Inbound Messages with Conversations' [here](https://console.twilio.com/us1/develop/conversations/manage/defaults)
   2. Set your default Mesaging Service and Conversation Services to the Services created by the setup script
   3. Head back to your Messaging Service, navigate to 'Integration' and select 'Autocreate a Conversation'
      P.S. In the future this setup step will no longer be necessary
7. Run the script to write the base config for the application. You can re-run this command when you edit the menu ([`menus.ts`](./src/config/menus.ts)). It will also pick up changes you're done to the sender pool of the messaging service.

   ```bash
   pnpm run update-config
   ```

8. First, run the development server:

```bash
pnpm dev
```

9. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How To Use

[Here's a diagram of what happens when the user sends a message to the application](resources/user-flow-diagram.png)

## Testing

This projects comes with a test suit that runs on every push to `main` and `feat/` branches. Unit tests cover basic capabilities (access control checks, template generator). And e2e tests cover the main functionality of the website since the data is loaded async and RSC's are currently not supported by unit test frameworks.

```bash
pnpm test # run unit tests
pnpm test:e2e # run e2e tests
```

## Optional Setup

### Tips for production

Here are a few helpful notes:

- If you are using the SMS channel, make sure to [set the SMS Geo Permissions](https://www.twilio.com/docs/messaging/guides/sms-geo-permissions)to make sure senders from the entire world can interact with the Mixologist.
- Edit the [opt-out management settings](https://help.twilio.com/articles/360034798533-Getting-Started-with-Advanced-Opt-Out-for-Messaging-Services) of the messaging service to avoid that users accidentally unsubscribe from the list.
- Regularly run `pnpm check-for-errors` and see if unforeseen errors occurred when the users tried to order.
- The Kiosk interface is a self-service interface that you can make available to attendees via a table or phone. The page allows the manual entry of an order without the need to put a phone number down. This form can be accessed via `https://<mixologist.server>/<event-slug>/kiosk` and the credentials are defined in the environment variable `KIOSK_LOGIN`.
- Users can send the command "forget me" to remove all data stored about this user. It cancels pending orders, removes the user from the Sync data store and removes the Conversation resource. This can be used for debugging as well as to be GDPR-compliant.

### Segment Integration

This project includes an optional integration with Segment's Profiles API. If you provide the `SEGMENT_SPACE_ID` and `SEGMENT_PROFILE_KEY` environment variables, the application will fetch user traits from Segment using the provided email address once the verification step is completed. The `SEGMENT_TRAIT_CHECK` environment variable allows you to specify a specific trait to check for in the user's profile.

To set up Segment integration:

1. **Create a Segment account** if you don't have one. Sign up [here](https://segment.com/).

2. **Create a Segment Space** and obtain your `SEGMENT_SPACE_ID`.

3. **Generate a Segment Profile API Key** and obtain your `SEGMENT_PROFILE_KEY`.

4. **Specify a Trait to Check** by setting the `SEGMENT_TRAIT_CHECK` environment variable to the desired trait key.

For more details on Segment and how to use the Profiles API, refer to the [Segment documentation](https://segment.com/docs/).

## Code of Conduct

Please be aware that this project has a [Code of Conduct](CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

# Contributing to Twilio

All third party contributors acknowledge that any contributions they provide will be made under the same open source license that the open source project is provided under.

## Icons Used

- [Mixologist Icons by Oliver Pitsch](https://www.smashingmagazine.com/2016/03/freebie-Mixologist-iconset-50-icons-eps-png-svg/)
- [Bar by BirVa Mehta from Noun Project](https://thenounproject.com/term/bar/1323725/)

## License

MIT

[twilio console]: https://www.twilio.com/console
[twilio rest api]: https://www.twilio.com/docs/api/rest
[twilio messaging]: https://www.twilio.com/messaging
[twilio whatsapp]: https://www.twilio.com/en-us/messaging/channels/whatsapp
[twilio conversations]: https://www.twilio.com/conversations
[twilio sync]: https://wwww.twilio.com/sync
[twilio channels]: https://www.twilio.com/channels
[preact cli]: https://github.com/developit/preact-cli
[node.js]: https://nodejs.org
[nppm]: https://pnpm.io/
[ngrok]: https://ngrok.com/
[express]: http://expressjs.com/
