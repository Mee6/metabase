---
title: "Database connection settings"
---

# Database connection settings

Below is a list of different connection options. For which options Metabase supports for your database, see the [page for your database](./connecting.md#connecting-to-supported-database.md).

> Remember to SAVE your changes!

- [Use a secure connection (SSL)](#use-a-secure-connection-ssl)
- [Use an SSH-tunnel for database connections](#use-an-ssh-tunnel-for-database-connections)
- [Additional JDBC connection string options](#additional-jdbc-connection-string-options)
- [Re-run queries for simple explorations](#re-run-queries-for-simple-explorations)
- [Choose when Metabase syncs and scans](#choose-when-metabase-syncs-and-scans)
- [Periodically refingerprint tables](#periodically-refingerprint-tables)

## Database type

_Required_

The kind of database you're connecting to (PostgreSQL, MySQL, BigQuery, etc.)

## Display name

_Required_

What you want Metabase to call the database in its user interface.

## Host

_Required_

Your database's IP address, or its domain name (e.g., esc.mydatabase.com).

## Port

_Required_

## Database name

_Required_

## Username

_Required_

The database username for the account that you want to use to connect to your database. You can set up multiple connections to the same database using different user accounts to connect to the same database, each with different sets of privileges.

## Password

_Required_

The password for the username that you use to connect to the database.

## Schemas

You can specify which schemas you want to sync and scan. Options are:

- All
- Only these...
- All except...

For the **Only these** and **All except** options, you can input a comma-separated list of values to tell Metabase which schemas you want to include (or exclude). For example:

```
foo,bar,baz
```

You can use the `*` wildcard to match multiple schemas.

Let's say you have three schemas: foo, bar, and baz.

- If you have **Only these...** set, and enter the string `b*`, you'll sync with bar and baz.
- If you have **All except...** set, and enter the string `b*`, you'll just sync foo.

Note that only the `*` wildcard is supported; you can't use other special characters or regexes.

## Use a secure connection (SSL)

Metabase automatically tries to connect to databases with SSL first, then without if that doesn't work. If it's possible to connect to your database with an SSL connection, Metabase will make that the default setting for your database. If you prefer to connect without this layer of security, you can always change this setting later, but we highly recommend keeping SSL turned on to keep your data secure.

### SSL Mode

PostgreSQL databases support different levels of security with their connections, with different levels of overhead.

SSL Mode options include:

- allow
- prefer
- require
- verify-ca
- verify-full

See the PostgreSQL docs for a table about the different [SSL Modes][ssl-modes], and select the option that works for you.

### SSL root certificate (PEM)

If you set the SSL Mode to either "verify-ca" or "verify-full", you'll need to specify a root certificate (PEM). You have the option of using a **Local file path** or an **Uploaded file path**. If you're on Metabase Cloud, you'll need to select **Uploaded file path** and upload your certificate.

## Authenticate client certificate

Toggle on to bring up client certificate options.

### SSL Client Certificate (PEM)

You have the option of using a **Local file path** or an **Uploaded file path**. If you're on Metabase Cloud, you'll need to select **Uploaded file path** and upload your certificate.

### SSL Client Key (PKCS-8/DER)

Again, you have the option of using a **Local file path** or an **Uploaded file path**. If you're on Metabase Cloud, you'll need to select **Uploaded file path** and upload your certificate. You'll also need to input your **SSL Client Key Password**.

The private key must be PKCS8 and stored in DER format.

If you instead have a PEM SSL client key, you can convert that key to the PKCS-8/DER format using [openssl](https://www.openssl.org/). The command would look something like:

```
openssl pkcs8 -topk8 -inform PEM -outform DER -in client-key.pem -out client-key.pk8 -nocrypt
```

## Use an SSH tunnel for database connections

See our [guide to SSH tunneling](./ssh-tunnel.md).

## Unfold JSON Columns

Metabase can unfold JSON columns into component fields to yield a table where each JSON key becomes a column. JSON unfolding is on by default, but you can turn off JSON folding if performance is slow.

## Additional JDBC connection string options

Some databases allow you to append options to the connection string that Metabase uses to connect to your database.

## Re-run queries for simple explorations

Turn this option **OFF** if people want to click **Run** (the play button) before applying any [Summarize](../questions/query-builder/introduction.md#grouping-your-metrics) or filter selections.

By default, Metabase will execute a query as soon as you choose an grouping option from the **Summarize** menu or a filter condition from the [action menu](https://www.metabase.com/glossary/action_menu). If your database is slow, you may want to disable re-running to avoid loading data on each click.

## Choose when Metabase syncs and scans

Turn this option **ON** to manage the queries that Metabase uses to stay up to date with your database. For more information, see [Syncing and scanning databases](#syncing-and-scanning-databases).

## Scheduling database syncs

If you've selected **Choose when syncs and scans happen** > **ON**, you'll see the following options under **Database syncing**:

- **Scan** sets the frequency of the [sync query](#how-database-syncs-work) to hourly (default) or daily.
- **at** sets the time when your sync query will run against your database (in the timezone of the server where your Metabase app is running).

## Scheduling database scans

If you've selected **Choose when syncs and scans happen** > **ON**, you'll see the following options under **Scanning for filter values**:

![Scanning options](./images/scanning-options.png)

- **Regularly, on a schedule** allows you to run [scan queries](#how-database-scans-work) at a frequency that matches the rate of change to your database. The time is set in the timezone of the server where your Metabase app is running. This is the best option for a small database, or tables with distinct values that get updated often.
- **Only when adding a new filter widget** is a great option if you want scan queries to run on demand. Turning this option **ON** means that Metabase will only scan and cache the values of the field(s) that are used when a new filter is added to a dashboard or SQL question.
- **Never, I'll do this manually if I need to** is an option for databases that are either prohibitively large, or which never really have new values added. Use the [Re-scan field values now](#manually-scanning-column-values) button to run a manual scan and bring your filter values up to date.

## Periodically refingerprint tables

Turn this option **ON** from **Advanced options** to scan a _sample_ of values every time a [sync](#how-database-syncs-work) is run.

A fingerprinting query examines the first 10,000 rows from each column and uses that data to guesstimate how many unique values each column has, what the minimum and maximum values are for numeric and timestamp columns, and so on. If you turn this option **OFF**, Metabase will only fingerprint your columns once during setup.

