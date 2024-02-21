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

    protected override void Dispose(bool disposing)
    {
       
    }
    public override async Task OnDisconnectedAsync(Exception exception)
    {
        try
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalRChat");
            var user =  _chatService.GetUserByConnectionId(Context.ConnectionId);
            _chatService.RemoveUserFromList(user);
            await base.OnDisconnectedAsync(exception);
            await DisplayOnlineUsers();
        }
        catch (Exception ex)
        {

           
        }
       
        

        


    }

   public async Task AddUserConnectionId(string name)
    {
        _chatService.AddUserConnectionId(name, Context.ConnectionId);
        await DisplayOnlineUsers();
       
    }

    private async Task DisplayOnlineUsers()
    {
        var onlineUsers = _chatService.GetOnlineUsers();
        await Clients.Groups("SignalRChat").SendAsync("OnlineUsers", onlineUsers);

    }
}

