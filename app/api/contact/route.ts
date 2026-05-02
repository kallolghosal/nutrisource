import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM ?? 'NutriSource India <onboarding@resend.dev>'

export async function POST(req: NextRequest) {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const inboxHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
            <h2 style="color:#087E00">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;font-weight:bold;width:100px">Name</td><td>${name}</td></tr>
                <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px 0;font-weight:bold;vertical-align:top">Message</td><td style="white-space:pre-wrap">${message}</td></tr>
            </table>
        </div>
    `

    const confirmHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
            <div style="background:linear-gradient(180deg,#7CBB0E 0%,#087E00 100%);padding:32px;border-radius:12px 12px 0 0;text-align:center">
                <h1 style="color:#fff;margin:0;font-size:28px">NutriSource India</h1>
            </div>
            <div style="background:#f9f9f9;padding:32px;border-radius:0 0 12px 12px">
                <h2 style="color:#087E00">Thank you, ${name}!</h2>
                <p style="color:#444;line-height:1.7">
                    We have received your message and will get back to you shortly at <strong>${email}</strong>.
                </p>
                <blockquote style="border-left:4px solid #7CBB0E;margin:24px 0;padding:12px 20px;background:#fff;color:#555;font-style:italic;white-space:pre-wrap">${message}</blockquote>
                <p style="color:#444;line-height:1.7">
                    If your query is urgent, feel free to email us at
                    <a href="mailto:info@nutrisource.in" style="color:#087E00">info@nutrisource.in</a>.
                </p>
                <p style="color:#888;font-size:13px;margin-top:32px">
                    NutriSource India Pvt. Ltd. &mdash; Empowering Sustainable Agriculture
                </p>
            </div>
        </div>
    `

    const [inboxResult, confirmResult] = await Promise.all([
        resend.emails.send({
            from: `NutriSource Contact Form <${FROM}>`,
            to: 'info@nutrisource.in',
            replyTo: email,
            subject: `New message from ${name}`,
            html: inboxHtml,
        }),
        resend.emails.send({
            from: `NutriSource India <${FROM}>`,
            to: email,
            subject: `Thank you for reaching out, ${name}!`,
            html: confirmHtml,
        }),
    ])

    if (inboxResult.error || confirmResult.error) {
        const errMsg = inboxResult.error?.message ?? confirmResult.error?.message
        console.error('Resend error:', inboxResult.error, confirmResult.error)
        return NextResponse.json({ error: errMsg ?? 'Failed to send message.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
