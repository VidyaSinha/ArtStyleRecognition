import os
import multiprocessing

# Bind to 0.0.0.0 to allow external access
bind = f"0.0.0.0:{int(os.environ.get('PORT', 8000))}"

# Use a single worker due to memory constraints with the ML model
workers = 1

# Timeout for worker processes
timeout = 120

# Use sync worker type for better stability with ML operations
worker_class = 'sync'

# Preload application to share memory between workers
preload_app = True

# Log configuration
accesslog = '-'
errorlog = '-'
loglevel = 'info'

# Maximum requests a worker will process before restarting
max_requests = 1000
max_requests_jitter = 50

# Graceful timeout
graceful_timeout = 30

# Keep-alive timeout
keepalive = 65

# Configure worker connections
worker_connections = 1000