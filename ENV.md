# CLI Options

The following cli options will configure the backup tool:

| flag             | required | default                      | description                                                                                                                                                                                 |      
|------------------|----------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|      
| -p, --path       | no       | current working directory    | provide complete path for where to store backup zip/folder                                                                                                                                  |      
| -nz, --nozip     | no       | false                        | whether to zip all the repo together or keep them in a folder only; by default it will zip                                                                                                  |      
| -n, --name       | no       | backup-{YYYY-MM-DD-HH-mm-ss} | name of folder/zip; more details in [Dynamic Name](#dynamic-name)                                                                                                                           |    
| -u, --utc        | no       | false                        | use utc timezone for formatting time; default is system                                                                                                                                     |  
| -t, --token      | **YES**  | -                            | user github token with all repo access; more details in [Github Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) |    
| -c, --concurrent | no       | 2                            | no of concurrent repo download operations                                                                                                                                                   |


### Dynamic Name

The name of the zip/folder can be dynamic based on current date time. You can provide the dynamic timestamp within `{}` & it will be automatically parsed to get current values.

* Always provide the name & path in `''` or `""`
* example  `./github-backup-win.exe -t abcd -n 'backup-{YYYY}'`
* The timestamp values is based on moment.js ; refer to [moment docs](https://momentjs.com/docs/#/parsing/string-format/) for creating timestamp
* You can have multiple timestamp in name
    * example `backup-{YYYY}-xyz-{MM}abxd{DD}` will give result ***backup-2024-xyz-01abxd25***

### Examples

* with path  
  `./github-backup-win.exe -t abcd -p 'E:\'`

* no zip  
  `./github-backup-win.exe -t abcd -nz`

* utc timestamp  
  `./github-backup-win.exe -t abcd -n '{YY-MM-DD}' -u`

* with all options *(short or long form can be interchanged)*  
  `./github-backup-win.exe --token abcd --path 'E:\' --name 'backup-{MM}-{DD}' --nozip --utc`
