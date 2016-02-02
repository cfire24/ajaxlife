# Requirements #
This document assumes you have a machine running Windows, and
have Microsoft Visual C# Express installed. AjaxLife can also
be compiled using [MonoDevelop](http://monodevelop.com/Main_Page) on Linux or OS X using the same project files and similar instructions, although the
mono compiler will choke on 0.3.6 or earlier for some reason
I'm not entirely clear on. A code change was made later that
fixed this.

# Instructions #
  1. Download the latest version of AjaxLife from subversion. You can find advice for this [on this page](http://code.google.com/p/ajaxlife/source/checkout). It is recommended that you pick the latest [tagged](http://ajaxlife.googlecode.com/svn/tags/) version instead of the [trunk](http://ajaxlife.googlecode.com/svn/trunk/) to ensure optimal stability.
  1. Download the most recent "dependencies" archive from [the downloads page](http://code.google.com/p/ajaxlife/downloads/list) and extract it in the `server` directory of the folder downloaded in step 1. A `dependencies` folder should appear.
  1. If one does not already exist, create an empty file called `robots.txt` in the `server` directory. This is an issue up to [r177](https://code.google.com/p/ajaxlife/source/detail?r=177) / tag 0.3.6 inclusive.
  1. Open the `AjaxLife.sln` "solution" file using Visual C#.
  1. Open the "Build" menu and click "Build" (or press F6).
  1. In `server\bin\Release\`, you will find the compiled server and support files. If the server is run with no arguments, it will start listening on port 8080, and probably won't work.

# Other useful bits #
In order to actually _use_ this server, it is recommended that you upload that files in the `client` directory you obtained in step 1 to a webserver. Then read CommandLineArguments for instructions on use.