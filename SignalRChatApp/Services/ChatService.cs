using System.Collections.Generic;

namespace SignalRChatApp.Services
{
    public class ChatService
    {
       private static readonly Dictionary<string,string> Users = new Dictionary<string,string>();
        public bool AddUserToList(string userToAdd)
        {
            lock(Users)
            {
                foreach(var user in Users)
                {
                    if (user.Key.ToLower()== userToAdd.ToLower())
                    {
                        return false;
                    }
                }

                Users.Add(userToAdd, null);
                return true;
            }
        }

        public void AddUserConnecrionId(string user,string connectionId)
        {
            lock(Users)
            {
                if (!Users.ContainsKey(user))
                {
                    Users[user] = connectionId;
                }
            }
        }
    }
}
