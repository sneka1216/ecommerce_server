import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "sneka945@gmail.com",
        pass: "nrdradtuwlveybun", 
    }
})


export const sendOrderConfirmationEmail = async (to,name,orderId) => {
    await transporter.sendMail({
        from: 'sneka945@gmail.com',
        to,
        subject: 'Order Confirmation',
        html: `
            Hi ${name},
            <br >
            your order has been placed 
            <br >
            your order id is ${orderId}
        `,
    })
}