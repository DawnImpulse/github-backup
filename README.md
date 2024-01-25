
## GitHub Backup Script

> A cli tool to back up all the user repositories on GitHub
>
* ***Written in :*** ![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white&style=flat) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&style=flat)
* ***Available for :*** ![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)  ![MacOs](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white&style=flat)  ![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white&style=flat)
* Simply run on command line with arguments
* You can set it up along with cron, task scheduler etc. for auto backups

### Installation
Download the latest executable for your machine from [Releases](https://github.com/DawnImpulse/github-backup/releases)

### Usage
> **Run the executable via command line only**

```  
./github-backup-windows.exe -t abcdefgh  
```  

### Options

| flag         | required | default                      | description                                                                                                                                                                                 |    
|--------------|----------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|    
| -p, --path   | no       | current working directory    | provide complete path for where to store backup zip/folder                                                                                                                                  |    
| -nz, --nozip | no       | false                        | whether to zip all the repo together or keep them in a folder only; by default it will zip                                                                                                  |    
| -n, --name   | no       | backup-{YYYY-MM-DD-HH-mm-ss} | name of folder/zip; more details in [Dynamic Name](#dynamic-name)                                                                                                                           |  
| -u, --utc    | no       | false                        | use utc timezone for formatting time; default is system                                                                                                                                     |
| -t, --token  | **YES**  | -                            | user github token with all repo access; more details in [Github Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) |  

### Dynamic Name

The name of the zip/folder can be dynamic based on current date time. You can provide the dynamic timestamp within `{}` & it will be automatically parsed to get current values.

* Always provide the name & path in `''` or `""`
* example  `./github-backup-windows.exe -t abcd -n 'backup-{YYYY}'`
* The timestamp values is based on moment.js ; refer to [moment docs](https://momentjs.com/docs/#/parsing/string-format/) for creating timestamp
* You can have multiple timestamp in name
  * example `backup-{YYYY}-xyz-{MM}abxd{DD}` will give result ***backup-2024-xyz-01abxd25***

### Examples

* with path  
  `./github-backup-windows.exe -t abcd -p 'E:\'`

* no zip  
  `./github-backup-windows.exe -t abcd -nz`

* utc timestamp
  `./github-backup-windows.exe -t abcd -n '{YY-MM-DD}' -u`

* with all options *(short or long form can be interchanged)*  
  `./github-backup-windows.exe --token abcd --path 'E:\' --name 'backup-{MM}-{DD}' --nozip --utc`

### Contact
Twitter - [@dawnimpulse](https://twitter.com/dawnimpulse)  
Email - [dawnimpulse@gmail.com](mailto://dawnimpulse@gmail.com)


### The Unlicense
~~~~
github-backup is free and unencumbered public domain software. 

For more information, see https://unlicense.org/ or the accompanying UNLICENSE file. 
~~~~


> Written with [StackEdit](https://stackedit.io/).