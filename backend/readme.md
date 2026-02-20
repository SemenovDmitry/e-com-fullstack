docker compose build - Эта команда устанавливает зависимости, копирует код и подготавливает контейнер, чтобы его можно было запустить с помощью docker compose up.
docker compose up - Эта команда запускает контейнер(ы) на основе собранных образов и настроек из docker-compose.yml. Она создает и стартует сервисы, описанные в файле, автоматически выполняя docker compose build, если это необходимо.

// Очистить контейнер
docker compose -f docker-compose.dev.yml down -v

// инициировать бд
docker compose -f docker-compose.dev.yml exec backend pnpm db:init
