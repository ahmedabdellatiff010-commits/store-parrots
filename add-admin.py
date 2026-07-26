import json
import urllib.request
import urllib.error

BASE_URL = 'https://rkualgvgkpnphbwrduiy.supabase.co'
SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrdWFsZ3Zna3BucGhid3JkdWl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDgzNjg3MiwiZXhwIjoyMTAwNDEyODcyfQ.Acu16rfgq16WL2CMnARBzXQQM9zoPGryTsLnTuXPoI4'
EMAIL = 'mralakhrs218@gmail.com'
PASSWORD = '12345677'


def request_json(path, method='GET', payload=None, headers=None):
    data = None if payload is None else json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(BASE_URL + path, data=data, method=method)
    if headers:
        for key, value in headers.items():
            req.add_header(key, value)
    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode('utf-8')
            return json.loads(body) if body else None
    except urllib.error.HTTPError as exc:
        body = exc.read().decode('utf-8')
        raise RuntimeError(f'{exc.code} {body}') from exc


def get_user_by_email():
    path = '/auth/v1/admin/users?email=' + urllib.parse.quote(EMAIL) + '&per_page=100'
    headers = {
        'Authorization': f'Bearer {SERVICE_ROLE_KEY}',
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
    }
    result = request_json(path, headers=headers)
    users = result.get('users', []) if isinstance(result, dict) else []
    return users[0] if users else None


def create_or_update_user():
    existing = get_user_by_email()
    if existing:
        user_id = existing['id']
        headers = {
            'Authorization': f'Bearer {SERVICE_ROLE_KEY}',
            'apikey': SERVICE_ROLE_KEY,
            'Content-Type': 'application/json',
        }
        payload = {'password': PASSWORD}
        result = request_json(f'/auth/v1/admin/users/{user_id}', method='PUT', payload=payload, headers=headers)
        print('updated_user', user_id)
        return user_id

    headers = {
        'Authorization': f'Bearer {SERVICE_ROLE_KEY}',
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
    }
    payload = {
        'email': EMAIL,
        'password': PASSWORD,
        'email_confirm': True,
        'user_metadata': {'role': 'admin'},
    }
    result = request_json('/auth/v1/admin/users', method='POST', payload=payload, headers=headers)
    user_id = result['id']
    print('created_user', user_id)
    return user_id


def ensure_admin_mapping(user_id):
    headers = {
        'Authorization': f'Bearer {SERVICE_ROLE_KEY}',
        'apikey': SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    path = f'/rest/v1/admins?user_id=eq.{user_id}&select=user_id'
    try:
        result = request_json(path, headers=headers)
    except Exception as exc:
        print('check_mapping_error', exc)
        return

    if result:
        print('admin_mapping_exists')
        return

    payload = [{'user_id': user_id}]
    request_json('/rest/v1/admins', method='POST', payload=payload, headers=headers)
    print('admin_mapping_created')


if __name__ == '__main__':
    user_id = create_or_update_user()
    ensure_admin_mapping(user_id)
    print('done')
