// web: gunicorn core.wsgi
// web: gunicorn core.wsgi --log-file -
//gunicorn core.asgi:application -k uvicorn.workers.UvicornWorker

// web: sh -c 'python manage.py migrate && exec gunicorn core.asgi:application -k uvicorn.workers.UvicornWorker'

web: gunicorn core.wsgi
