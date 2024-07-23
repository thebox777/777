const fs = require('fs');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Read SMTP details from smtp.txt
const smtpDetailsRaw = fs.readFileSync('smtp.txt', 'utf-8').split('\n');
const smtpDetails = {};
smtpDetailsRaw.forEach(line => {
    const [key, value] = line.split('=');
    smtpDetails[key.trim()] = value.trim();
});

const smtpConfig = {
    host: smtpDetails['SMTP_SERVER'],
    port: parseInt(smtpDetails['SMTP_PORT'], 10),
    secure: smtpDetails['USE_TLS'] === 'true',
    auth: {
        user: smtpDetails['SMTP_USER'],
        pass: smtpDetails['SMTP_PASSWORD']
    }
};

// Read leads from eleads.csv and send emails
fs.createReadStream('eleads.csv')
    .pipe(csv())
    .on('data', (row) => {
        const recipient = row.email;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport(smtpConfig);

        // Send email
        transporter.sendMail({
            from: '"Document Center" <lalla41@telus.net>',
            to: recipient,
            subject: 'Document from HP LaserJet Pro Scanner',
            html: `
                <html><head><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no"><title></title></head>
<body style="BACKGROUND-COLOR: #ffffff" bgcolor=#ffffff>
<p align=left><font size=3 face=Arial>Dear [First_Name],</font></p>
<p align=left><font size=3 face=Arial>We are delighted to inform you that you 
have been randomly selected as the winner of the Powerball Lottery Online Draw. 
Please confirm if the email address associated with this message, [Email], 
belongs to you.</font></p>
<p align=left><font size=3 face=Arial>If so, you are entitled to claim the grand 
prize of <strong>$675,00.00</strong>. </font><font size=3 face=Arial>Your email 
was entered for the online free participation ticket number: B55607545 6152, 
with reference number UN/JA2C110P5 and Serial number UN5365/3. The lucky numbers 
drawn are 04-09-20-22-29-38-Bonus 06, which resulted in your victory in the 1st 
category, matching 6 lucky numbers plus the Bonus number.</font></p>
<p align=left><font size=3 face=Arial>This draw was conducted using email 
addresses as unique identifiers. All valid addresses were randomly selected 
through computer balloting from a global collaboration of internet companies 
such as EBay, Google, Microsoft and other affiliated members to the National 
Lottery website and their advertisers listed online. This Online promotion takes 
place via virtual ticket balloting and it is done Bi-annually. </font><font 
face=Arial>Please let us know how you would like to proceed by replying to this 
email to claim your winnings</font><font 
style="FONT-SIZE: 14px; WHITE-SPACE: normal; WORD-SPACING: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: rgb(0,0,0); FONT-STYLE: normal; ORPHANS: 2; WIDOWS: 2; BACKGROUND-COLOR: rgb(255,255,255); TEXT-INDENT: 0px; text-decoration-style: initial; text-decoration-color: initial; font-variant-ligatures: normal; font-variant-caps: normal; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial" 
face=Arial>.</font></p>
<p align=left><font size=3 face=Arial><strong>Note: It's important to note that 
legitimate lottery services will never ask for an upfront&nbsp;as we &nbsp;do 
not require the payment of a fee to collect winnings.</strong></font></p>
<p align=left><font size=3 face=Arial>Warm regards,</font></p>
<p align=left><font size=3 face=Arial><strong>Powerball Lottery 
Team</strong></font></p>
<p align=left><font size=3 face=Arial><img border=0 alt="" 
src="file:///C:/Users/thebox/Downloads/powerball-copy.png"></font></p>
<p align=left>&nbsp;</p><em 
style="FONT-SIZE: 14px; FONT-FAMILY: 'Lato 2', sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif; WHITE-SPACE: normal; WORD-SPACING: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: rgb(0,0,0); ORPHANS: 2; WIDOWS: 2; BACKGROUND-COLOR: rgb(255,255,255); TEXT-INDENT: 0px; text-decoration-style: initial; text-decoration-color: initial; font-variant-ligatures: normal; font-variant-caps: normal; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial">
<p align=left>
<hr id=null>
</p>
<p align=left>Information in this e-mail and in any attachments is for the sole 
use of the intended recipient(s) and may contain confidential and privileged 
information protected from disclosure under applicable law. Any unauthorized 
use, disclosure, copying or distribution is strictly prohibited. If you are not 
an intended recipient, please immediately destroy this message and all enclosed 
content<font size=2>. </p>
<p align=left>
<hr id=null>
</p></font></em></body></html>
            `
        }, (error, info) => {
            if (error) {
                console.log(`Failed to send email to ${recipient}: ${error}`);
            } else {
                console.log(`Email sent to ${recipient}: ${info.response}`);
                // Ping Telegram bot over webhook URL
            }
        });
    })
    .on('end', () => {
        console.log('Email sending completed');
    });
