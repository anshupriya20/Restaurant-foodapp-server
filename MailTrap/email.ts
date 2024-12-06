import {
    generatePasswordResetEmailHtml,
    generateResetSuccessEmailHtml,
    generateWelcomeEmailHtml,
    htmlContent,
} from "./htmlEmail";
const { client, sender } = require( "./mailtrap");

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [{ email }];
    const emailHtml = htmlContent.replace("{verificationToken}", verificationToken);

    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: emailHtml,
            category: "Email Verification",
        });
        console.log("Verification email sent successfully:", res);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send email verification");
    }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email }];
    const emailHtml = generateWelcomeEmailHtml(name);

    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: `Welcome to Anshu's Cafe`,
            html: emailHtml,
            template_variables: {
                company_info_name: "Anshu's Cafe",
                name: name,
            },
        });
        console.log("Welcome email sent successfully:", res);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }
};

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipient = [{ email }];
    const emailHtml = generatePasswordResetEmailHtml(resetURL);

    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: emailHtml,
            category: "Reset Password",
        });
        console.log("Password reset email sent successfully:", res);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};

export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [{ email }];
    const emailHtml = generateResetSuccessEmailHtml();

    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: emailHtml,
            category: "Password Reset",
        });
        console.log("Password reset success email sent successfully:", res);
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw new Error("Failed to send password reset success email");
    }
};
