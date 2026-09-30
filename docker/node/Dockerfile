FROM node:24-alpine

WORKDIR /usr/src/app

# openssl: o Prisma (Fase 19) depende disso pra rodar a engine de consulta dele em
# cima do Alpine/musl - sem esse pacote, "prisma generate"/"prisma migrate" falham
# com "failed to detect the libssl/openssl version to use". E um problema conhecido
# e documentado do Prisma em imagens Alpine - incluido aqui, ja de saida, em vez de
# deixar pra descobrir isso quebrado la na Fase 19.
RUN apk add --no-cache openssl

# Mantem o container vivo, sem tentar rodar nenhuma aplicacao ainda -
# a Fase 3 troca isso por um comando de verdade, quando package.json existir.
CMD ["sleep", "infinity"]