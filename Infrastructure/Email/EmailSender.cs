using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Resend;

namespace Infrastructure.Email;

public class EmailSender (IServiceScopeFactory scopeFactory) : IEmailSender<User>
{
    public async Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
    {
        var subject = "confirm your email address";
        var body = $@"
        <p>Hi {user.DisplayName} </p>
        <p>Please confirm your email by clicking the link bellow </p>
        <p><a href='{confirmationLink}'>Click here tp verify email </p>
        <p>Thanks </p>
        ";
        await SendEmailAsync(email, subject , body);
    }

    private async Task SendEmailAsync(string email, string subject, string body)
    {
        using var scope= scopeFactory.CreateScope();
        var resend = scope.ServiceProvider.GetRequiredService<IResend>();
        var message = new EmailMessage
        {
            From="whatever@resend.dev",
            Subject=subject,
            HtmlBody= body
        };
        message.To.Add(email);
        Console.WriteLine(message.HtmlBody);
        await resend.EmailSendAsync(message);
        // await Task.CompletedTask;
    }

    public Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
    {
        throw new NotImplementedException();
    }

    public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
    {
        throw new NotImplementedException();
    }
}