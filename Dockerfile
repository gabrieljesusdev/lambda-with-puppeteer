FROM public.ecr.aws/lambda/nodejs:22

RUN dnf install -y \
  atk \
  at-spi2-atk \
  cups-libs \
  libdrm \
  libXcomposite \
  libXdamage \
  libXrandr \
  mesa-libgbm \
  pango \
  alsa-lib \
  nss \
  libxkbcommon \
  libXScrnSaver \
  gtk3 \
  && dnf clean all

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["dist/handlers/scrape.handler"]