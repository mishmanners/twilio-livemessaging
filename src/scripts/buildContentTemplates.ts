export function getShowHelpTemplate(
  numOptions: number,
  templateName: string,
): WhatsAppTemplateConfig {
  // The first variable defines the type of beverage abd then there are always 3 vars (short title, full title, desc) per options  => numOptions * 3

  const variables = Array.from(Array(numOptions * 3).keys()).reduce(
    (accu: any, idx) => {
      accu[idx] = "";
      return accu;
    },
    {},
  );

  const indiciesOfFullTitles = [],
    items = [];
  for (let i = 0; i < numOptions; i++) {
    indiciesOfFullTitles.push(`- {{${i * 3 + 1}}}`);
    items.push({
      item: `{{${i * 3 + 2}}}`,
      id: `Ask about {{${i * 3 + 1}}}`, // should be same as indiciesOfFullTitles because this will be send to the webhook
      description: `{{${i * 3 + 3}}}`,
    });
  }

  const lastIndex = numOptions * 3 + 1;

  const body = `{{0}}\n${indiciesOfFullTitles.join("\n")}\n\n{{${lastIndex}}}`;

  return {
    friendly_name: templateName,
    language: "en",
    variables,
    types: {
      "twilio/list-picker": {
        body,
        items,
        button: "More Details",
      },
      "twilio/text": {
        body: body,
      },
    },
  };
}

const CONFIRMATION_VERIFIED_EMAIL = `Thank you! Your email address has been verified.`;
function getAvailableOptions(indiciesOfFullTitles: string[]) {
  return `What would you like to ask? The question categories are:\n${indiciesOfFullTitles.join(
    "\n",
  )}`;
}
const SAMPLE_QUESTION = `Or send a message containing your question, e.g. "{{1}}".`;
// Removed QUESTION_LIMITATION_NOTE since we no longer limit the number of questions in Twitter Spaces
const QUESTION_LIMITATION_NOTE = "";
export function getReadyToOrderTemplate(
  numOptions: number,
  templateName: string,
): WhatsAppTemplateConfig {
  // The first two variables define the mode and the max num of orders and then 3 additional vars (short title, full title, desc) per options  => numOptions * 3 + 1

  const variables = Array.from(Array(numOptions * 3 + 1).keys()).reduce(
    (accu: any, idx) => {
      accu[idx] = "";
      return accu;
    },
    {},
  );

  const indiciesOfFullTitles = [],
    items = [];
  for (let i = 0; i < numOptions; i++) {
    indiciesOfFullTitles.push(`- {{${i * 3 + 2}}}`);
    items.push({
      item: `{{${i * 3 + 3}}}`,
      id: `Ask about {{${i * 3 + 2}}}`, // should be same as indiciesOfFullTitles because this will be send to the webhook
      description: `{{${i * 3 + 4}}}`,
    });
  }

  const body = `${CONFIRMATION_VERIFIED_EMAIL} ${getAvailableOptions(indiciesOfFullTitles)}\n${SAMPLE_QUESTION}${QUESTION_LIMITATION_NOTE}`;

  return {
    friendly_name: templateName,
    language: "en",
    variables,
    types: {
      "twilio/list-picker": {
        body,
        items,
        button: "More Details",
      },
      "twilio/text": {
        body: body,
      },
    },
  };
}

export function getReadyToOrderLimitlessTemplate(
  numOptions: number,
  templateName: string,
): WhatsAppTemplateConfig {
  // The first variable defines the mode and second is not used
  // and then 3 additional vars (short title, full title, desc) per options  => numOptions * 3 + 1

  const variables = Array.from(Array(numOptions * 3 + 1).keys()).reduce(
    (accu: any, idx) => {
      accu[idx] = "";
      return accu;
    },
    {},
  );

  const indiciesOfFullTitles = [],
    items = [];
  for (let i = 0; i < numOptions; i++) {
    indiciesOfFullTitles.push(`- {{${i * 3 + 2}}}`);
    items.push({
      item: `{{${i * 3 + 3}}}`,
      id: `Ask about {{${i * 3 + 2}}}`, // should be same as indiciesOfFullTitles because this will be send to the webhook
      description: `{{${i * 3 + 4}}}`,
    });
  }

  const body = `${CONFIRMATION_VERIFIED_EMAIL} ${getAvailableOptions(indiciesOfFullTitles)}\n${SAMPLE_QUESTION}`;

  return {
    friendly_name: templateName,
    language: "en",
    variables,
    types: {
      "twilio/list-picker": {
        body,
        items,
        button: "More Details",
      },
      "twilio/text": {
        body: body,
      },
    },
  };
}

export function getReadyToOrderWithoutEmailValidationTemplate(
  numOptions: number,
  templateName: string,
): WhatsAppTemplateConfig {
  // The first two variables define the mode and the max num of orders and then 3 additional vars (short title, full title, desc) per options  => numOptions * 3 + 1

  const variables = Array.from(Array(numOptions * 3 + 1).keys()).reduce(
    (accu: any, idx) => {
      accu[idx] = "";
      return accu;
    },
    {},
  );

  const indiciesOfFullTitles = [],
    items = [];
  for (let i = 0; i < numOptions; i++) {
    indiciesOfFullTitles.push(`- {{${i * 3 + 2}}}`);
    items.push({
      item: `{{${i * 3 + 3}}}`,
      id: `Ask about {{${i * 3 + 2}}}`, // should be same as indiciesOfFullTitles because this will be send to the webhook
      description: `{{${i * 3 + 4}}}`,
    });
  }

  const body = `${getAvailableOptions(indiciesOfFullTitles)}\n${SAMPLE_QUESTION}${QUESTION_LIMITATION_NOTE}`;
  return {
    friendly_name: templateName,
    language: "en",
    variables,
    types: {
      "twilio/list-picker": {
        body,
        items,
        button: "More Details",
      },
      "twilio/text": {
        body: body,
      },
    },
  };
}

