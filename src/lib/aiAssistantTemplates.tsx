import { MenuItem } from "@/config/menus";

export function getSystemPrompt(mode: string) {
  return `You are a helpful assistant that manages questions for Twitter Spaces. This is a system to collect questions from audience members during live Twitter Spaces hosted by Twilio. You help users submit questions to be answered during the live session.
  Note, only help with question submission and related tasks. You can provide information about how the Q&A system works.
  * Never fabricate information on tool execution failures
  * Acknowledge errors without speculation. When using a tool, never assume the tool call was successful. Always check the response and act accordingly.
  * Help users formulate clear and concise questions for the Twitter Space
  * Don't get confused about the users' language. Always return the original message back in the same language the user used but only the user spoke more than 6 words in that language.
  * Always reply in the language the user used in the previous message
  * When a user wants to submit a question, first call the appropriate tool. Once the tool returns a success message, let the user know that their question has been submitted and will be considered for the live session.
  * If the users want to learn more about Twilio, point them to the Twilio employees or the official Twilio resources
  * If they want to reach out to sales, point them to this web form https://www.twilio.com/en-us/help/sales
  * UNDER NO CIRCUMSTANCES, TALK ABOUT TWILIO COMPETITORS. If the user asks about competitors, tell them you can't help with that and suggest they ask a Twilion.
  * Use the feedback tool if you can't help the user with their request. The feedback tool is used to store the attempted action so we can improve the system in the future.
  * Encourage users to ask thoughtful questions about the topic being discussed in the Twitter Space
  * If a question is unclear or too vague, help the user refine it before submission.`;
}

export function getSubmitQuestionTool(
  callbackUrl: string,
  categories?: string[],
) {
  const listOfCategories = categories && categories.length > 0
    ? categories.map((category) => `'${category}'`).join(" | ")
    : "'General' | 'Technical' | 'Product' | 'Business' | 'Other'";
  
  return {
    name: "Submit Question",
    description: `Use this to submit questions for the Twitter Space Q&A session. Users can submit questions about the topic being discussed.
      * Always return the originalMessage back for sanity checks
      * Help users categorize their questions appropriately
      * If the question has been submitted successfully, let the user know that their question has been received and will be considered for the live session.
      * If the tool returns a non-200 response, it means the question submission failed. You MUST let the user know why it failed, the reason is returned with the error code.
      * Encourage clear, concise, and relevant questions
      * If a question is too vague or unclear, help the user refine it before submission`,
    type: "WEBHOOK",
    enabled: true,
    meta: {
      input_schema: `export type Data = { originalMessage: string; question: string; category: ${listOfCategories}; };`,
      method: "POST",
      url: callbackUrl,
    },
  };
}

export function getEditQuestionTool(
  callbackUrl: string,
  categories?: string[],
) {
  const listOfCategories = categories && categories.length > 0
    ? categories.map((category) => `'${category}'`).join(" | ")
    : "'General' | 'Technical' | 'Product' | 'Business' | 'Other'";
  
  return {
    name: "Edit / Cancel Question",
    description: `Use this to edit or cancel previously submitted questions for the Twitter Space Q&A session. 
      * The tool can be used to replace an existing question or cancel a question. The property "action" decides which action to take.
      * Always return the most recent message as "originalMessage" back for sanity checks
      * If the question has been changed successfully, let the user know that their updated question has been received
      * In case of "cancel", the "originalMessage", "question", and "category" properties are not required.
      * If the tool returns a non-200 response, it means the edit/cancel failed. Let the user know why it failed.`,
    type: "WEBHOOK",
    enabled: true,
    meta: {
      input_schema: `export type Data = { action: 'cancel' | 'edit'; originalMessage: string; question: string; category: ${listOfCategories}; };`,
      method: "POST",
      url: callbackUrl,
    },
  };
}

export function getFetchQuestionInfoTool(callbackUrl: string) {
  return {
    name: "Fetch Question Info",
    description: `Use this to fetch information about previously submitted questions. 
      The tool returns the question content, category, and status. Additionally, it returns how many other questions are ahead in the queue.
      If the tool returns a non-200 response, it means the fetch question info failed. Let the user know why it failed.`,
    type: "WEBHOOK",
    enabled: true,
    meta: {
      input_schema: `export type Data = { };`,
      method: "GET",
      url: callbackUrl,
    },
  };
}

export function getForgetUserTool(callbackUrl: string) {
  return {
    name: "Remove User Profile", //TODO consider using unique tool names per event
    description: `Use this to delete the data of a user. Only call this if the user indicated they want their data to be removed. There's no need to send a confirmation message. Only send one if the tool fails with an error / non-200 response.`,
    type: "WEBHOOK",
    enabled: true,
    meta: {
      input_schema: `export type Data = { };`,
      method: "POST",
      url: callbackUrl,
    },
  };
}

export function getAttemptedActionTool(callbackUrl: string) {
  return {
    name: "User feedback",
    description: `Use this tool whenever the user asks for you something that you cannot do or that is outside of the scope of the event. Same goes if the user asks for information that you don't have or that is not relevant to the event.
     You can tell the user politely that you cannot help them with that. After doing so, use this tool to store the attempted action so we can improve the system in the future.`,
    type: "WEBHOOK",
    enabled: true,
    meta: {
      input_schema: `export type Data = { attemptedAction:string; };`,
      method: "POST",
      url: callbackUrl,
    },
  };
}

export function getShowMenuTool() {
  return {
    name: "show_menu_items",
    description: "Send a special message to show all menu items to the user.",
    strict: true,
    parameters: {
      type: "object",
      required: ["menu_items"],
      properties: {
        menu_items: {
          type: "array",
          description: "Array of all menu items",
          items: {
            type: "object",
            required: ["shortName", "longName", "description"],
            properties: {
              shortName: {
                type: "string",
                description: "Short name of the menu item",
              },
              longName: {
                type: "string",
                description: "Long name of the menu item",
              },
              description: {
                type: "string",
                description: "Description of the menu item",
              },
            },
            additionalProperties: false,
          },
        },
      },
      additionalProperties: false,
    },
  };
}
