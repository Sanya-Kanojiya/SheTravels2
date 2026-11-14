
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendSosEmail = async ({
  to,
  userName,
  mapLink,
  timestamp,
}) => {
  const locationText = mapLink
    ? `Google Maps Location: ${mapLink}`
    : "GPS location is unavailable.";

  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to,
    subject: "EMERGENCY SOS ALERT - SheTravels",
    text: `
EMERGENCY SOS ALERT

${userName} has activated an SOS alert on SheTravels.

Please try to contact them immediately.

${locationText}

Alert time: ${timestamp}

This is an automated emergency notification.
    `,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
};

module.exports = { sendSosEmail };
