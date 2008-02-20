#region License
/* Copyright (c) 2007, Katharine Berry
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Katharine Berry nor the names of any contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY KATHARINE BERRY ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL KATHARINE BERRY BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 ******************************************************************************/
#endregion
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Security.Cryptography;
using MiniHttpd;
using libsecondlife;

namespace AjaxLife.Html
{
    public class Login : IFile, IResource, IDisposable
    {
        // Fields
        private string contenttype = "text/html; charset=utf-8";
        private string name;
        private IDirectory parent;
        private Dictionary<Guid, User> users;

        // Methods
        public Login(string name, IDirectory parent, Dictionary<Guid, User> users)
        {
            this.name = name;
            this.parent = parent;
            this.users = users;
        }

        public void Dispose()
        {
        }

        public void OnFileRequested(HttpRequest request, IDirectory directory)
        {
            request.Response.ResponseContent = new MemoryStream();
            StreamWriter writer = new StreamWriter(request.Response.ResponseContent);
            try
            {
                // Generate a new session ID.
                Guid key = Guid.NewGuid();
                // Create a SecondLife client and set some defaults.
                SecondLife client = new SecondLife();
                client.Settings.ALWAYS_DECODE_OBJECTS = false;
                client.Settings.ALWAYS_REQUEST_OBJECTS = false;
                client.Settings.MULTIPLE_SIMS = false;
                client.Settings.ENABLE_SIMSTATS = true;
                client.Settings.LOGOUT_TIMEOUT = 20000;
                client.Settings.DEBUG = false;
                client.Settings.LOG_RESENDS = false;
                client.Throttle.Cloud = 0;
                client.Throttle.Task = 0;
                client.Throttle.Wind = 0;
                client.Throttle.Asset = 50000;
                client.Throttle.Resend = 500000;
                client.Throttle.Texture = 500000;
                // Create a new User.
                User user = new User();
                // Set the user session properties.
                user.Client = client;
                user.LastRequest = DateTime.Now;
                user.Rotation = -Math.PI;
                // Generate a single-use challenge key.
                user.Challenge = RSACrypto.CreateChallengeString(AjaxLife.RSAp);
                // Add the session to the users.
                lock (users) users.Add(key, user);
                Hashtable hash = new Hashtable();
                // Set up the template with useful details and the challenge and public key.
                hash.Add("STATIC_ROOT", AjaxLife.STATIC_ROOT);
                hash.Add("SESSION_ID", key.ToString("D"));
                hash.Add("CHALLENGE", user.Challenge);
                hash.Add("RSA_EXPONENT", StringHelper.BytesToHexString(AjaxLife.RSAp.Exponent));
                hash.Add("RSA_MODULUS", StringHelper.BytesToHexString(AjaxLife.RSAp.Modulus));
                // Make the grid list, ensuring the default one is selected.
                string grids = "";
                foreach (string server in AjaxLife.LOGIN_SERVERS.Keys)
                {
                    grids += "<option value=\"" + System.Web.HttpUtility.HtmlAttributeEncode(server) +
                        "\"" + (server == AjaxLife.DEFAULT_LOGIN_SERVER ? " selected=\"selected\"" : "") + ">" +
                        System.Web.HttpUtility.HtmlEncode(server) + "</option>\n";
                }
                hash.Add("GRID_OPTIONS", grids);
                // Parse the template.
                Html.Template.Parser parser = new Html.Template.Parser(hash);
                writer.Write(parser.Parse(File.ReadAllText("Html/Templates/Login.html")));
            }
            catch (Exception exception)
            {
                this.contenttype = "text/plain";
                writer.WriteLine("Error: " + exception.Message);
            }
            writer.Flush();
        }

        // Properties
        public string ContentType
        {
            get
            {
                return this.contenttype;
            }
        }

        public string Name
        {
            get
            {
                return this.name;
            }
        }

        public IDirectory Parent
        {
            get
            {
                return this.parent;
            }
        }
        
    }
}