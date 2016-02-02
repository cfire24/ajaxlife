# Options #
| **Argument** | **Description** | **Default** |
|:-------------|:----------------|:------------|
| `--debug`    | If specified, you will receive much debug spam in the console. | _Not set_   |
| `--doencoding` | If specified, will determine an appropriate Content-Encoding for the client and replace `{ENCODING}` in templates with the type `gzip` or `identity`. Not normally needed. | _Not set_   |
| `--gridfile [file]` | Loads the list of grids from the specified file | `Grids.txt` |
| `--id0 [something]` | Specifies the id0, which is used by SL for banning or something. No idea what the format is; I use two digit numbers. | _Blank_     |
| `--keylength [bits]` | Specifies the number of bits used for the RSA key. May or may not actually be _used_. | `1024`      |
| `--mac [MAC address]` | Specifies the MAC address to send to the login server. Should be in xx:xx:xx:xx:xx:xx format. | `00:00:00:00:00:00` |
| `--port [num]` | Specifies the port the webserver should listen on | `8080`      |
| `--private`  | If set, the server will only listen to connections from localhost | _Not set_   |
| `--root [url]` | Specifies where the client will look for support files (JavaScript, images, etc.) | `http://static.ajaxlife.net/` (which won't work for you) |
| `--s3key [key]` | Your S3 key, if you're uploading textures to S3. Used when `--texturebucket` is set. | _Not set_   |
| `--s3secret [key]` | Your S3 secret key, if you're uploading textures to S3. Used when `--texturebucket` is set. | _Not set_   |
| `--texturebucket [bucket]` | Specifies an S3 bucket to upload textures to, if any | _Not set_   |
| `--texturecache [directory]` | Specifies the directory into which textures will be downloaded from SL. Will be created if it does not exist. | `texturecache/` |
| `--textureroot [url]` | Specifies where the client web browser can access textures. Used when `--texturebucket` is set. | _Not set_   |

# Example #
If you have put the AjaxLife static files (the contents of the `client/` directory) up at http://example.com/ajaxlife/,
you wanted to run the server on port 8000, and were going to claim a MAC address of 01:23:45:67:89:AB and id0 of 42, you
would use this command:
```
AjaxLife.exe --port 8000 --mac 01:23:45:67:89:AB --id0 42 --root http://example.com/ajaxlife/
```

If you're running under [mono](http://www.mono-project.com/Main_Page), prefix that command with `mono `.