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
 
 AjaxLife.AvatarsNear = function() {
 	// Private:
 	var avatars = {};
 	var win = false;
 	var list = false;
 	
 	return {
 		// Public:
 		init: function() {
 			win = new Ext.BasicDialog("dlg_nearby", {
				width: '300px',
				height: '400px',
				modal: false,
				shadow: true,
				autoCreate: true,
				title: _("AvatarsNear.WindowTitle")
			});
 			list = new AjaxLife.Widgets.SelectList('lst_avatarsnear',win.body.dom,{
 				width: '99%',
 				callback: function(id) {
 					new AjaxLife.Profile(id);
 				}
 			});
 			AjaxLife.Network.MessageQueue.RegisterCallback('AvatarAdded', function(data) {
 				AjaxLife.NameCache.Add(data.ID,data.Name);
 				if(data.ID != gAgentID) list.add(data.ID,data.Name);
 				list.sort();
 			});
 			AjaxLife.Network.MessageQueue.RegisterCallback('AvatarRemoved', function(data) {
 				list.remove(data.ID);
 			});
 			
 			AjaxLife.Network.MessageQueue.RegisterCallback('Teleport', function(data) {
				if(data.Status == AjaxLife.Constants.MainAvatar.TeleportStatus.Finished)
				{
					list.clear();
				}
			});
 			
 			AjaxLife.Network.Send('RequestAvatarList', {
 				callback: function(data) {
					if(data.each)
					{
						list.clear();
						data.each(function(avatar) {
							AjaxLife.NameCache.Add(avatar.ID, avatar.Name);
							if(avatar.ID != gAgentID) list.add(avatar.ID, avatar.Name);
						});
						list.sort();
					}
				}
 			});
 			
 		},
		open: function(opener) {
			if(opener)
			{
				win.show(opener);
			}
			else
			{
				win.show();
			}
		},
		close: function() {
			win.hide();
		},
		toggle: function(opener) {
			if(!win.isVisible())
			{
				this.open(opener);
			}
			else
			{
				this.close();
			}
		}
 	};
 }();