/* Copyright (c) 2008, Katharine Berry
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

AjaxLife.FriendList = function() {
	var win = false;
	var list = false;
	var div_settings = false;
	var check_visible = false;
	var check_map = false;
	var check_modify = false;
	
	return {
		init: function() {
			return false; // Abort.
			win = new Ext.BasicDialog('dlg_friendlist',{
 				autoCreate: true,
				resizable: true,
				proxyDrag: !AjaxLife.Fancy,
				width: 250,
				height: 400,
				modal: false,
				shadow: true,
				title: _("FriendList.WindowTitle")
			});
			
			div_settings = $(document.createElement('div'));
			
			check_visible = $(document.createElement('input'));
			
			
			win.getEl().appendChild(div_settings);
			
			list = new AjaxLife.Widgets.SelectList('friendlist_list', win.getEl(), Prototype.emptyFunction, Prototype.emptyFunction); // Not finished.
		}
	};
}();