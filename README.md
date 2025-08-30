
## GitHub Backup Script

> A cli tool to back up all the user repositories on GitHub
>
* ***Written in :*** ![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white&style=flat) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&style=flat)
* Simply run on the command line with arguments
* You can set it up along with cron, task scheduler, etc. for auto backups
* Or you can deploy it as a docker container with cron scheduling inbuilt
* Upload directly to S3 (with docker container only)

### Installation

#### Docker Compose
* Clone the project
* Setup .env file as mentioned in the [ENV.docker.md](ENV.docker.md) file
* Start the service using `docker-compose up`

#### Using cli

##### Pre-Requisites

* Download the latest release from [Github Releases](https://github.com/dawnimpulse/github-backup/releases)
* Bun runtime installed (https://bun.com/)
* Check all cli options from [ENV.md](ENV.md)

```
bun ./github-backup-v0.2.0.ts -t abcdef
```


### Contact
Twitter - [@dawnimpulse](https://twitter.com/dawnimpulse)  
Email - [dawnimpulse@gmail.com](mailto://dawnimpulse@gmail.com)


### License
```
MIT License

Copyright (c) 2025 CODEVRY LABS (Saksham Khurana)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
