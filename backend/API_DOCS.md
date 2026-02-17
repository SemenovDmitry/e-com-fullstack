# E-Commerce Backend API

## Архитектура (Layered/N-Tier Architecture)

Проект использует многослойную архитектуру:

```
src/
├── types/           # Интерфейсы и типы данных
├── repositories/    # Data Access Layer (работа с хранилищем)
├── services/        # Business Logic Layer (бизнес-логика)
├── routes/          # Presentation Layer (HTTP routes/controller)
└── server.ts        # Точка входа
```

### Слои:
1. **Routes** - обработка HTTP запросов и валидация
2. **Services** - бизнес-логика и валидация данных
3. **Repositories** - работа с хранилищем данных (сейчас локальный массив)

## Запуск проекта

### Локально (с hot reload)
```bash
pnpm dev
```

### В Docker (production)
```bash
pnpm docker:build    # Сборка образа
pnpm docker:start    # Запуск контейнера
```

### В Docker (разработка с hot reload)
```bash
pnpm docker:dev
```

## API Endpoints

### Получить все товары
```http
GET /products
```

**Ответ:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "quantity": 10,
      "createdAt": "2026-02-17T12:00:00.000Z",
      "updatedAt": "2026-02-17T12:00:00.000Z"
    }
  ],
  "status": "success"
}
```

### Получить товар по ID
```http
GET /products/:id
```

### Создать товар
```http
POST /products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "quantity": 10
}
```

**Ответ (201):**
```json
{
  "data": {
    "id": "generated-uuid",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "quantity": 10,
    "createdAt": "2026-02-17T12:00:00.000Z",
    "updatedAt": "2026-02-17T12:00:00.000Z"
  },
  "status": "success"
}
```

### Обновить товар
```http
PUT /products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 149.99
}
```

### Удалить товар
```http
DELETE /products/:id
```

**Ответ:**
```json
{
  "status": "success",
  "message": "Product deleted"
}
```

## Хранение данных

На данный момент все товары хранятся в памяти (массив) в `ProductRepository`.
При перезагрузке сервера все данные будут потеряны.

Позже можно будет заменить на базу данных (MongoDB, PostgreSQL и т.д.) без изменения слоёв Service и Routes благодаря абстракции Repository pattern.
