# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build frontend`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t frontend`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system frontend && \
          adduser --system -G frontend frontend

COPY apps/frontend frontend/
RUN chown -R frontend:frontend .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix frontend --omit=dev -f install

CMD [ "node", "frontend" ]
