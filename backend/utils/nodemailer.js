import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

export const sendEmail = async (to, subject, text, htmlContent = null) => {
    try {
        const mailOptions = {
            from: `"JobPortal Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text, // Fallback text
            html: htmlContent || `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">JobPortal Notifications</h1>
                    </div>
                    
                    <div style="padding: 30px; background-color: #ffffff; color: #1e293b;">
                        <h2 style="color: #2563eb; margin-top: 0;">Hello there!</h2>
                        <p style="font-size: 16px; line-height: 1.6;">${text}</p>
                        
                        <div style="margin: 30px 0; text-align: center;">
                            <a href="http://localhost:5173/profile" style="background-color: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">View Application Status</a>
                        </div>
                        
                        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;">
                        
                        <p style="font-size: 14px; color: #64748b;">If you have any questions, feel free to reply to this email.</p>
                    </div>
                    
                    <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
                        <p style="margin: 0;">&copy; 2026 JobPortal Inc. All rights reserved.</p>
                        <p style="margin: 5px 0;">Mangalagiri, Andhra Pradesh</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to: ${to}`);
    } catch (error) {
        console.log("Nodemailer Error: ", error);
    }
};