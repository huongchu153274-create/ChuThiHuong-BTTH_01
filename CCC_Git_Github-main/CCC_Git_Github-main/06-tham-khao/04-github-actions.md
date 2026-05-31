# GitHub Actions — CI/CD: Robot Kiểm Tra Code Cho Bạn

## 🎬 "Lại Quên Chạy Tests!" — Khi Con Người Hay Quên

*Minh push code. Quên chạy tests. PR merge. Bug lên production.*

*Chị Hà: "Đây là lý do chúng ta cần robot. GitHub Actions = robot tự chạy tests, tự check code, tự build, tự deploy MỖI LẦN có code mới. Con người hay quên — robot không bao giờ quên."*

*"Giống như có 1 reviewer làm việc 24/7, không nghỉ phép, không sai sót."*

---

## 🎯 Mục tiêu
- Hiểu CI/CD và GitHub Actions
- Tạo workflow tự chạy tests
- Auto-deploy khi merge vào main

## 📁 Workflow File

### Cấu trúc

Workflows được định nghĩa trong file YAML:
```
.github/
└── workflows/
    ├── ci.yml
    ├── deploy.yml
    └── test.yml
```

### Workflow Cơ Bản

`.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
```

### Giải thích

- **name**: Tên workflow
- **on**: Events trigger workflow
  - `push`: Khi push code
  - `pull_request`: Khi có PR
- **jobs**: Các jobs cần chạy
- **runs-on**: OS chạy job (ubuntu-latest, windows-latest, macos-latest)
- **steps**: Các bước trong job
- **uses**: Sử dụng action có sẵn
- **run**: Chạy command

## 🚀 Workflow Examples

### 1. Node.js Project

`.github/workflows/nodejs.yml`:
```yaml
name: Node.js CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
```

### 2. Python Project

`.github/workflows/python.yml`:
```yaml
name: Python CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        python-version: ['3.9', '3.10', '3.11']
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
        cache: 'pip'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Run tests
      run: pytest
    
    - name: Run linter
      run: |
        pip install flake8
        flake8 .
```

### 3. Lint và Test

`.github/workflows/lint-test.yml`:
```yaml
name: Lint and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run ESLint
      run: npm run lint
    
    - name: Run Prettier
      run: npm run format:check
  
  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### 4. Build và Deploy

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔑 Secrets

### Tạo Secret

1. Vào Repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Nhập name và value
4. Click **Add secret**

### Sử dụng Secret

```yaml
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
  
  run: |
    echo "Deploying with API key..."
    deploy.sh
```

## 🎯 Events

### Push Event

```yaml
on:
  push:
    branches: [ main, develop ]
    paths:
      - 'src/**'
      - '.github/workflows/**'
```

### Pull Request Event

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [ main ]
```

### Schedule Event

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Chạy mỗi ngày lúc 00:00 UTC
```

### Manual Trigger

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy'
        required: true
        default: 'staging'
```

## 💡 Best Practices

### 1. Cache Dependencies

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. Matrix Build

```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

### 3. Conditional Steps

```yaml
- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  run: deploy-staging.sh

- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: deploy-production.sh
```

### 4. Jobs Dependencies

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]
  
  test:
    needs: lint  # Chờ lint xong mới chạy
    runs-on: ubuntu-latest
    steps: [...]
  
  deploy:
    needs: [lint, test]  # Chờ cả lint và test
    runs-on: ubuntu-latest
    steps: [...]
```

### 5. Status Checks

Enable status checks trong Branch Protection:
- Repository → Settings → Branches
- Add branch protection rule
- Require status checks: `lint`, `test`

## 📝 Tóm tắt

- ✅ GitHub Actions: CI/CD platform tích hợp GitHub
- ✅ Workflow file: `.github/workflows/*.yml`
- ✅ Events: `push`, `pull_request`, `schedule`, `workflow_dispatch`
- ✅ Jobs: Các tasks cần chạy
- ✅ Steps: Các bước trong job
- ✅ Secrets: Lưu thông tin nhạy cảm
- ✅ Best practices: Cache, matrix, conditional, dependencies

## ➡️ Tiếp theo

Sau khi biết GitHub Actions, bạn đã nắm vững CI/CD cơ bản! Hãy xem [Best Practices](./05-best-practices.md) để áp dụng tốt nhất!

---

## 🔗 Tài liệu tham khảo
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [GitHub Actions Examples](https://github.com/actions/starter-workflows)
