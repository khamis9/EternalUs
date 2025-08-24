import { NextRequest, NextResponse } from 'next/server'
import * as SibApiV3Sdk from '@getbrevo/brevo'

// Initialize Brevo API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { post, authorUsername } = await request.json()
    
    // Debug logging
    console.log('Email notification triggered:', { post, authorUsername })
    console.log('Author:', authorUsername)
    
    if (!process.env.BREVO_API_KEY) {
      console.error('No Brevo API Key found!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }
    
    // Dark gothic email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Love Message</title>
          <style>
            /* Reset and base styles for all email clients */
            body {
              font-family: Georgia, 'Times New Roman', serif !important;
              background-color: #0a0a0a !important;
              margin: 0 !important;
              padding: 20px !important;
              color: #e0e0e0 !important;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
            
            /* Force dark background for mobile */
            body[data-ogsc] {
              background-color: #0a0a0a !important;
            }
            
            /* Dark mode overrides for all email clients */
            [data-ogsc] body,
            [data-ogsc] .container,
            [data-ogsc] .header,
            [data-ogsc] .content,
            [data-ogsc] .message,
            [data-ogsc] .footer,
            [data-ogsc] .gothic-border {
              background-color: #0a0a0a !important;
              color: #e0e0e0 !important;
            }
            
            /* Gmail dark mode override */
            [data-ogsc] .gmail_default {
              background-color: #0a0a0a !important;
              color: #e0e0e0 !important;
            }
            
            /* iOS Mail dark mode override */
            @media (prefers-color-scheme: dark) {
              body, .container, .header, .content, .message, .footer, .gothic-border {
                background-color: #0a0a0a !important;
                color: #e0e0e0 !important;
              }
            }
            
            /* Force colors for Outlook and other clients */
            .force-dark {
              background-color: #0a0a0a !important;
              color: #e0e0e0 !important;
            }
            
            /* Ultra-aggressive dark mode override */
            *[data-ogsc] *,
            *[data-ogsc] *::before,
            *[data-ogsc] *::after {
              background-color: inherit !important;
              color: inherit !important;
            }
            
            /* Force specific colors for dark mode */
            [data-ogsc] .container { background-color: #1a1a1a !important; }
            [data-ogsc] .header { background-color: #1a1a1a !important; }
            [data-ogsc] .content { background-color: #1a1a1a !important; }
            [data-ogsc] .message { background-color: #0f0f0f !important; color: #e0e0e0 !important; }
            [data-ogsc] .footer { background-color: #0f0f0f !important; color: #888 !important; }
            [data-ogsc] .gothic-border { background-color: #1a1a1a !important; }
            
            /* iOS Mail specific dark mode override */
            @media (prefers-color-scheme: dark) {
              .container, .header, .content, .message, .footer, .gothic-border {
                background-color: #0a0a0a !important;
                color: #e0e0e0 !important;
              }
              .message { background-color: #0f0f0f !important; }
              .footer { background-color: #0f0f0f !important; }
            }
            .container {
              max-width: 600px !important;
              margin: 0 auto !important;
              background-color: #1a1a1a !important;
              border-radius: 15px !important;
              border: 2px solid #dc2626 !important;
              overflow: hidden !important;
              /* Mobile-friendly box shadow */
              box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3) !important;
            }
            .header {
              background-color: #1a1a1a !important;
              padding: 30px !important;
              text-align: center !important;
              border-bottom: 2px solid #dc2626 !important;
              /* Fallback for email clients that don't support gradients */
            }
            .header h1 {
              margin: 0 !important;
              font-size: 28px !important;
              font-weight: bold !important;
              color: #dc2626 !important;
              letter-spacing: 1px !important;
              /* Mobile-friendly text shadow */
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
            }
            .content {
              padding: 30px !important;
              background-color: #1a1a1a !important;
            }
            .message {
              background-color: #0f0f0f !important;
              border: 2px solid #dc2626 !important;
              border-radius: 12px !important;
              padding: 30px !important;
              margin: 25px 0 !important;
              font-style: italic !important;
              line-height: 1.8 !important;
              color: #e0e0e0 !important;
              /* Mobile-friendly box shadow */
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
            }
            .author {
              text-align: right !important;
              font-weight: bold !important;
              color: #dc2626 !important;
              margin-top: 15px !important;
              font-size: 18px !important;
            }
            .footer {
              text-align: center !important;
              padding: 20px !important;
              border-top: 1px solid #dc2626 !important;
              color: #888 !important;
              font-size: 14px !important;
              background-color: #0f0f0f !important;
            }
            .heart {
              color: #dc2626 !important;
              font-size: 20px !important;
            }
            .rose {
              color: #dc2626 !important;
              font-size: 28px !important;
              margin: 15px 0 !important;
            }
            .gothic-border {
              border: 2px solid #dc2626 !important;
              border-radius: 12px !important;
              padding: 20px !important;
              margin: 20px 0 !important;
              background-color: #1a1a1a !important;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
            }
          </style>
        </head>
        <body style="background-color: #0a0a0a !important; color: #e0e0e0 !important; margin: 0 !important; padding: 20px !important; font-family: Georgia, 'Times New Roman', serif !important;">
          <div style="max-width: 600px !important; margin: 0 auto !important; background-color: #1a1a1a !important; border-radius: 15px !important; border: 2px solid #dc2626 !important; overflow: hidden !important; box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3) !important;">
            <div style="background-color: #1a1a1a !important; padding: 30px !important; text-align: center !important; border-bottom: 2px solid #dc2626 !important;">
              <h1 style="margin: 0 !important; font-size: 32px !important; font-weight: bold !important; color: #dc2626 !important; text-shadow: 0 0 15px rgba(220, 38, 38, 0.8) !important; letter-spacing: 2px !important;">💕 Eternal Us 💕</h1>
              <p style="color: #888 !important; margin: 10px 0 0 0 !important;">A new moment of love has been shared</p>
            </div>
            
            <div style="padding: 30px !important; background-color: #1a1a1a !important;">
              <div style="border: 2px solid #dc2626 !important; border-radius: 12px !important; padding: 20px !important; margin: 20px 0 !important; background-color: #1a1a1a !important; box-shadow: 0 0 20px rgba(220, 38, 38, 0.2) !important;">
                <p style="color: #dc2626 !important; font-weight: bold !important; margin: 0 0 15px 0 !important;">From: ${authorUsername === 'khamiso' ? 'Khamiso' : 'Reyrey'}</p>
                
                <div style="background-color: #0f0f0f !important; border: 2px solid #dc2626 !important; border-radius: 12px !important; padding: 30px !important; margin: 25px 0 !important; font-style: italic !important; line-height: 1.8 !important; color: #e0e0e0 !important; box-shadow: inset 0 0 20px rgba(220, 38, 38, 0.15) !important;">
                  "${post.content || 'A moment of love shared...'}"
                </div>
                
                <div style="text-align: right !important; font-weight: bold !important; color: #dc2626 !important; margin-top: 15px !important; font-size: 18px !important;">
                  — ${authorUsername === 'khamiso' ? 'Khamiso' : 'Reyrey'}
                </div>
              </div>
              
              <p style="margin-top: 30px !important; color: #ccc !important;">
                Visit our eternal love story to see this beautiful moment and respond with your own message of love.
              </p>
            </div>
            
            <div style="text-align: center !important; padding: 20px !important; border-top: 1px solid #dc2626 !important; color: #888 !important; font-size: 14px !important; background-color: #0f0f0f !important;">
              <div style="color: #dc2626 !important; font-size: 28px !important; margin: 15px 0 !important; text-shadow: 0 0 10px rgba(220, 38, 38, 0.6) !important;">🌹</div>
              <p style="color: #e0e0e0 !important;">Forever & Always <span style="color: #dc2626 !important; font-size: 20px !important;">♥</span></p>
              <p style="color: #888 !important;">Eternal Us • 2025</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email to the other person (not the author)
    const recipientEmail = authorUsername === 'khamiso' ? 'saraakhdar63@gmail.com' : 'khamishussein2003@gmail.com'
    const senderName = authorUsername === 'khamiso' ? 'Khamiso' : 'Reyrey'
    
    console.log(`Sending email from ${senderName} to ${recipientEmail} via Brevo`)
    
    try {
      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
      sendSmtpEmail.subject = `💕 New Love Message from ${senderName}`
      sendSmtpEmail.htmlContent = emailHtml
      sendSmtpEmail.sender = { name: 'Eternal Us 💕', email: 'khamishussein2003@gmail.com' }
      sendSmtpEmail.to = [{ email: recipientEmail, name: recipientEmail === 'saraakhdar63@gmail.com' ? 'Reyrey' : 'Khamiso' }]
      
      const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('Email sent successfully via Brevo:', result.body?.messageId || 'Email sent')
    } catch (error) {
      console.error('Failed to send email via Brevo:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}