export function getReadyToOrderLimitlessWithoutEmailValidationTemplate(
  numOptions: number,
  templateName: string,
): WhatsAppTemplateConfig {
  // The first variable defines the mode and second is not used
  // and then 3 additional vars (short title, full title, desc) per options  => numOptions * 3 + 1

  const variables = Array.from(Array(numOptions * 3 + 1).keys()).reduce(
    (accu: any, idx) => {
      accu[idx] = "";
      return accu;
    },
    {},
  );

  const indiciesOfFullTitles = [],
    items = [];
  for (let i = 0; i < numOptions; i++) {
    indiciesOfFullTitles.push(`- {{${i * 3 + 2}}}`);
    items.push({
      item: `{{${i * 3 + 3}}}`,
      id: `Ask about {{${i * 3 + 2}}}`, // should be same as indiciesOfFullTitles because this will be send to the webhook
      description: `{{${i * 3 + 4}}}`,
    });
  }

  const body = `${getAvailableOptions(indiciesOfFullTitles)}\n${SAMPLE_QUESTION}`;

  return {
    friendly_name: templateName,
    language: "en",
    variables,
    types: {
      "twilio/list-picker": {
        body,
        items,
        button: "More Details",
      },
      "twilio/text": {
        body: body,
      },
    },
  };
}

export function getEventRegistrationTemplate(
  numOptions: number,
  templateName: string,
): WhatsAppTemplateConfig {
  const variables = Array.from(Array(numOptions * 2 + 1).keys()).reduce(
    (accu: any, idx) => {
      accu[idx] = "";
      return accu;
    },
    {},
  );

  const indiciesOfFullTitles = [],
    actions = [];
  for (let i = 0; i < numOptions; i++) {
    indiciesOfFullTitles.push(`- {{${i * 2}}}`);
    actions.push({
      title: `{{${i * 2}}}`,
      id: `{{${i * 2 + 1}}}`,
    });
  }

  const body = `Which event are you currently at? Please reply with the name of your event below. ${getAvailableOptions(indiciesOfFullTitles)}`;

  return {
    friendly_name: templateName,
    language: "en",
    variables,
    types: {
      "twilio/quick-reply": {
        body,
        actions,
      },
      "twilio/text": {
        body: body,
      },
    },
  };
}

export function getQuestionCancelledTemplate(
  templateName: string,
): WhatsAppTemplateConfig {
  const body =
    "Your {{0}} question (*#{{1}}*) has been cancelled. Please check with our Twitter Spaces hosts if you think something is wrong.";

  return {
    friendly_name: templateName,
    language: "en",
    variables: {
      "0": "question category",
      "1": "question number",
    },
    types: {
      "twilio/text": {
        body,
      },
    },
  };
}

export function getQuestionAnsweredTemplate(
  templateName: string,
): WhatsAppTemplateConfig {
  const body =
    "*Your {{0}} question has been answered*! 🎉 You can listen to the response in the live Twitter Space. Question #{{1}} was featured.";

  return {
    friendly_name: templateName,
    language: "en",
    variables: {
      "0": "question category",
      "1": "question number",
    },
    types: {
      "twilio/text": {
        body,
      },
    },
  };
}

export function getQuestionReminderTemplate(
  templateName: string,
): WhatsAppTemplateConfig {
  const body =
    "Hey! Your {{0}} question is still in the queue 🎤 It's question #{{1}}. Keep listening to the Twitter Space to hear if it gets answered!";

  return {
    friendly_name: templateName,
    language: "en",
    variables: {
      "0": "question category",
      "1": "question number",
    },
    types: {
      "twilio/text": {
        body,
      },
    },
  };
}

export function getQuestionConfirmationTemplate(
  templateName: string,
  isTwitterSpace: boolean,
): WhatsAppTemplateConfig {
  const header_text = "Your {{0}} question is confirmed!";
  const body =
    '*Your question number is #{{1}}*\n\nWe\'ll consider your question for the live Twitter Space -- or send "status" to check your position in the queue\n\nSend "edit question to <new question>" to change your question or "cancel question" to cancel it.';

  const footer = isTwitterSpace
    ? "Thanks for participating in our Twilio Twitter Space Q&A!"
    : "Thanks for submitting your question to our live session!";

  return {
    friendly_name: templateName,
    language: "en",
    variables: {
      "0": "question category",
      "1": "question number",
    },
    types: {
      // "twilio/card": {
      //   // header_text, TODO consider adding back once whatsapp/card is supported by conversation API
      //   // body,
      //    footer,
      //   title: `*${header_text}*\n${body}`,
      // },
      "twilio/text": {
        body: `${header_text}\n\n${body}`,
      },
    },
  };
}

export interface WhatsAppTemplateConfig {
  friendly_name: string;
  language: string;
  variables: Record<string, string>;
  types: {
    "twilio/list-picker"?: {
      body: string;
      items: Array<{
        item: string;
        id: string;
        description: string;
      }>;
      button: string;
    };
    "twilio/text": {
      body: string;
    };
    "twilio/quick-reply"?: {
      body: string;
      actions: Array<{
        title: string;
        id: string;
      }>;
    };
    "twilio/card"?: {
      title?: string;
      subtitle: string;
      media?: string[];
    };
  };
  links?: {
    approval_fetch: string;
    approval_create: string;
  };
}

export interface WhatsAppTemplate extends WhatsAppTemplateConfig {
  date_updated: string;
  account_sid: string;
  url: string;
  sid: string;
  date_created: string;
  links: {
    approval_fetch: string;
    approval_create: string;
  };
}
