import { Event } from "@/app/(master-layout)/event/[slug]/page";
import { modes } from "@/config/menus";

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
        : plural
          ? "questions"
          : "question";
}

export function getModifiersMessage(modifiers: string[]) {
  return `You can categorize your question with the following categories:\n${modifiers
    .map((m) => `- ${m}`)
    .join("\n")}`;
}

export function getSystemOfflineMessage(event: Event) {
  const { mode } = event.selection;
  return `Twitter Space Q&A is closed 🎤\nWe're not accepting questions at the moment. Please check back later when we're live!`;
}

export function getOopsMessage(error: any) {
  return `Oops, something went wrong! Talk to someone from Twilio and see if they can help you.`;
}

export function getNoMediaHandlerMessage() {
  return "Sorry, we don't support media messages. Please send a text message with your question for the Twitter Space.";
}

export function getInvalidEmailMessage() {
  return "Invalid email address. Please reply with a valid business email address.";
}

export function getErrorDuringEmailVerificationMessage(error: string) {
  return `An error occurred during email verification: ${error}`;
}

export function getSentEmailMessage() {
  return "We have sent you an email with a verification code. Please reply with the code we sent to your email address.\nIf you did not receive the email, please check your spam folder or enter a new email address.";
}

export function getInvalidVerificationCodeMessage() {
  return "Invalid verification code. Please reply with the correct code.";
}

export function getWelcomeMessage(
  mode: modes,
  customWelcomeMessage?: string,
  willCollectedLeads?: boolean,
) {
  const welcomeMessage =
    customWelcomeMessage ||
    `Welcome to the Twilio Twitter Space Q&A! 🎤✨ Do you have a question for our live session?`;
  const leadCollectionSuffix = willCollectedLeads
    ? "\nReply with your full name to get started."
    : "";
  return `${welcomeMessage}\n${leadCollectionSuffix}`;
}

export function getWelcomeBackMessage(
  mode: modes,
  event: string,
  customWelcomeMessage?: string,
) {
  const welcomeMessageSuffix =
    customWelcomeMessage ||
    `\nDo you have a question for our live Twitter Space?`;

  return `Welcome back to ${event}! 🎙️\n${welcomeMessageSuffix}`;
}

export function getDataPolicy(mode: string) {
  return `We only use your phone number to manage your question submissions and redact all the messages & phone numbers afterward.`;
  // return `We only use your phone number to notify you about our ${mode} service and redact all the messages & phone numbers afterward. You can request to delete your data at any time and cancel open orders by replying with "Forget me".`; TODO switch once implemented and tested
}

export function getPromptForEmail() {
  return "Thanks. Please enter your business email address. We will then use Twilio Verify and SendGrid to send you an one-time password.";
}

export function getNoActiveEventsMessage() {
  return "Oh no! 😕 It seems like we don't have any active Twitter Spaces at the moment. Please check back later. 🙂";
}

export function getPausedEventMessage() {
  return "Hey there! We've paused question submissions for now. Please check back later when we're live.";
}
