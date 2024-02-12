namespace SignalRChatApp.Hub;
using Microsoft.AspNetCore.SignalR;

using SignalRChatApp.Services;
using System;
using System.Threading.Tasks;

public class ChatHub : Hub
    {
    private readonly ChatService _chatService;
    public ChatHub(ChatService chatService)
    {
        _chatService = chatService;
    }
    public override async Task OnConnectedAsync()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "SignalRChat");
        await Clients.Caller.SendAsync("UserConnected");
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalRChat");
        await base.OnDisconnectedAsync(exception);
    }
}

