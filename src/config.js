module.exports = {
PORT: process.env.PORT || 8000,
NODE_ENV: process.env.NODE_ENV || 'development',
TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
PHONE: process.env.PHONE
}