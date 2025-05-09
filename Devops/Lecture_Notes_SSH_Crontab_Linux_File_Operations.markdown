# Lecture Notes: SSH, Crontab, and Basic Linux File Operations

## SSH (Secure Shell)
- **Purpose**: Securely access and manage remote Linux systems over a network.
- **Key Commands**:
  - `ssh user@hostname`: Connect to a remote server (e.g., `ssh student@192.168.1.100`).
  - `scp file user@hostname:/path`: Copy files to/from a remote server (e.g., `scp data.csv student@server:~/lab/`).
  - `ssh-keygen`: Generate SSH key pair for passwordless login.
  - `ssh-copy-id user@hostname`: Copy public key to remote server for key-based authentication.
- **Tips**:
  - Use `~/.ssh/config` to simplify connections (e.g., aliases for hosts).
  - Ensure SSH service is running (`systemctl status sshd`).
  - Common port: 22 (change for security if needed).
- **Relevance**: Use SSH to access the server where `orders.jsonl` and CSV files are stored, or to run Python scripts remotely.

## Crontab (Cron Table)
- **Purpose**: Schedule automated tasks (e.g., running Python scripts) at specific times/intervals.
- **Key Commands**:
  - `crontab -e`: Edit the user’s crontab file.
  - `crontab -l`: List current crontab entries.
  - `crontab -r`: Remove all crontab entries.
- **Cron Syntax**:
  - Format: `* * * * * /path/to/script.sh` (minute, hour, day, month, weekday).
  - Example: `0 2 * * * /home/student/lab/run_script.sh` runs daily at 2 AM.
  - Special: `@daily`, `@hourly`, `@reboot`.
- **Tips**:
  - Redirect output to logs: `0 2 * * * /path/script.sh >> /path/log.txt 2>&1`.
  - Check cron logs: `/var/log/syslog` or `/var/log/cron`.
  - Use absolute paths in scripts for reliability.
- **Relevance**: Schedule the Python scripts (`filter_edit_customer_status.py`, `filter_edit_order_summary.py`) to run periodically for automated data processing.

## Basic Linux File Operations
- **Purpose**: Manage files and directories for data processing tasks (e.g., handling `orders.jsonl`, `customer_status.csv`).
- **Key Commands**:
  - **Navigation**:
    - `pwd`: Show current directory.
    - `cd /path/to/dir`: Change directory (e.g., `cd ~/lab`).
    - `ls -l`: List files with details.
  - **File Management**:
    - `touch file.txt`: Create an empty file.
    - `cp source dest`: Copy files (e.g., `cp data.csv backup.csv`).
    - `mv source dest`: Move/rename files (e.g., `mv old.csv new.csv`).
    - `rm file`: Delete files (e.g., `rm temp.csv`; use `rm -r` for directories).
  - **Directory Management**:
    - `mkdir dir`: Create directory (e.g., `mkdir lab`).
    - `rmdir dir`: Remove empty directory.
  - **File Viewing/Editing**:
    - `cat file`: Display file contents.
    - `less file`: View file interactively.
    - `nano file`: Edit file (simple editor).
    - `wc -l file`: Count lines (e.g., `wc -l orders.jsonl`).
  - **Permissions**:
    - `chmod 644 file`: Set file permissions (read/write for owner, read for others).
    - `chown user file`: Change file owner.
    - `ls -l`: Check permissions (e.g., `-rw-r--r--`).
- **Tips**:
  - Use `sudo` for admin tasks (e.g., `sudo chmod 644 /etc/file`).
  - Redirect output: `command > file` (overwrite), `command >> file` (append).
  - Wildcards: `*.csv` matches all CSV files.
- **Relevance**: Use file operations to navigate to the `lab` directory, verify input files (`orders.jsonl`, CSVs), manage outputs (`ny_high_value.csv`, `laptop_april_high_value.csv`), and check file sizes or contents.