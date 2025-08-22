"use server";

// Type declaration for Node.js process and require
declare global {
  var process: {
    env: Record<string, string | undefined>;
  };
  var require: (id: string) => any;
}

import { modes } from "@/config/menus";
import { Event } from "@/app/(master-layout)/event/[slug]/page";

// Use require for axios to avoid TypeScript module resolution issues
const axios = require("axios");

const {
  TWILIO_API_KEY = "",
  TWILIO_API_SECRET = "",
  SERVICE_INSTANCE_PREFIX = "",
} = process.env;
const formattedServicePrefix = SERVICE_INSTANCE_PREFIX.toLowerCase();

function modeToBeverage(mode: modes, plural: boolean = false) {
  return mode === "qa"
    ? plural
      ? "questions"
      : "question"
    : mode === "panel"
      ? plural
        ? "discussions"
        : "discussion"
      : mode === "interview"
        ? plural
          ? "interviews"
          : "interview"
        : mode === "smoothie"
          ? plural
            ? "smoothies"
            : "smoothie"
          : mode === "cocktail"
            ? plural
              ? "drinks"
              : "drink"
            : mode === "tea"
              ? "tea"
              : "coffee";
}

function buildContentVariables(variables: any[]) {
  const contentVariables: any = {};
  variables.forEach((value, key) => {
    contentVariables[key] = value;
  });
  return JSON.stringify(contentVariables);
}

async function getTemplate(templateName: string) {
  let match, nextPageUrl;
  try {
    do {
      const { data }: { data: any } = await axios.get(
        nextPageUrl || "https://content.twilio.com/v1/Content?PageSize=50",
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: TWILIO_API_KEY,
            password: TWILIO_API_SECRET,
          },
        },
      );
      match = data.contents.find((t: any) => t.friendly_name === templateName);
      nextPageUrl = data.meta.next_page_url;
    } while (!match && nextPageUrl);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch Templates");
  }
  if (!match) {
    throw new Error(`Template ${templateName} not found`);
  }
  return match;
}

export async function getWrongQuestionMessage(
  originalMessage: string,
  availableOptions: any[],
) {
  const template = await getTemplate(
    `${formattedServicePrefix}_wrong_question_${availableOptions.length}`,
  );

  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([
      originalMessage,
      ...availableOptions
        .map((o) => [o.title, o.shortTitle, o.description])
        .flat(),
    ]),
  };
}

export async function getQuestionCancelledMessage(
  category: string,
  questionNumber: string,
) {
  const template = await getTemplate(
    `${formattedServicePrefix}_question_cancelled`,
  );

  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([category, questionNumber]),
  };
}

export async function getQuestionAnsweredMessage(
  category: string,
  questionNumber: string,
) {
  const template = await getTemplate(`${formattedServicePrefix}_question_answered`);

  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([
      category,
      questionNumber,
    ]),
  };
}

export async function getQuestionReminderMessage(
  category: string,
  questionNumber: string,
) {
  const template = await getTemplate(
    `${formattedServicePrefix}_question_reminder`,
  );

  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([
      category,
      questionNumber,
    ]),
  };
}

export async function getShowMenuMessage(
  intro: string,
  availableOptions: any[],
  outro: string,
) {
  const template = await getTemplate(
    `${formattedServicePrefix}_show_menu_${availableOptions.length}`,
  );
  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([
      intro,
      ...availableOptions
        .map((o) => [o.title, o.shortTitle, o.description])
        .flat(),
      outro,
    ]),
  };
}

export async function getShowModifiersMessage(
  intro: string,
  availableModifiers: string[],
  outro: string,
) {
  const template = await getTemplate(
    `${formattedServicePrefix}_show_menu_${availableModifiers.length}`,
  );
  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([
      intro,
      ...availableModifiers.map((o) => [o, o, o]).flat(),
      outro,
    ]),
  };
}

export async function getReadyToAskMessage(
  event: Event,
  availableOptions: any[],
  maxNumberQuestions: number,
  emailValidationSuffix: boolean,
) {
  const { mode, items, modifiers } = event.selection;
  const maxQuestions = `${maxNumberQuestions} ${modeToBeverage(mode, true)}`;
  let sampleQuestion = items[1].title;
  if (modifiers.length > 0) {
    sampleQuestion += ` with ${modifiers[modifiers.length - 1]}`;
  }

  const limitless = maxNumberQuestions >= 50 ? "_limitless" : "";
  const emailSuffix = emailValidationSuffix ? "_without_email" : "";

  const template = await getTemplate(
    `${formattedServicePrefix}_ready_to_order${limitless}${emailSuffix}_${availableOptions.length}`,
  );

  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([
      maxQuestions,
      sampleQuestion,
      ...availableOptions
        .map((o) => [o.title, o.shortTitle, o.description])
        .flat(),
    ]),
  };
}

export async function getEventRegistrationMessage(eventOptions: any[]) {
  const template = await getTemplate(
    `${formattedServicePrefix}_event_registration_${eventOptions.length}`,
  );

  return {
    contentSid: template.sid,
    contentVariables: buildContentVariables([
      ...eventOptions.map((o) => [o.data.name, o.data.name]).flat(),
    ]),
  };
}
