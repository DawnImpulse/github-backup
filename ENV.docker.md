# Environment Variables

The following environment variables are useful for the tool:

| variable      | required | default                      | description                                                                                                                                                                                 |      
|---------------|----------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|       
| NAME          | no       | backup-{YYYY-MM-DD-HH-mm-ss} | name of folder/zip; more details in [Dynamic Name](#dynamic-name)                                                                                                                           |    
| UTC           | no       | false                        | use utc timezone for formatting time; default is system                                                                                                                                     |  
| GITHUB_TOKEN  | **YES**  | -                            | user github token with all repo access; more details in [Github Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) |    
| CONCURRENT    | no       | 2                            | no of concurrent repo download operations                                                                                                                                                   |
| CRON_SCHEDULE | no       | * 0 * * *                    | cron value (default is everyday at 00:00                                                                                                                                                    |

## For Uploading to S3 (all options are mandatory)

| variable    | description                                                      |
|-------------|------------------------------------------------------------------|
| S3_BUCKET   | s3 bucket name                                                   |
| S3_ENDPOINT | s3 endpoint                                                      |
| S3_PREFIX   | optional (basically defines the base path to use for all uploads |
| S3_REGION   | s3 region                                                        |
| S3_KEY      | s3 key                                                           |
| S3_SECRET   | s3 secret                                                        |


## Setup Instructions

1. Create a new `.env` file in the root directory
2. Copy the variables above and set their values according to your environment
3. The `.env` file should not be committed to version control

### Example

See [`.env.docker.example`](.env.docker.example) file for reference

> Also, check the [ENV.md](ENV.md) file for dynamic naming